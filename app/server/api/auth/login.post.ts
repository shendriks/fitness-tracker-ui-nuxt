import { z } from "zod";
import { ApiClient } from "~/server/clients/ApiClient";

export default defineEventHandler(async (event) => {
    const apiClient = ApiClient.create();
    const { email, password } = await readValidatedBody(event, credentialsSchema.parse);

    await apiClient.request<AccessTokenResponse>("/access-token", "GET", {
        Authorization: "Basic " + btoa(`${email}:${password}`),
    }).then(async (accessTokenResponse: AccessTokenResponse): Promise<void> => {
        await setUserSession(event, {
            user: {
                name: email,
            },
            secure: {
                token: accessTokenResponse.token,
            },
        });
    }).catch((error) => {
        switch (error.statusCode) {
            case 401: return sendError(event, createError({
                statusCode: 401,
                statusMessage: "Bad credentials. Please check your email and password and try again.",
            }));
            default: throw error;
        }
    });
});

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

interface AccessTokenResponse {
    token: string;
}

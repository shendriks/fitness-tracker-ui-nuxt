import { ApiClient } from "~/server/clients/ApiClient";
import { LoginRequestSchema } from "~/domain/auth/dto/LoginRequest";
import type { AccessTokenResponse } from "~/domain/auth/dto/AccessTokenResponse";

export default defineEventHandler(async (event) => {
    const apiClient = ApiClient.create();
    const { email, password } = await readValidatedBody(event, LoginRequestSchema.parse);

    await apiClient.request<AccessTokenResponse>("/access-token", "GET", {
        Authorization: "Basic " + btoa(`${email}:${password}`),
    }).then(async (accessTokenResponse: AccessTokenResponse): Promise<void> => {
        await setUserSession(event, {
            user: {
                email: email,
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

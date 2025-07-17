import { ApiClient } from "~/server/clients/ApiClient";
import { SignUpRequestSchema } from "~/domain/auth/dto/SignUpRequest";
import type { SignUpRequest } from "~/domain/auth/dto/SignUpRequest";

export default defineEventHandler(async (event) => {
    const apiClient = ApiClient.create();
    const signUpRequest: SignUpRequest = await readValidatedBody(event, SignUpRequestSchema.parse);

    return await apiClient.request("/users/signup", "POST", {
        "Content-Type": "application/json",
    }, signUpRequest,
    ).then((response) => {
        console.log("Sign-up response", response);
    }).catch((error) => {
        console.log("Sign-up error", error);
        throw error;
    });
});

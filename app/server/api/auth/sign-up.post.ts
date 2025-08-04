import { ApiClient } from "~/server/clients/ApiClient";
import { SignUpRequestSchema } from "~/dto/auth/SignUpRequest";
import type { SignUpRequest } from "~/dto/auth/SignUpRequest";

export default defineEventHandler(async (event) => {
    const apiClient = ApiClient.create();
    const signUpRequest: SignUpRequest = await readValidatedBody(event, SignUpRequestSchema.parse);
    return await apiClient.request("/users/signup", "POST", {}, signUpRequest);
});

import type { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { UserResponse } from "~~/dto/user/UserResponse";
import { UserResponseSchema } from "~~/dto/user/UserResponse";

export class UserRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findLoggedInUser(): Promise<UserResponse> {
        const user = await this.apiClient.request<UserResponse>("/users/me");
        return UserResponseSchema.parse(user);
    }
}

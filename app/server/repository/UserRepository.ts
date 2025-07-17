import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { UserResponse } from "~/domain/user/dto/UserResponse";
import { UserResponseSchema } from "~/domain/user/dto/UserResponse";

export class UserRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findLoggedInUser(): Promise<UserResponse> {
        const user = await this.apiClient.request<UserResponse>("/users/me");
        return UserResponseSchema.parse(user);
    }
}

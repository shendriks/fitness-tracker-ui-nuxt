import { UserRepository } from "~~/server/repository/UserRepository";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: UserRepository = new UserRepository(apiClient);
    return await repository.findLoggedInUser();
});

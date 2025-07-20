import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ChallengeRepository } from "~/server/repository/ChallengeRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ChallengeRepository = new ChallengeRepository(apiClient);
    return await repository.findAll();
});

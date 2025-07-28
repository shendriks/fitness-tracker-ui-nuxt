import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ChallengeParticipationRepository } from "~/server/repository/ChallengeParticipationRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ChallengeParticipationRepository = new ChallengeParticipationRepository(apiClient);
    return await repository.findAll();
});

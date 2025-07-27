import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { TrophyRepository } from "~/server/repository/TrophyRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: TrophyRepository = new TrophyRepository(apiClient);
    return await repository.findAll();
});

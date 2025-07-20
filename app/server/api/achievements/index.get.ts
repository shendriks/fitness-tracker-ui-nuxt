import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { AchievementRepository } from "~/server/repository/AchievementRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: AchievementRepository = new AchievementRepository(apiClient);
    return await repository.findAll();
});

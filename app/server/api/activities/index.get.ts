import { ActivityRepository } from "~~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";

export default defineEventHandler(async (event): Promise<ActivityResponse[]> => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    return await repository.findAll();
});

import { ActivityRepository } from "~~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ActivityStatsResponse } from "~~/dto/activity/ActivityStatsResponse";

export default defineEventHandler(async (event): Promise<ActivityStatsResponse> => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const start = getRouterParam(event, "start") || null;
    return await repository.findStats(start);
});

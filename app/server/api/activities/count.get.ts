import { ActivityRepository } from "~~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ActivityCountResponse } from "~~/dto/activity/ActivityCountResponse";

export default defineEventHandler(async (event): Promise<ActivityCountResponse> => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    return await repository.findCount();
});

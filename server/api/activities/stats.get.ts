import { ActivityRepository } from "~~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ActivityStatsResponse } from "~~/dto/activity/ActivityStatsResponse";
import * as z from "zod";

const querySchema = z.object({
    start: z.string().datetime().optional(),
});

export default defineEventHandler(async (event): Promise<ActivityStatsResponse> => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const query = await getValidatedQuery(event, querySchema.parse);
    return await repository.findStats(query.start || null);
});

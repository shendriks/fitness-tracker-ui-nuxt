import { z } from "zod";
import { ActivityAggregationResponseSchema } from "./ActivityAggregationResponse";

export type ActivityStatsResponse = z.infer<typeof ActivityStatsResponseSchema>;

export const ActivityStatsResponseSchema = z.object({
    total: ActivityAggregationResponseSchema,
    byType: z.object({
        walking: ActivityAggregationResponseSchema,
        mountain_biking: ActivityAggregationResponseSchema,
        cycling: ActivityAggregationResponseSchema,
        running: ActivityAggregationResponseSchema,
        swimming: ActivityAggregationResponseSchema,
    }),
});

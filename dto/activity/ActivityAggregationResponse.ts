import { z } from "zod";

export type ActivityAggregationResponse = z.infer<typeof ActivityAggregationResponseSchema>;

export const ActivityAggregationResponseSchema = z.object({
    count: z.number(),
    totalDistance: z.number(),
    totalDuration: z.number(),
    maxDistance: z.number(),
    maxDuration: z.number(),
});

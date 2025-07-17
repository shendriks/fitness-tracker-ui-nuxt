import { z } from "zod";

export type ActivityCountResponse = z.infer<typeof ActivityCountResponseSchema>;

export const ActivityCountResponseSchema = z.object({
    count: z.number(),
});

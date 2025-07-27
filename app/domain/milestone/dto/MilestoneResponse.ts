import { z } from "zod";

export type MilestoneResponse = z.infer<typeof MilestoneResponseSchema>;

export const MilestoneResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageData: z.string().nullable(),
    isCompleted: z.boolean(),
});

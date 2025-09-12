import { z } from "zod";

export type ActivityUpdateRequest = z.infer<typeof ActivityUpdateRequestSchema>;

export const ActivityUpdateRequestSchema = z.object({
    activityType: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
});

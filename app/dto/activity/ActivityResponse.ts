import { z } from "zod";

export type ActivityResponse = z.infer<typeof ActivityResponseSchema>;

export const ActivityResponseSchema = z.object({
    id: z.string(),
    activityType: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    duration: z.number(),
    title: z.string(),
    description: z.string(),
    distance: z.number(),
    averageSpeed: z.number(),
    startDate: z.coerce.date(),
    imagePreviewData: z.string().nullable(),
});

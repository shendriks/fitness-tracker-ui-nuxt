import { z } from "zod";

export type ActivityCreateRequest = z.infer<typeof ActivityCreateRequestSchema>;

export const ActivityCreateRequestSchema = z.object({
    duration: z.number().min(0),
    distance: z.number().min(0),
    calories: z.number().min(0),
    activityType: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
    startDate: z.coerce.date(),
});

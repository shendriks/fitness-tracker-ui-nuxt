import { z } from "zod";

export type ActivityCreateRequest = z.infer<typeof ActivityCreateRequestSchema>;

export const ActivityCreateRequestSchema = z.object({
    duration: z.number().min(0),
    distance: z.number().min(0),
    calories: z.number().min(0),
    activityType: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    description: z.string(),
});

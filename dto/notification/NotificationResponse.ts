import { z } from "zod";

export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;

export const NotificationResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
});

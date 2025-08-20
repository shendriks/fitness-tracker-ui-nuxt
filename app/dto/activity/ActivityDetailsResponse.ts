import { z } from "zod";
import { GPSPositionResponseSchema } from "~~/dto/activity/GpsPosition";

export type ActivityDetailsResponse = z.infer<typeof ActivityDetailsResponseSchema>;

export const ActivityDetailsResponseSchema = z.object({
    id: z.string(),
    activityType: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    duration: z.number(),
    calories: z.number(),
    title: z.string(),
    description: z.string(),
    distance: z.number(),
    startDate: z.coerce.date(),
    gpsPositions: z.array(GPSPositionResponseSchema),
});

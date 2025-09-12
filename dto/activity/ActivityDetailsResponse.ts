import { number, z } from "zod";
import { GPSPositionResponseSchema } from "~~/dto/activity/GpsPosition";

export type ActivityDetailsResponse = z.infer<typeof ActivityDetailsResponseSchema>;

export const ActivityDetailsResponseSchema = z.object({
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
    gpsPositions: z.array(GPSPositionResponseSchema),
    kilometerSpeeds: z.array(number()),
    elevationGain: z.number().nullable(),
    motionTime: z.number().nullable(),
    pausingTime: z.number().nullable(),
});

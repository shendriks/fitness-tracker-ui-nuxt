import { z } from "zod";
import { GPSPositionResponseSchema } from "~/domain/activity/dto/GpsPosition";

export type ActivityResponse = z.infer<typeof ActivityResponseSchema>;

export function mapToActivityResponse(data: ActivityResponse) {
    return ActivityResponseSchema.parse(data);
}

const ActivityResponseSchema = z.object({
    id: z.string(),
    activityType: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    duration: z.number(),
    calories: z.number(),
    title: z.string(),
    description: z.string(),
    distance: z.number(),
    gpsPositions: z.array(GPSPositionResponseSchema),
});

import { z } from "zod";
import { GPSPositionResponseSchema, mapToGPSPosition } from "~/domain/activity/dto/gpsPosition";
import type { GPSPosition } from "~/domain/activity/dto/gpsPosition";

export interface Activity {
    id: string;
    activityType: string;
    createdAt: Date;
    updatedAt: Date;
    duration: number;
    calories: number;
    title: string;
    description: string;
    distance: number;
    gpsPositions: GPSPosition[];
}

export const ActivityResponseSchema = z.object({
    id: z.string(),
    activityType: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    duration: z.number(),
    calories: z.number(),
    gpsPositions: z.array(GPSPositionResponseSchema),
});

export type ActivityResponse = z.infer<typeof ActivityResponseSchema>;

export function mapToActivity(response: ActivityResponse): Activity {
    ActivityResponseSchema.parse(response);
    return {
        id: response.id,
        activityType: response.activityType,
        calories: response.calories,
        createdAt: new Date(response.createdAt),
        duration: response.duration,
        updatedAt: new Date(response.updatedAt),
        title: "Activity Title",
        description: "Relaxed activity with no description.",
        distance: 100,
        gpsPositions: response.gpsPositions.map(mapToGPSPosition),
    };
}

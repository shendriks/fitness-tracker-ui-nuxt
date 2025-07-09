import { z } from "zod";

export interface GPSPosition {
    timestamp: Date;
    latitude: number;
    longitude: number;
}

export const GPSPositionResponseSchema = z.object({
    timestamp: z.string(),
    latitude: z.number(),
    longitude: z.number(),
});

export type GPSPositionResponse = z.infer<typeof GPSPositionResponseSchema>;

export function mapToGPSPosition(response: GPSPositionResponse): GPSPosition {
    GPSPositionResponseSchema.parse(response);
    return {
        timestamp: new Date(response.timestamp),
        latitude: response.latitude,
        longitude: response.longitude,
    };
}

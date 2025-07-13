import { z } from "zod";

export const GPSPositionResponseSchema = z.object({
    timestamp: z.coerce.date(),
    latitude: z.number(),
    longitude: z.number(),
});

export type GPSPositionResponse = z.infer<typeof GPSPositionResponseSchema>;

export function mapToGPSPosition(response: GPSPositionResponse): GpsPosition {
    GPSPositionResponseSchema.parse(response);
    return {
        timestamp: new Date(response.timestamp),
        latitude: response.latitude,
        longitude: response.longitude,
    };
}

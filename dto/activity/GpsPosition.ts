import { z } from "zod";

export const GPSPositionResponseSchema = z.object({
    timestamp: z.coerce.date(),
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number(),
    speed: z.number(),
});

export type GPSPositionResponse = z.infer<typeof GPSPositionResponseSchema>;

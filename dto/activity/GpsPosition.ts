import { z } from "zod";

export const GPSPositionResponseSchema = z.object({
    timestamp: z.coerce.date(),
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number().nullable(),
    speed: z.number().nullable(),
});

export type GPSPositionResponse = z.infer<typeof GPSPositionResponseSchema>;

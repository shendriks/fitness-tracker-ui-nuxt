import { z } from "zod";
import { GPSPositionResponseSchema } from "~/domain/activity/dto/GpsPosition";

export type ChallengeResponse = z.infer<typeof ChallengeResponseSchema>;

export const ChallengeResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageData: z.string().nullable(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    hasUserJoined: z.boolean(),
});

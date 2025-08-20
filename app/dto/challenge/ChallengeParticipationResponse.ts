import { z } from "zod";
import { ChallengeResponseSchema } from "~~/dto/challenge/ChallengeResponse";

export type ChallengeParticipationResponse = z.infer<typeof ChallengeParticipationResponseSchema>;

export const ChallengeParticipationResponseSchema = z.object({
    id: z.string(),
    joinedAt: z.coerce.date(),
    percentageCompleted: z.number(),
    challenge: ChallengeResponseSchema,
});

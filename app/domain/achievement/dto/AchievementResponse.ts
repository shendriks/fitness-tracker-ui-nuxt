import { z } from "zod";
import { ActivityResponseSchema } from "~/domain/activity/dto/ActivityResponse";
import { ChallengeResponseSchema } from "~/domain/challenge/dto/ChallengeResponse";

export type AchievementResponse = z.infer<typeof AchievementResponseSchema>;

export const AchievementResponseSchema = z.object({
    id: z.string(),
    challenge: ChallengeResponseSchema,
    activity: ActivityResponseSchema,
});

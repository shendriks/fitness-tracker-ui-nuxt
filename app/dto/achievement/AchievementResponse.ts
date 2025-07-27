import { z } from "zod";
import { ActivityResponseSchema } from "~/dto/activity/ActivityResponse";
import { ChallengeResponseSchema } from "~/dto/challenge/ChallengeResponse";

export type AchievementResponse = z.infer<typeof AchievementResponseSchema>;

export const AchievementResponseSchema = z.object({
    id: z.string(),
    challenge: ChallengeResponseSchema,
    activity: ActivityResponseSchema,
});

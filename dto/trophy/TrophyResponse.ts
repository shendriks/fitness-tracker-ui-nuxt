import { z } from "zod";

export type TrophyResponse = z.infer<typeof TrophyResponseSchema>;

export const TrophyResponseSchema = z.object({
    id: z.string(),
    achievementType: z.string(),
    achievement: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        imageFilePath: z.string(),
    }),
    unlockedAt: z.coerce.date(),
});

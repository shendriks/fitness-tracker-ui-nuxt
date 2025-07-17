import { z } from "zod";

export type AccessTokenResponse = z.infer<typeof AccessTokenResponseSchema>;

export const AccessTokenResponseSchema = z.object({
    token: z.string(),
});

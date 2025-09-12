import { z } from "zod";

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const SignUpRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    accountType: z.string(),
});

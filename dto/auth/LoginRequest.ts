import { z } from "zod";

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

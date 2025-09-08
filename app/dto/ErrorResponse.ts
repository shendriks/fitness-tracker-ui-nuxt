import { z } from "zod";

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const ErrorResponseSchema = z.object({
    message: z.string(),
    errors: z.array(z.string()),
});

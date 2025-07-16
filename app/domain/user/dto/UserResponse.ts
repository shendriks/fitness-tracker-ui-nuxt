import { z } from "zod";

export type UserResponse = z.infer<typeof UserResponseSchema>;

export function mapToUserResponse(data: UserResponse) {
    return UserResponseSchema.parse(data);
}

const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    accountType: z.string(),
});

import { z } from "zod";

export type ActivityCountResponse = z.infer<typeof ActivityCountResponseSchema>;

export function mapToActivityCountResponse(data: ActivityCountResponse) {
    return ActivityCountResponseSchema.parse(data);
}

const ActivityCountResponseSchema = z.object({
    count: z.number(),
});

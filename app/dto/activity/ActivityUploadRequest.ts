import { z } from "zod";

// export type ActivityUploadRequest = z.infer<typeof ActivityUploadRequestSchema>;

export const ActivityUploadRequestSchema = z.object({
    activityType: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
    file: z
        .instanceof(File, {
            message: "A file is required.",
        }).refine(
            file => file.name.endsWith(".gpx"),
            "Only .gpx files are supported.",
        ).refine(
            file => file.size <= 10 * 1024 * 1024,
            "File size must not exceed 10 MB.",
        ),
});

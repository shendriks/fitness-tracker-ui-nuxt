import { z } from "zod";

export type ActivityUploadRequest = z.infer<typeof ActivityUploadRequestSchema>;

export const ActivityUploadRequestSchema = z.object({
    activityType: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
    file: z
        .instanceof(File),
    // .refine(
    //     file => ["application/gpx+xml"].includes(file.type),
    //     (file: File) => {
    //         console.log(file);
    //     },
    // ),
});

import { z } from "zod";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === "admin@admin.com" && password === "iamtheadmin") {
        await setUserSession(event, {
            user: {
                name: "John Doe",
            },
        });
        return {};
    }

    return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Bad credentials",
    }));
});

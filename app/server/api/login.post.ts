import { z } from "zod";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    // await new Promise(resolve => setTimeout(resolve, 1000));

    await $fetch("http://localhost:8080/api/access-token", {
        method: "GET",
        headers: {
            Authorization: "Basic " + btoa(email + ":" + password),
        },
    }).then(async (response) => {
        const data = JSON.parse(response);
        console.log(data);
        await setUserSession(event, {
            user: {
                name: email,
            },
            secure: {
                token: data.token,
            },
        });
        console.log("Right after login: ", await getUserSession(event));
        return sendRedirect(event, "/activities");
    }, async (error) => {
        console.log(error);
        switch (error.statusCode) {
            case 401: return sendError(event, createError({
                statusCode: 401,
                statusMessage: "Bad credentials. Please check your email and password and try again.",
            }));
            default: return sendError(event, createError({
                statusCode: 500,
                statusMessage: "An unexpected error occurred. Please try again later.",
            }));
        }
    });
});

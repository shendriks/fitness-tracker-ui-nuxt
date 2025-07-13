import { eventHandler } from "h3";

export default eventHandler(async (event) => {
    const publicRoutes = [
        "/api/login",
    ];
    if (publicRoutes.includes(event.path)) {
        return;
    }

    const session = await getUserSession(event);

    if (session) {
        return;
    }

    throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
    });
});

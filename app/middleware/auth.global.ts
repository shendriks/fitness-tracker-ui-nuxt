export default defineNuxtRouteMiddleware(async (to) => {
    const { fetch: refreshSession, loggedIn: loggedIn } = useUserSession();
    const loggedInBeforeRefresh = loggedIn.value;
    await refreshSession();
    if (loggedInBeforeRefresh && !loggedIn.value) {
        push.error({ title: "Session expired", message: "Your session has expired. Please log in again." });
    }

    const publicRoutes = ["/login", "/sign-up", "/"];
    if (publicRoutes.includes(to.path) || loggedIn.value) {
        return;
    }

    return navigateTo("/login");
});

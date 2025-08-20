export default defineNuxtRouteMiddleware(async (to) => {
    const { loggedIn: loggedIn } = useUserSession();
    if (loggedIn.value && to.path === "/") {
        return navigateTo("/activities");
    }
});

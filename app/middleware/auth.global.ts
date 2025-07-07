export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ["/login", "/sign-up", "/"];
    if (publicRoutes.includes(to.path)) {
        return;
    }

    const { loggedIn } = useUserSession();

    if (loggedIn.value) {
        return;
    }

    return navigateTo("/login");
});

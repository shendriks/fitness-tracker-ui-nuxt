export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ["/login", "/sign-up", "/"];
    if (publicRoutes.includes(to.path)) {
        return;
    }

    const { loggedIn } = useUserSession();

    // redirect the user to the login screen if they're not authenticated
    if (!loggedIn.value) {
        return navigateTo("/login");
    }
});

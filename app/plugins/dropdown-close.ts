export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:start", () => {
        const dropdown = document.getElementById("nav-account-dropdown");
        dropdown?.removeAttribute("open");
    });
});

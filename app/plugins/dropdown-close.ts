export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:start", () => {
        const dropdowns = document.getElementsByClassName("dropdown");
        Array.from(dropdowns).forEach((dropdown) => {
            dropdown.removeAttribute("open");
        });
    });
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:start", () => {
        const dropdowns = document.getElementsByClassName("dropdown");
        Array.from(dropdowns).forEach((dropdown) => {
            dropdown.removeAttribute("open");
        });
        const burger = document.querySelector("nav input[type=checkbox]");
        if (burger != null) {
            burger.checked = false;
        }
    });
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "nuxt-auth-utils", "@nuxtjs/leaflet", "@nuxt/image"],
    ssr: false,
    devtools: {
        enabled: true,
    },
    css: ["@picocss/pico", "~/assets/css/main.css"],
    runtimeConfig: {
        fitnessTrackerApiBaseUrl: process.env.FITNESS_TRACKER_API_BASE_URL,
    },
    compatibilityDate: "2025-05-15",
    eslint: {
        config: {
            stylistic: {
                semi: true,
                quotes: "double",
                commaDangle: "always-multiline",
                indent: 4,
            },
        },
    },
});
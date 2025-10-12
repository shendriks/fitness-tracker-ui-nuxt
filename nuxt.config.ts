import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    modules: [
        "@nuxt/eslint",
        "nuxt-auth-utils",
        "@nuxtjs/leaflet",
        "@nuxt/image",
        "notivue/nuxt",
        "@nuxt/icon",
        "@vee-validate/nuxt",
        "nuxt-csurf",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt",
        "@nuxt/test-utils/module",
        "nuxt-security",
    ],
    ssr: false,
    devtools: {
        enabled: true,
    },
    app: {
        head: {
            script: [
                { src: "/js/theme-switcher.js", type: "module", defer: true },
            ],
            link: [
                { rel: "manifest", href: "/site.webmanifest" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
                { rel: "icon", type: "image/png", sizes: "512x512", href: "/android-chrome-512x512.png" },
                { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
                { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
                { rel: "shortcut icon", href: "/favicon.ico" },
            ],
        },
        pageTransition: { name: "page", mode: "out-in" },
    },
    css: [
        "~/assets/css/main.scss",
        "notivue/notification.css", // Only needed if using built-in notifications
        "notivue/animations.css", // Only needed if using built-in animations
        "notivue/notification-progress.css",
    ],
    spaLoadingTemplate: true,
    runtimeConfig: {
        fitnessTrackerApiBaseUrl: process.env.FITNESS_TRACKER_API_BASE_URL,
    },
    compatibilityDate: "2025-05-15",
    debug: false,
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
    notivue: {
        position: "bottom-right",
        limit: 4,
        enqueue: true,
        avoidDuplicates: true,
        notifications: {
            global: {
                duration: 3000,
            },
        },
    },
    security: {
        headers: {
            contentSecurityPolicy: {
                "img-src": ["'self'", "data:", "https://*.openstreetmap.org", "https://images.pexels.com"],
            },
        },
    },
});

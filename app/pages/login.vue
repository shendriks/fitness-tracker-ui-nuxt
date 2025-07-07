<script setup lang="ts">
import type { FetchError } from "ofetch";

const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
    email: "",
    password: "",
});

const errorMessage = ref("");
const loading = ref(false);

async function login() {
    loading.value = true;
    errorMessage.value = "";

    // $fetch("/api/login", {
    //     method: "POST",
    //     body: credentials,
    // })
    //     .then(async () => {
    //         await refreshSession();
    //         await navigateTo("/activities");
    //     }).catch(async (reason) => {
    //         const error = reason as FetchError;
    //         errorMessage.value = error.statusMessage || "Unknown error occurred";
    //     }).finally(async () => {
    //         loading.value = false;
    //     });
    try {
        await $fetch("/api/login", {
            method: "POST",
            body: credentials,
        });
        await refreshSession();
        navigateTo("/activities");
    }
    catch (error) {
        const e = error as FetchError;
        errorMessage.value = e.statusMessage || "Unknown error occurred";
    }
    loading.value = false;
}
</script>

<template>
    <article
        v-if="errorMessage"
        class="error"
    >
        {{ errorMessage }}
    </article>

    <form @submit.prevent="login">
        <input
            v-model="credentials.email"
            type="email"
            placeholder="Email"
        >
        <input
            v-model="credentials.password"
            type="password"
            placeholder="Password"
        >
        <button
            v-if="loading"
            aria-busy="true"
            type="submit"
            disabled
        >
            Logging in...
        </button>
        <button
            v-else
            type="submit"
        >
            Login
        </button>
    </form>
    Don't have an account?
    <NuxtLink to="/sign-up">Sign Up</NuxtLink>
</template>

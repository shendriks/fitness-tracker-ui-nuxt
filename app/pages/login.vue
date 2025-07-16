<script setup lang="ts">
import type { FetchError } from "ofetch";

const { fetch: refreshSession, loggedIn: loggedIn } = useUserSession();
if (loggedIn.value) {
    await navigateTo("/");
}

const credentials = reactive({
    email: "",
    password: "",
});

const errorMessage = ref("");
const loading = ref(false);

async function login() {
    loading.value = true;
    errorMessage.value = "";
    $fetch("/api/auth/login", {
        method: "POST",
        body: credentials,
    }).then(async () => {
        await refreshSession();
        await navigateTo("/activities");
        push.success({
            title: "Login succeeded",
            message: "Welcome back!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "Unknown error occurred";
        push.error({ title: "Login failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
</script>

<template>
    <div>
        <!--        <article -->
        <!--            v-if="errorMessage" -->
        <!--            class="error" -->
        <!--        > -->
        <!--            {{ errorMessage }} -->
        <!--        </article> -->

        <form
            method="POST"
            @submit.prevent="login"
        >
            <input
                id="username"
                v-model="credentials.email"
                type="email"
                name="username"
                placeholder="Email"
                required
            >
            <input
                id="password"
                v-model="credentials.password"
                type="password"
                name="password"
                placeholder="Password"
                required
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
    </div>
</template>

<script setup lang="ts">
import type { FetchError } from "ofetch";

const { loggedIn } = useUserSession();
if (loggedIn.value) {
    await navigateTo("/");
}

const signUpRequest = reactive({
    name: "",
    email: "",
    password: "",
    type: "",
});

const errorMessage = ref("");
const loading = ref(false);

async function signup() {
    loading.value = true;
    errorMessage.value = "";
    $fetch("/api/auth/sign-up", {
        method: "POST",
        body: signUpRequest,
    }).then(async () => {
        await navigateTo("/login");
        push.success({
            title: "Sign up succeeded",
            message: "You can now login!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Sign-up failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
</script>

<template>
    <div>
        <h1>Sign Up</h1>
        <article
            v-if="errorMessage"
            class="error"
        >
            {{ errorMessage }}
        </article>
        <form
            method="POST"
            @submit.prevent="signup"
        >
            <label for="type">Account Type</label>
            <select
                id="type"
                v-model="signUpRequest.type"
                type="dropdown"
                name="type"
                required
            >
                <option value="basic">
                    Basic
                </option>
                <option value="premium">
                    Premium
                </option>
            </select>
            <input
                id="name"
                v-model="signUpRequest.name"
                type="text"
                name="name"
                placeholder="Name"
                required
            >
            <input
                id="email"
                v-model="signUpRequest.email"
                type="email"
                name="email"
                placeholder="Email"
                autocomplete="off"
                required
            >
            <input
                id="password"
                v-model="signUpRequest.password"
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="off"
                required
            >
            <button
                v-if="loading"
                aria-busy="true"
                type="submit"
                disabled
            >
                Signing up...
            </button>
            <button
                v-else
                type="submit"
            >
                Sign Up
            </button>
        </form>
        Already have an account?
        <NuxtLink to="/login">Login</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { FetchError } from "ofetch";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { LoginRequestSchema } from "~~/dto/auth/LoginRequest";

const validationSchema = toTypedSchema(LoginRequestSchema);
const errorMessage = ref("");
const loading = ref(false);
const { fetch: refreshSession, loggedIn: loggedIn } = useUserSession();

if (loggedIn.value) {
    await navigateTo("/");
}

async function onSubmit(values) {
    loading.value = true;
    errorMessage.value = "";

    myCsrfFetch("/api/auth/login", {
        method: "POST",
        body: values,
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
    <div class="centered-medium">
        <h1>Login</h1>
        <article
            v-if="errorMessage"
            class="error"
        >
            {{ errorMessage }}
        </article>
        <Form
            :validation-schema="validationSchema"
            @submit="onSubmit"
        >
            <label for="email">Email</label>
            <Field
                type="email"
                name="email"
            />
            <ErrorMessage name="email" />

            <label for="password">Password</label>
            <Field
                type="password"
                name="password"
            />
            <ErrorMessage name="password" />
            <br>
            <br>
            <button
                :aria-busy="loading"
                type="submit"
                :disabled="loading"
            >
                {{ loading ? "Logging in ..." : "Login" }}
            </button>
        </Form>
        Don't have an account?
        <NuxtLink to="/sign-up">Sign Up</NuxtLink>
    </div>
</template>

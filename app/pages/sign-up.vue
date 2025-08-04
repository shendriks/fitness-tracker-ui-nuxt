<script setup lang="ts">
import type { FetchError } from "ofetch";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignUpRequestSchema } from "~/dto/auth/SignUpRequest";

const { loggedIn } = useUserSession();
const { $csrfFetch } = useNuxtApp();
const validationSchema = toTypedSchema(SignUpRequestSchema);
const errorMessage = ref("");
const loading = ref(false);

if (loggedIn.value) {
    await navigateTo("/");
}

async function onSubmit(values: object) {
    loading.value = true;
    errorMessage.value = "";

    $csrfFetch("/api/auth/sign-up", {
        method: "POST",
        body: values,
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
    <div class="centered-medium">
        <h1>Sign Up</h1>
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
            <label for="accountType">Account Type</label>
            <Field
                as="select"
                name="accountType"
            >
                <option value="basic">
                    Basic
                </option>
                <option value="premium">
                    Premium
                </option>
            </Field>
            <ErrorMessage name="accountType" />
            <label for="name">Name</label>
            <Field
                type="text"
                name="name"
            />
            <ErrorMessage name="name" />
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
                {{ loading ? "Signing up ..." : "Sign Up" }}
            </button>
        </Form>
        Already have an account?
        <NuxtLink to="/login">Login</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { FetchError } from "ofetch";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ActivityCreateRequestSchema } from "~/domain/activity/dto/ActivityCreateRequest";
import { toDatetimeLocalInputValue } from "~/lib/datetime-local-input-value-formatter";

const errorMessage = ref("");
const loading = ref(false);
const validationSchema = toTypedSchema(ActivityCreateRequestSchema);

function onSubmit(values) {
    loading.value = true;
    errorMessage.value = "";
    $fetch("/api/activities", {
        method: "POST",
        body: values,
    }).then(async () => {
        await navigateTo("/activities");
        push.success({
            title: "Activity created",
            message: "Activity created successfully!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Activity creation failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}

const initialValues = {
    startDate: new Date(),
    duration: 0,
    distance: 0,
    calories: 0,
    activityType: undefined,
    title: "Your activity title",
    description: "",
};
const initialDate = toDatetimeLocalInputValue(initialValues.startDate);
</script>

<template>
    <div>
        <h1>Manual Entry</h1>
        <article
            v-if="errorMessage"
            class="error"
        >
            {{ errorMessage }}
        </article>
        <Form
            :validation-schema="validationSchema"
            :initial-values="initialValues"
            @submit="onSubmit"
        >
            <div class="grid">
                <div>
                    <label for="duration">Duration</label>
                    <Field
                        name="duration"
                        type="number"
                    />
                    <ErrorMessage name="duration" />
                </div>
                <div>
                    <label for="distance">Distance</label>
                    <Field
                        name="distance"
                        type="number"
                    />
                    <ErrorMessage name="distance" />
                </div>
                <div>
                    <label for="calories">Calories</label>
                    <Field
                        name="calories"
                        type="number"
                    />
                    <ErrorMessage name="calories" />
                </div>
            </div>
            <div class="grid">
                <div>
                    <label for="activityType">Activity Type</label>
                    <Field
                        name="activityType"
                        as="select"
                    >
                        <option value="running">
                            Running
                        </option>
                        <option value="swimming">
                            Swimming
                        </option>
                        <option value="cycling">
                            Cycling
                        </option>
                        <option value="mountain_biking">
                            Mountain Biking
                        </option>
                        <option value="walking">
                            Walking
                        </option>
                    </Field>
                    <ErrorMessage name="activityType" />
                </div>
                <div>
                    <label for="startDate">Date</label>
                    <Field
                        v-model="initialDate"
                        name="startDate"
                        type="datetime-local"
                    />
                    <ErrorMessage name="startDate" />
                </div>
            </div>
            <label for="title">Title</label>
            <Field
                name="title"
                type="text"
            />
            <ErrorMessage name="title" />
            <label for="description">Description</label>
            <Field
                v-slot="{ field }"
                name="description"
            >
                <textarea v-bind="field" />
            </Field>
            <ErrorMessage name="description" />
            <br>
            <button
                v-if="loading"
                aria-busy="true"
                type="submit"
                disabled
            >
                Creating activity...
            </button>
            <button
                v-else
                type="submit"
            >
                Create
            </button>
        </Form>
    </div>
</template>

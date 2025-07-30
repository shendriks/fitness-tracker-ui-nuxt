<script setup lang="ts">
import type { FetchError } from "ofetch";
import { ErrorMessage, Field, Form } from "vee-validate";

const route = useRoute();
const errorMessage = ref("");
const deleting = ref(false);

const { data: activity, error, status } = await useFetch(`/api/activities/${route.params.id}`, {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <div class="centered-medium">
        <h1>Edit Activity</h1>
        <article
            v-if="errorMessage"
            class="error"
        >
            {{ errorMessage }}
        </article>
        <Form
            :validation-schema="validationSchema"
            :initial-values="activity"
            @submit="onSubmit"
        >
            <div class="grid">
                <div>
                    <label for="duration">Duration</label>
                    <Field
                        name="duration"
                        type="number"
                        disabled
                    />
                </div>
                <div>
                    <label for="distance">Distance</label>
                    <Field
                        name="distance"
                        type="number"
                        disabled
                    />
                </div>
                <div>
                    <label for="calories">Calories</label>
                    <Field
                        name="calories"
                        type="number"
                        disabled
                    />
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
                        disabled
                    />
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
                Updating activity...
            </button>
            <button
                v-else
                type="submit"
            >
                Update
            </button>
        </Form>
    </div>
</template>

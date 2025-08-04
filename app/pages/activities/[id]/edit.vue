<script setup lang="ts">
import type { FetchError } from "ofetch";
import { ErrorMessage, Field, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ActivityUpdateRequestSchema } from "~/dto/activity/ActivityUpdateRequest";

const route = useRoute();
const { $csrfFetch } = useNuxtApp();
const errorMessage = ref("");
const loading = ref(false);
const validationSchema = toTypedSchema(ActivityUpdateRequestSchema);

const { data: activity, error, status } = await useFetch(`/api/activities/${route.params.id}`, {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});

function onSubmit(values) {
    loading.value = true;
    errorMessage.value = "";
    $csrfFetch("/api/activities/" + route.params.id + "", {
        method: "PATCH",
        body: values,
    }).then(async () => {
        await navigateTo("/activities");
        push.success({
            title: "Activity updated",
            message: "Activity updated successfully!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Activity update failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
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
        <div class="stacked">
            <Transition name="fade">
                <div v-if="status === 'pending'">
                    <AppActivityCardSkeleton />
                </div>
                <div v-else-if="error">
                    <article class="error">
                        {{ error.statusMessage }}
                    </article>
                </div>
                <div v-else>
                    <Form
                        :validation-schema="validationSchema"
                        :initial-values="activity"
                        @submit="onSubmit"
                    >
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
                        <hr>
                        <div class="grid">
                            <div>
                                <b>Duration</b>
                                <br>
                                {{ activity.duration }}
                            </div>
                            <div>
                                <b>Distance</b>
                                <br>
                                {{ activity.distance }}
                            </div>
                            <div>
                                <b>Calories</b>
                                <br>
                                {{ activity.calories }}
                            </div>
                            <div>
                                <b>Date</b>
                                <br>
                                <NuxtTime
                                    :datetime="activity.startDate"
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                    hour="2-digit"
                                    minute="2-digit"
                                />
                            </div>
                        </div>
                        <hr>
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
            </Transition>
        </div>
    </div>
</template>

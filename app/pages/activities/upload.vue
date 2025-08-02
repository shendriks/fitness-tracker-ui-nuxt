<script setup lang="ts">
import type { FetchError } from "ofetch";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ActivityUploadRequestSchema } from "~/dto/activity/ActivityUploadRequest";

const errorMessage = ref("");
const loading = ref(false);
const validationSchema = toTypedSchema(ActivityUploadRequestSchema);

function onSubmit(values) {
    loading.value = true;
    errorMessage.value = "";

    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("activityType", values.activityType);
    formData.append("title", values.title);
    formData.append("description", values.description);
    console.log(formData);

    $fetch("/api/activities/upload", {
        method: "POST",
        body: formData,
    }).then(async () => {
        await navigateTo("/activities");
        push.success({
            title: "Activity uploaded",
            message: "Activity upload successful!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Activity upload failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
</script>

<template>
    <div class="centered-medium">
        <h1>Upload Activity</h1>
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
            <label for="file">GPX File</label>
            <Field
                type="file"
                name="file"
            />
            <ErrorMessage name="file" />
            <hr>
            <button
                v-if="loading"
                aria-busy="true"
                type="submit"
                disabled
            >
                Uploading activity...
            </button>
            <button
                v-else
                type="submit"
            >
                Upload
            </button>
        </Form>
    </div>
</template>

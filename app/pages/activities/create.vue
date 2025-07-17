<script setup lang="ts">
import type { FetchError } from "ofetch";

const activityCreateRequest = reactive({
    duration: 0,
    distance: 0,
    calories: 0,
    activityType: "",
    date: new Date(),
    title: "",
    description: "",
});

const errorMessage = ref("");
const loading = ref(false);

async function createActivity() {
    loading.value = true;
    errorMessage.value = "";
    $fetch("/api/activities", {
        method: "POST",
        body: activityCreateRequest,
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
</script>

<template>
    <div>
        <h1>Manual Entry</h1>
        <div>
            <article
                v-if="errorMessage"
                class="error"
            >
                {{ errorMessage }}
            </article>
            <form
                method="POST"
                @submit.prevent="createActivity"
            >
                <div class="grid">
                    <div>
                        <label for="duration">Duration</label>
                        <input
                            id="duration"
                            v-model="activityCreateRequest.duration"
                            name="duration"
                            type="number"
                            placeholder="Duration"
                            required
                        >
                    </div>
                    <div>
                        <label for="distance">Distance</label>
                        <input
                            id="distance"
                            v-model="activityCreateRequest.distance"
                            name="distance"
                            type="number"
                            placeholder="Distance"
                            required
                        >
                    </div>
                    <div>
                        <label for="calories">Calories</label>
                        <input
                            id="calories"
                            v-model="activityCreateRequest.calories"
                            name="calories"
                            type="number"
                            placeholder="Calories"
                            required
                        >
                    </div>
                </div>
                <div class="grid">
                    <div>
                        <label for="activityType">Activity Type</label>
                        <select
                            id="activityType"
                            v-model="activityCreateRequest.activityType"
                            name="activityType"
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
                        </select>
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <input
                            id="date"
                            v-model="activityCreateRequest.date"
                            type="datetime-local"
                            name="date"
                        >
                    </div>
                </div>
                <label for="title">Title</label>
                <input
                    id="title"
                    v-model="activityCreateRequest.title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    required
                >
                <label for="description">Description</label>
                <textarea
                    id="description"
                    v-model="activityCreateRequest.description"
                    name="description"
                    placeholder="Description"
                    required
                />
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
            </form>
        </div>
    </div>
</template>

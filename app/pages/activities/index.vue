<script setup lang="ts">
import AppActivityCard from "~/components/app/activity/ActivityCard.vue";

const { data: activities, error, status } = await useFetch("/api/activities", {
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
        <div class="grid">
            <div>
                <h1>
                    Activities
                </h1>
            </div>
            <div style="text-align: right;">
                <NuxtLink
                    type="button"
                    to="/activities/create"
                >
                    Create Activity
                </NuxtLink>
            </div>
        </div>
        <div v-if="status === 'pending'">
            <AppActivityCardSkeleton />
            <AppActivityCardSkeleton />
            <AppActivityCardSkeleton />
            <AppActivityCardSkeleton />
            <AppActivityCardSkeleton />
        </div>
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article v-if="activities?.length === 0">
                You have no activities yet. Start by creating one!
            </article>
            <AppActivityCard
                v-for="activity in activities"
                v-else
                :activity="activity"
            />
        </div>
    </div>
</template>

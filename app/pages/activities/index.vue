<script setup lang="ts">
import AppActivityCard from "~~/app/components/app/activity/ActivityCard.vue";

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
    <div class="centered">
        <div class="grid always">
            <div>
                <h1>
                    Activities
                </h1>
            </div>
            <div style="display: flex; align-items: center; justify-content: right;">
                <NuxtLink
                    to="/activities/create"
                    data-tooltip="Manually create a new activity"
                >
                    <Icon
                        name="material-symbols-light:add-circle-outline"
                        style="font-size: 1.7rem;"
                    />
                </NuxtLink>
                <NuxtLink
                    to="/activities/upload"
                    data-tooltip="Upload activity from a GPX file"
                >
                    <Icon
                        name="material-symbols-light:upload-file-outline-rounded"
                        style="font-size: 1.7rem;"
                    />
                </NuxtLink>
            </div>
        </div>
        <div class="grid grid-33-67">
            <div>
                <AppActivityStats />
            </div>
            <div>
                <div class="stacked">
                    <Transition name="fade">
                        <div v-if="status === 'pending'">
                            <AppActivityCardSkeleton />
                            <AppActivityCardSkeleton />
                            <AppActivityCardSkeleton />
                            <AppActivityCardSkeleton />
                            <AppActivityCardSkeleton />
                        </div>
                        <div v-else-if="error">
                            <article class="error">
                                {{ error.statusMessage }}
                            </article>
                        </div>
                        <div v-else>
                            <article v-if="activities?.length === 0">
                                You have no activities yet. Start by creating one!
                            </article>
                            <AppActivityCard
                                v-for="activity in activities"
                                v-else
                                :key="activity.id"
                                :activity="activity"
                            />
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @media (min-width: 768px) {
      .grid-33-67 {
        grid-template-columns: 33% auto;
      }
    }
</style>

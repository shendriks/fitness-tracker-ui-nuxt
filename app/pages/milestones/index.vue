<script setup lang="ts">
import MilestoneCardSkeleton from "~/components/app/milestone/MilestoneCardSkeleton.vue";

const { data: milestones, error, status } = await useFetch("/api/milestones", {
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
                    Milestones
                </h1>
            </div>
        </div>
        <div v-if="status === 'pending'">
            <div class="flex-container">
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <MilestoneCardSkeleton />
                </div>
            </div>
        </div>
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article v-if="milestones?.length === 0">
                Bummer, no milestones found.
            </article>
            <div
                v-else
                class="flex-container"
            >
                <div
                    v-for="milestone in milestones"
                    :key="milestone.id"
                    class="flex-item flex-item-3"
                >
                    <AppMilestoneCard :milestone="milestone" />
                </div>
            </div>
        </div>
    </div>
</template>

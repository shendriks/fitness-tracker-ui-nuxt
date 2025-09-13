<script setup lang="ts">
import MilestoneCardSkeleton from "~~/app/components/app/milestone/MilestoneCardSkeleton.vue";

const { data: milestones, error, status } = await myUseFetch("/api/milestones", {
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
        <h1>
            Milestones
        </h1>
        <div class="stacked">
            <Transition name="fade">
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
                <div v-else-if="error">
                    <article class="error">
                        {{ error.statusMessage }}
                    </article>
                </div>
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
            </Transition>
        </div>
    </div>
</template>

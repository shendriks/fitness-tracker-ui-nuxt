<script setup lang="ts">
import AchievementCard from "~/components/app/achievement/AchievementCard.vue";
import AchievementCardSkeleton from "~/components/app/achievement/AchievementCardSkeleton.vue";

const { data: achievements, error, status } = await useFetch("/api/achievements", {
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
                    Your Achievements
                </h1>
            </div>
        </div>
        <div v-if="status === 'pending'">
            <div class="flex-container">
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <AchievementCardSkeleton />
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
            <article v-if="achievements?.length === 0">
                You have no achievements yet. Start by completing some challenges!
            </article>
            <div
                v-else
                class="flex-container"
            >
                <div
                    v-for="achievement in achievements"
                    class="flex-item flex-item-3"
                >
                    <AchievementCard :achievement="achievement" />
                </div>
            </div>
        </div>
    </div>
</template>

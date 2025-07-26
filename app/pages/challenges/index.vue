<script setup lang="ts">
import ChallengeCard from "~/components/app/challenge/ChallengeCard.vue";
import ChallengeCardSkeleton from "~/components/app/challenge/ChallengeCardSkeleton.vue";

const { data: challenges, error, status } = await useFetch("/api/challenges", {
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
                    Available Challenges
                </h1>
            </div>
        </div>
        <div v-if="status === 'pending'">
            <div class="flex-container">
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <ChallengeCardSkeleton />
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
            <article v-if="challenges?.length === 0">
                Bummer, no challenges found.
            </article>
            <div
                v-else
                class="flex-container"
            >
                <div
                    v-for="challenge in challenges"
                    :key="challenge.id"
                    class="flex-item flex-item-3"
                >
                    <ChallengeCard :challenge="challenge" />
                </div>
            </div>
        </div>
    </div>
</template>

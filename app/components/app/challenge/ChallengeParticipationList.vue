<script setup lang="ts">
import ChallengeParticipationSkeleton from "~/components/app/challenge/ChallengeParticipationSkeleton.vue";
import AppChallengeParticipationCard from "~/components/app/challenge/ChallengeParticipationCard.vue";

const { data: challengeParticipations, error, status } = await useFetch("/api/challenge-participations", {
    key: "challengeParticipationList",
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<script lang="ts">
export default {
    name: "AppChallengeParticipationList",
};
</script>

<template>
    <h2>
        My Challenges
    </h2>
    <div v-if="status === 'pending'">
        <div class="flex-container">
            <div class="flex-item flex-item-4">
                <ChallengeParticipationSkeleton />
            </div>
            <div class="flex-item flex-item-4">
                <ChallengeParticipationSkeleton />
            </div>
            <div class="flex-item flex-item-4">
                <ChallengeParticipationSkeleton />
            </div>
            <div class="flex-item flex-item-4">
                <ChallengeParticipationSkeleton />
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
        <article v-if="challengeParticipations?.length === 0">
            You're not participating in any challenges yet.
        </article>
        <div
            v-else
            class="flex-container"
        >
            <div
                v-for="challengeParticipation in challengeParticipations"
                :key="challengeParticipation.id"
                class="flex-item flex-item-4"
            >
                <AppChallengeParticipationCard :challenge-participation="challengeParticipation" />
            </div>
        </div>
    </div>
</template>

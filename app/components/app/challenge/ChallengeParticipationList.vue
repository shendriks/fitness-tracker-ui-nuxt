<script setup lang="ts">
import AppChallengeParticipationSkeleton from "~/components/app/challenge/ChallengeParticipationSkeleton.vue";
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
    <h3>
        My Challenges
    </h3>
    <div class="stacked overflow-auto">
        <Transition name="fade">
            <div v-if="status === 'pending'">
                <div class="row">
                    <div>
                        <AppChallengeParticipationSkeleton />
                    </div>
                    <div>
                        <AppChallengeParticipationSkeleton />
                    </div>
                    <div>
                        <AppChallengeParticipationSkeleton />
                    </div>
                    <div>
                        <AppChallengeParticipationSkeleton />
                    </div>
                </div>
            </div>
            <div v-else-if="error">
                <article class="error">
                    {{ error.statusMessage }}
                </article>
            </div>
            <div v-else>
                <article v-if="challengeParticipations?.length === 0">
                    You're not participating in any challenges yet. Start by joining one or more of the challenges below!
                </article>
                <div
                    v-else
                    class="row"
                >
                    <div
                        v-for="challengeParticipation in challengeParticipations"
                        :key="challengeParticipation.id"
                    >
                        <AppChallengeParticipationCard :challenge-participation="challengeParticipation" />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

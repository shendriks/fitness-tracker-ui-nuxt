<script setup lang="ts">
import ChallengeCard from "~~/app/components/app/challenge/ChallengeCard.vue";
import ChallengeCardSkeleton from "~~/app/components/app/challenge/ChallengeCardSkeleton.vue";

const { data: challenges, error, status } = await useFetch("/api/challenges", {
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
    name: "AppChallengeList",
};
</script>

<template>
    <h3>
        Available Challenges
    </h3>
    <div class="stacked">
        <Transition name="fade">
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
            <div v-else-if="error">
                <article class="error">
                    {{ error.statusMessage }}
                </article>
            </div>
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
        </Transition>
    </div>
</template>

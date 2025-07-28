<script lang="ts">
import type { PropType } from "vue";
import type { ChallengeResponse } from "~/dto/challenge/ChallengeResponse";
import type { FetchError } from "ofetch";

export default {
    name: "AppChallengeCard",
    props: {
        challenge: {
            type: Object as PropType<ChallengeResponse>,
            required: true,
        },
    },
};
</script>

<script setup lang="ts">
const errorMessage = ref("");
const loading = ref(false);

async function refreshChallengeParticipationList() {
    await refreshNuxtData(["challengeParticipationList"]);
}

function joinChallenge(challenge: ChallengeResponse) {
    loading.value = true;
    errorMessage.value = "";
    $fetch(`/api/challenges/${challenge.id}/join`, {
        method: "POST",
    }).then(async () => {
        challenge.hasUserJoined = true;
        push.success({
            title: "Challenge joined",
            message: `Challenge '${challenge.name}' joined successfully!`,
        });
        await refreshChallengeParticipationList();
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Joining challenge failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}

function leaveChallenge(challenge: ChallengeResponse) {
    loading.value = true;
    errorMessage.value = "";
    $fetch(`/api/challenges/${challenge.id}/leave`, {
        method: "POST",
    }).then(async () => {
        challenge.hasUserJoined = false;
        push.success({
            title: "Challenge left",
            message: `Challenge '${challenge.name}' left successfully!`,
        });
        await refreshChallengeParticipationList();
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Leaving challenge failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
</script>

<template>
    <article style="height: 100%;">
        <header style="text-align: center;">
            <img
                v-if="challenge.imageData"
                :src="`data:image/png;base64,${challenge.imageData}`"
                :alt="challenge.name"
                height="70"
                width="70"
            >
            <img
                v-else
                src="/images/trophy-placeholder.png"
                :alt="challenge.name"
                height="70"
                width="70"
            >
        </header>
        <h4>{{ challenge.name }}</h4>
        <p>{{ challenge.description }}</p>
        <footer>
            <div style="text-align: center;">
                <small>
                    <NuxtTime
                        :datetime="challenge.startDate"
                        year="numeric"
                        month="numeric"
                        day="numeric"
                    /> &mdash;
                    <NuxtTime
                        :datetime="challenge.endDate"
                        year="numeric"
                        month="numeric"
                        day="numeric"
                    />
                </small>
                <div v-if="challenge.hasUserJoined">
                    <button
                        v-if="loading"
                        style="width: 100%"
                        class="secondary"
                        aria-busy="true"
                        disabled
                    >
                        Leaving ...
                    </button>
                    <button
                        v-else
                        style="width: 100%"
                        class="secondary"
                        @click="leaveChallenge(challenge)"
                    >
                        Leave challenge
                    </button>
                </div>
                <div v-else>
                    <button
                        v-if="loading"
                        style="width: 100%"
                        aria-busy="true"
                        disabled
                    >
                        Joining ...
                    </button>
                    <button
                        v-else
                        style="width: 100%"
                        @click="joinChallenge(challenge)"
                    >
                        Join challenge
                    </button>
                </div>
            </div>
        </footer>
    </article>
</template>

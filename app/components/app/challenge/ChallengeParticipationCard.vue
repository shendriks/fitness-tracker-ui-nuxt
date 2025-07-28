<script lang="ts">
import type { PropType } from "vue";
import type { ChallengeParticipationResponse } from "~/dto/challenge/ChallengeParticipationResponse";

export default {
    name: "AppChallengeParticipationCard",
    props: {
        challengeParticipation: {
            type: Object as PropType<ChallengeParticipationResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <article style="min-width: 150px;">
        <header style="text-align: center;">
            <div>
                <img
                    v-if="challengeParticipation.challenge.imageData"
                    :src="`data:image/png;base64,${challengeParticipation.challenge.imageData}`"
                    :alt="challengeParticipation.challenge.name"
                    height="70"
                    width="70"
                >
                <img
                    v-else
                    src="/images/trophy-placeholder.png"
                    :alt="challengeParticipation.challenge.name"
                    height="70"
                    width="70"
                >
            </div>
        </header>
        <div style="text-align: center;">
            {{ challengeParticipation.percentageCompleted }}%
        </div>
        <progress
            :value="challengeParticipation.percentageCompleted"
            max="100"
        />
        <small>{{ challengeParticipation.challenge.name }}</small>
        <!--        <small>Joined at <NuxtTime -->
        <!--            :datetime="challengeParticipation.joinedAt" -->
        <!--            year="numeric" -->
        <!--            month="numeric" -->
        <!--            day="numeric" -->
        <!--        /></small> -->
    </article>
</template>

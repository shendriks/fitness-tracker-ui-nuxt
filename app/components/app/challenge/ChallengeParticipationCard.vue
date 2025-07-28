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
    <article>
        <header style="text-align: center;">
            <div
                :data-tooltip="challengeParticipation.challenge.name"
                style="border: none;"
            >
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
        <div
            :data-tooltip="`Completed ${challengeParticipation.percentageCompleted}% of the challenge`"
            style="border: none;"
        >
            <progress
                :value="challengeParticipation.percentageCompleted"
                max="100"
            />
        </div>
        <!--        <p>{{ challengeParticipation.challenge.name }}</p> -->
        <!--        <small>Joined at <NuxtTime -->
        <!--            :datetime="challengeParticipation.joinedAt" -->
        <!--            year="numeric" -->
        <!--            month="numeric" -->
        <!--            day="numeric" -->
        <!--        /></small> -->
    </article>
</template>

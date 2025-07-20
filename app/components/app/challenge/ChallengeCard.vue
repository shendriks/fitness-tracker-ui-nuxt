<script lang="ts">
import type { PropType } from "vue";
import type { ChallengeResponse } from "~/domain/challenge/dto/ChallengeResponse";

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

<template>
    <article style="height: 100%;">
        <header style="text-align: center;">
            <img
                :src="`data:image/png;base64,${challenge.imageData}`"
                :alt="challenge.name"
            >
        </header>
        <h4>{{ challenge.name }}</h4>
        <p>{{ challenge.description }}</p>
    </article>
</template>

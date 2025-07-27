<script lang="ts">
import type { PropType } from "vue";
import type { TrophyResponse } from "~/dto/trophy/TrophyResponse";

export default {
    name: "AppTrophyCard",
    props: {
        trophy: {
            type: Object as PropType<TrophyResponse>,
            required: true,
        },
    },
};
</script>

<script setup lang="ts">
</script>

<template>
    <article style="height: 100%;">
        <header style="text-align: center;">
            <img
                v-if="trophy.achievement.imageData"
                :src="`data:image/png;base64,${trophy.achievement.imageData}`"
                :alt="trophy.achievement.name"
            >
            <img
                v-else
                src="/images/trophy-placeholder.png"
                :alt="trophy.achievement.name"
            >
        </header>
        <h4>{{ trophy.achievement.name }}</h4>
        <p>{{ trophy.achievement.description }}</p>
        <footer>
            <small>
                Unlocked at <NuxtTime
                    :datetime="trophy.unlockedAt"
                    year="numeric"
                    month="numeric"
                    day="numeric"
                    hour="2-digit"
                    minute="2-digit"
                />
            </small>
        </footer>
    </article>
</template>

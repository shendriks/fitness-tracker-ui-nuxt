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
    <article style="height: 100%; text-align: center;">
        <header>
            <img
                v-if="trophy.achievement.imageFilePath"
                :src="trophy.achievement.imageFilePath"
                :alt="trophy.achievement.name"
                height="70"
                width="70"
            >
            <img
                v-else
                src="/images/trophy-placeholder.png"
                :alt="trophy.achievement.name"
                height="70"
                width="70"
            >
        </header>
        <div style="vertical-align: middle; display: flex;">
            <b>⭐</b>
            <b v-if="trophy.achievementType === 'milestone'">
                Milestone completed
            </b>
            <b v-else-if="trophy.achievementType === 'challenge'">
                Challenge completed
            </b>
            <b>⭐</b>
        </div>
        <hr>
        <h4>{{ trophy.achievement.name }}</h4>
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

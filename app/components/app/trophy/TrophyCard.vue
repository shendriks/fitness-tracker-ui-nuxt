<script lang="ts">
import type { PropType } from "vue";
import type { TrophyResponse } from "~~/dto/trophy/TrophyResponse";
import AppTime from "~/components/app/Time.vue";

export default {
    name: "AppTrophyCard",
    components: { AppTime },
    props: {
        trophy: {
            type: Object as PropType<TrophyResponse>,
            required: true,
        },
    },
};
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
                class="trophy"
            >
            <img
                v-else
                src="/images/trophy-placeholder.png"
                :alt="trophy.achievement.name"
                height="70"
                width="70"
                class="trophy"
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
                Unlocked at <AppTime :datetime="trophy.unlockedAt" />
            </small>
        </footer>
    </article>
</template>

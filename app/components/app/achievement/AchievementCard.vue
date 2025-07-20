<script lang="ts">
import type { PropType } from "vue";
import type { AchievementResponse } from "~/domain/achievement/dto/AchievementResponse";

export default {
    name: "AppAchievementCard",
    props: {
        achievement: {
            type: Object as PropType<AchievementResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <article style="height: 100%;">
        <header style="text-align: center;">
            <img
                :src="`data:image/png;base64,${achievement.challenge.imageData}`"
                :alt="achievement.challenge.name"
            >
        </header>
        <h4>{{ achievement.challenge.name }}</h4>
        <p>
            Congratulations! Challenge completed with activity
            <NuxtLink :to="{ name: 'activities-id', params: { id: achievement.activity.id } }">
                {{ achievement.activity.title }}
            </NuxtLink>.
        </p>
    </article>
</template>

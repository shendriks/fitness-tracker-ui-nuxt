<script lang="ts">
import type { PropType } from "vue";
import type { MilestoneResponse } from "~~/dto/milestone/MilestoneResponse";

export default {
    name: "AppMilestoneCard",
    props: {
        milestone: {
            type: Object as PropType<MilestoneResponse>,
            required: true,
        },
    },
};
</script>

<script setup lang="ts">
</script>

<template>
    <article
        style="height: 100%;"
        :class="{ 'grayed-out': !milestone.isCompleted }"
    >
        <header style="text-align: center;">
            <img
                v-if="milestone.imageFilePath"
                :src="milestone.imageFilePath"
                :alt="milestone.name"
                height="70"
                width="70"
            >
            <img
                v-else
                src="/images/trophy-placeholder.png"
                :alt="milestone.name"
                height="70"
                width="70"
            >
        </header>
        <h4>{{ milestone.name }}</h4>
        <p>{{ milestone.description }}</p>
    </article>
</template>

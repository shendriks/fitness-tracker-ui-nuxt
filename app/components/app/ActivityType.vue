<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~/domain/activity/dto/ActivityResponse";

export default {
    name: "AppActivityType",
    props: {
        activity: Object as PropType<ActivityResponse>,
    },
};
</script>

<template>
    <span class="activity-type">
        <span v-if="activity.activityType === 'running'">🏃</span>
        <span v-else-if="activity.activityType === 'swimming'">🏊</span>
        <span v-else-if="activity.activityType === 'cycling'">🚴</span>
        <span v-else-if="activity.activityType === 'mountain_biking'">🚵</span>
        <span v-else-if="activity.activityType === 'walking'">🚶</span>
        <span v-else>❔</span>
    </span>
</template>

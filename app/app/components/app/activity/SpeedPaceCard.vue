<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";

export default {
    name: "AppSpeedPaceCard",
    props: {
        activity: {
            type: Object as PropType<ActivityResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <span v-if="activity.activityType === 'running' || activity.activityType === 'walking'">
        Average Pace <b>{{ (1000.0 / activity.averageSpeed).toFixed(2) }}</b> s/km
    </span>
    <span v-else>
        Average Speed <b>{{ activity.averageSpeed.toFixed(2) }}</b> m/s
    </span>
</template>

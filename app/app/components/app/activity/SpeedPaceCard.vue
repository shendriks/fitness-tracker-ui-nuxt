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
        Average Pace <b><AppTime :time="activity.averageSpeed > 0 ? (1000.0 / activity.averageSpeed) : 0" /></b> s/km
    </span>
    <span v-else>
        Average Speed <b>{{ (activity.averageSpeed * 3.6).toFixed(2) }}</b> km/h
    </span>
</template>

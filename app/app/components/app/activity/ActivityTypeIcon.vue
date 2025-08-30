<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";

export default {
    name: "AppActivityTypeIcon",
    props: {
        activity: {
            type: Object as PropType<ActivityResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <span class="activity-type">
        <span
            v-if="activity.activityType === 'running'"
            data-tooltip="Running"
        >🏃</span>
        <span
            v-else-if="activity.activityType === 'swimming'"
            data-tooltip="Swimming"
        >🏊</span>
        <span
            v-else-if="activity.activityType === 'cycling'"
            data-tooltip="Cycling"
        >🚴</span>
        <span
            v-else-if="activity.activityType === 'mountain_biking'"
            data-tooltip="Mountain Biking"
        >🚵</span>
        <span
            v-else-if="activity.activityType === 'walking'"
            data-tooltip="Walking"
        >🚶</span>
        <span v-else>❔</span>
    </span>
</template>

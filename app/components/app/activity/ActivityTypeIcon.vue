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
            style="border: none;"
        >
            <Icon name="ic:round-directions-run" />
        </span>
        <span
            v-else-if="activity.activityType === 'swimming'"
            data-tooltip="Swimming"
            style="border: none;"
        >
            <Icon name="maki:swimming" />
        </span>
        <span
            v-else-if="activity.activityType === 'cycling'"
            data-tooltip="Cycling"
            style="border: none;"
        >
            <Icon name="carbon:bicycle" />
        </span>
        <span
            v-else-if="activity.activityType === 'mountain_biking'"
            data-tooltip="Mountain Biking"
            style="border: none;"
        >
            <Icon name="emojione-monotone:person-mountain-biking" />
        </span>
        <span
            v-else-if="activity.activityType === 'walking'"
            data-tooltip="Walking"
            style="border: none;"
        >
            <Icon name="ic:round-directions-walk" />
        </span>
        <span v-else>❔</span>
    </span>
</template>

<style scoped>
span.activity-type {
  font-size: 1.7rem;
  vertical-align: middle;
}
</style>

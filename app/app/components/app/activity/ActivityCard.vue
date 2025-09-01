<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import { durationInSecondsToFormattedString, metersToKilometers, speedToPace } from "~~/lib/util";

export default {
    name: "AppActivityCard",
    components: { AppActivityTypeIcon },
    props: {
        activity: {
            type: Object as PropType<ActivityResponse>,
            required: true,
        },
    },
    methods: { metersToKilometers, speedToPace, durationInSecondsToFormattedString },
};
</script>

<template>
    <article :key="activity.id">
        <NuxtLink :to="{ name: 'activities-id', params: { id: activity.id } }"><h4>{{ activity.title }}</h4></NuxtLink>
        <AppActivityTypeIcon :activity="activity" />
        <small>
            <NuxtTime
                :datetime="activity.startDate"
                year="numeric"
                month="numeric"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
            />
        </small>
        <hr>
        Duration <b>{{ durationInSecondsToFormattedString(activity.duration) }}</b> &mdash;
        Distance <b>{{ metersToKilometers(activity.distance).toFixed(2) }}</b> km &mdash;
        <span v-if="activity.activityType === 'running' || activity.activityType === 'walking'">
            Average Pace
            <b>{{ durationInSecondsToFormattedString(speedToPace(activity.averageSpeed)) }}</b> / km
        </span>
        <span v-else>
            Average Speed
            <b>{{ (activity.averageSpeed * 3.6).toFixed(2) }}</b> km/h
        </span>
    </article>
</template>

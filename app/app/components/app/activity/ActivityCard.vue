<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import { durationInSecondsToFormattedString, metersToKilometers, speedToPace } from "~~/lib/util";
import AppTime from "~/components/app/Time.vue";

export default {
    name: "AppActivityCard",
    components: { AppTime, AppActivityTypeIcon },
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
        <header>
            <NuxtLink
                :to="`/activities/${activity.id}`"
                style="text-decoration: none;"
            >
                <div>
                    <h3 style="margin-bottom: 0;">
                        {{ activity.title }}
                    </h3>
                    <AppActivityTypeIcon :activity="activity" />
                    &mdash;
                    <small>
                        <AppTime :datetime="activity.startDate" />
                    </small>
                </div>
            </NuxtLink>
            <p v-if="activity.description">
                {{ activity.description }}
            </p>
        </header>
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

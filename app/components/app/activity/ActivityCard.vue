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
            <small>
                <AppTime :datetime="activity.startDate" />
            </small>
            &mdash;
            <AppActivityTypeIcon :activity="activity" />
            <NuxtLink :to="`/activities/${activity.id}`">
                <h3>
                    {{ activity.title }}
                </h3>
            </NuxtLink>
            <p
                v-if="activity.description"
                style="font-size: 0.9rem;"
            >
                {{ activity.description }}
            </p>
        </header>
        <div style="display: flex; justify-content: space-between; vertical-align: middle;">
            <div>
                <table style="min-height: 150px;">
                    <tbody>
                        <tr>
                            <td>Duration</td>
                            <td><b>{{ durationInSecondsToFormattedString(activity.duration) }}</b></td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><b>{{ metersToKilometers(activity.distance).toFixed(2) }}</b> km</td>
                        </tr>
                        <tr>
                            <td>
                                <span v-if="activity.activityType === 'running' || activity.activityType === 'walking'">
                                    Average Pace
                                </span>
                                <span v-else>
                                    Average Speed
                                </span>
                            </td>
                            <td>
                                <span v-if="activity.activityType === 'running' || activity.activityType === 'walking'">
                                    <b>{{ durationInSecondsToFormattedString(speedToPace(activity.averageSpeed)) }}</b> / km
                                </span>
                                <span v-else>
                                    <b>{{ (activity.averageSpeed * 3.6).toFixed(2) }}</b> km/h
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <img
                v-if="activity.trackPreviewImage != null"
                :src="'data:image/png;base64,' + activity.trackPreviewImage"
                alt="Route Preview"
                style="width: 200px; height: 150px; background-color: var(--pico-background-color);"
            >
        </div>
    </article>
</template>

<style scoped>
a {
  text-decoration: none;
  h3 {
    color: var(--pico-primary);
  }
}

a:hover h3 {
  color: var(--pico-primary-hover);
}
</style>

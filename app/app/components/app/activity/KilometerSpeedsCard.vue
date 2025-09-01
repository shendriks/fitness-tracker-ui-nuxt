<script lang="ts">
import type { PropType } from "vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";
import { durationInSecondsToFormattedString, speedToPace, toKmh } from "~~/lib/util";

export default {
    name: "AppKilometerSpeedsCard",
    methods: { toKmh, speedToPace, durationInSecondsToFormattedString },
    props: {
        activity: {
            type: Object as PropType<ActivityDetailsResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <div
        v-if="activity.kilometerSpeeds.length > 0"
        class="speed-pace-table"
    >
        <table v-if="activity.activityType === 'running' || activity.activityType === 'walking'">
            <thead>
                <tr>
                    <th>Kilometer</th>
                    <th>Pace</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(speed, index) in activity.kilometerSpeeds"
                    :key="index"
                >
                    <td>{{ (index + 1) }}</td>
                    <td>{{ durationInSecondsToFormattedString(speedToPace(speed)) }} / km</td>
                </tr>
            </tbody>
        </table>
        <table v-else>
            <thead>
                <tr>
                    <th>Kilometer</th>
                    <th>Speed</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(speed, index) in activity.kilometerSpeeds"
                    :key="index"
                >
                    <td>{{ (index + 1) }}</td>
                    <td>{{ toKmh(speed).toFixed(2) }} km/h</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <table>
            <thead>
                <tr>
                    <th>Kilometer</th>
                    <th>Pace</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">
                        <i>No data available</i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.speed-pace-table {
  margin-bottom: 1.5rem;
  max-height: 270px;
  overflow: auto;
  scrollbar-width: thin;

  thead tr th {
    position: sticky;
    top: 0;
  }
}
</style>

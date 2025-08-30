<script lang="ts">
import type { PropType } from "vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";

export default {
    name: "AppKilometerSpeedsCard",
    props: {
        activity: {
            type: Object as PropType<ActivityDetailsResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <div v-if="activity.kilometerSpeeds.length > 0">
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
                    <td>{{ speed > 0 ? (1000.0 / speed).toFixed(2) : 0 }} s/km</td>
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
                    <td>{{ speed.toFixed(2) }} m/s</td>
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

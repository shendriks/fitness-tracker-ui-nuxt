<script lang="ts">
import type { PropType } from "vue";
import type { ActivityAggregationResponse } from "~~/dto/activity/ActivityAggregationResponse";
import { durationInSecondsToFormattedString, metersToKilometers } from "~~/lib/util";

export default {
    name: "AppActivityStatsDetail",
    props: {
        data: {
            type: Object as PropType<ActivityAggregationResponse>,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    methods: { metersToKilometers, durationInSecondsToFormattedString },
};
</script>

<template>
    <details>
        <summary>{{ label }}</summary>
        <table>
            <thead>
                <tr>
                    <th>Activity Count</th>
                    <th>Sum Duration</th>
                    <th>Sum Distance</th>
                    <th>Max Duration</th>
                    <th>Max Distance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ data.count }}</td>
                    <td>{{ durationInSecondsToFormattedString(data.totalDuration) }}</td>
                    <td>{{ metersToKilometers(data.totalDistance).toFixed(2) }} km</td>
                    <td>{{ durationInSecondsToFormattedString(data.maxDuration) }}</td>
                    <td>{{ metersToKilometers(data.maxDistance).toFixed(2) }} km</td>
                </tr>
            </tbody>
        </table>
    </details>
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

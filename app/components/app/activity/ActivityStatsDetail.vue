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
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    methods: { metersToKilometers, durationInSecondsToFormattedString },
};
</script>

<template>
    <details :open="isOpen">
        <summary :class="data.count > 0 ? '' : 'inactive'">
            {{ label }} {{ data.count > 0 ? `(${data.count})` : '' }}
        </summary>
        <table>
            <tbody>
                <tr>
                    <td>Activity Count</td>
                    <td>{{ data.count }}</td>
                </tr>
                <tr>
                    <td>Sum Duration</td>
                    <td>{{ durationInSecondsToFormattedString(data.totalDuration) }}</td>
                </tr>
                <tr>
                    <td>Sum Distance</td>
                    <td>{{ metersToKilometers(data.totalDistance).toFixed(2) }} km</td>
                </tr>
                <tr>
                    <td>Max Duration</td>
                    <td>{{ durationInSecondsToFormattedString(data.maxDuration) }}</td>
                </tr>
                <tr>
                    <td>Max Distance</td>
                    <td>{{ metersToKilometers(data.maxDistance).toFixed(2) }} km</td>
                </tr>
            </tbody>
        </table>
    </details>
</template>

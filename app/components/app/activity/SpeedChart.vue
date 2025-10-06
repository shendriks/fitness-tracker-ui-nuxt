<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { PropType } from "vue";
import { durationInSecondsToFormattedString } from "~~/lib/util";

const props = defineProps({
    speeds: {
        type: Array as PropType<{ speed: number; timestamp: Date }[]>,
        required: true,
    },
    label: { type: String, required: true },
    reverseYAxis: { type: Boolean, default: false },
    labelCallbackYAxis: { type: Function, default: v => v },
});
const firstTimestamp = props.speeds ? new Date(props.speeds[0].timestamp) : new Date();
const chartData = computed(() => ({
    labels: props.speeds.map(e => durationInSecondsToFormattedString(
        ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000, true),
    ),
    datasets: [
        {
            label: props.label,
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: props.speeds.map(e => e.speed),
            tension: 0.1,
            type: "line",
        },
    ],
}));

const chartOptions = {
    responsive: true,
    normalized: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
        x: {
            grid: {
                color: "#a0a0a055",
            },
        },
        y: {
            grid: {
                color: "#a0a0a055",
            },
            reverse: props.reverseYAxis,
            ticks: {
                callback: function (value, index, ticks) {
                    return props.labelCallbackYAxis(value);
                },
            },
        },
    },
};
</script>

<script lang="ts">
export default {
    name: "AppSpeedChart",
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { Line },
};
</script>

<template>
    <div class="chart-container">
        <Line
            id="speed-chart"
            :options="chartOptions"
            :data="chartData"
        />
    </div>
</template>

<style scoped>
  .chart-container {
    position: relative;
    height: 40vh;
    width: 100%;
  }
</style>

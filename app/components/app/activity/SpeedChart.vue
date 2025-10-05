<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { PropType } from "vue";
import { durationInSecondsToFormattedString } from "~~/lib/util";

const props = defineProps({
    speeds: {
        type: Array as PropType<{ speed: number; timestamp: Date }[]>,
        required: true,
    },
});
const firstTimestamp = props.speeds ? new Date(props.speeds[0].timestamp) : new Date();
const chartData = computed(() => ({
    labels: props.speeds.map(e => durationInSecondsToFormattedString(
        ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000, true),
    ),
    datasets: [
        {
            label: "Speed (m/s)",
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            // fill: {
            //     target: "origin",
            //     above: "#43b400aa",
            // },
            data: props.speeds.map(e => e.speed),
            // data: props.speeds.map(e => ({
            //     x: ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000,
            //     y: e.speed,
            // })),
            tension: 0,
            type: "line",
        },
    ],
}));
</script>

<script lang="ts">
export default {
    name: "AppSpeedChart",
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { Line },
};

const chartOptions = {
    responsive: true,
    normalized: true,
    maintainAspectRatio: false,
    animation: false,
    // parsing: false,
    indexAxis: "x",
    scales: {
        x: {
            // type: "time",
            grid: {
                color: "#a0a0a055",
            },
            // ticks: {
            //     source: "auto",
            //     // Disabled rotation for performance
            //     maxRotation: 0,
            //     autoSkip: true,
            // },
        },
        y: {
            grid: {
                color: "#a0a0a055",
            },
        },
    },
    plugins: {
        decimation: {
            enabled: false,
            algorithm: "lttb",
            samples: 10,
        },
    },
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

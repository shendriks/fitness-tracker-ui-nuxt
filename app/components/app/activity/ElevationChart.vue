<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { PropType } from "vue";
import { durationInSecondsToFormattedString } from "~~/lib/util";

const props = defineProps({
    elevations: {
        type: Array as PropType<{ altitude: number; timestamp: Date }[]>,
        required: true,
    },
});
const firstTimestamp = props.elevations ? new Date(props.elevations[0].timestamp) : new Date();
const chartData = computed(() => ({
    labels: props.elevations.map(e => durationInSecondsToFormattedString(
        ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000, true),
    ),
    datasets: [{
        label: "Altitude (m)",
        backgroundColor: "#D60901",
        borderColor: "#D60901",
        pointRadius: 0,
        fill: {
            target: "origin",
            above: "#D60901aa",
        },
        data: props.elevations.map(e => e.altitude),
        tension: 0.1,
    }],
}));
</script>

<script lang="ts">
export default {
    name: "AppElevationChart",
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { Line },
};

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
        },
    },
    plugins: {
        legend: {
            onClick: (e, legendItem, legend) => false, // disable legend toggle
        },
    },
};
</script>

<template>
    <div class="chart-container">
        <Line
            id="elevation-chart"
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

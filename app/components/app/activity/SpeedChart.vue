<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { PropType } from "vue";
import { durationInSecondsToFormattedString, centralMovingAverage } from "~~/lib/util";

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
const speedValues = props.speeds.map(e => e.speed);
const chartDataBySmoothingType = {
    "raw": speedValues,
    "moving-avg-1": centralMovingAverage(speedValues, speedValues.length * 0.01),
    "moving-avg-2": centralMovingAverage(speedValues, speedValues.length * 0.02),
    "moving-avg-5": centralMovingAverage(speedValues, speedValues.length * 0.05),
};
const currentChartDataSmoothingType = ref("raw");
const chartData = computed(() => ({
    labels: props.speeds.map(e => durationInSecondsToFormattedString(
        ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000, true),
    ),
    datasets: [
        {
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: chartDataBySmoothingType[currentChartDataSmoothingType.value] || [],
            tension: 0.1,
            type: "line",
            hidden: false,
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
            title: {
                display: true,
                text: props.label,
            },
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
    plugins: {
        legend: {
            display: false,
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
    <h4>{{ props.label }}</h4>
    <div class="grid">
        <div>
            Select Smoothing:
        </div>
        <div>
            <input
                id="raw"
                v-model="currentChartDataSmoothingType"
                type="radio"
                value="raw"
            >
            <label for="raw">None</label>
        </div>
        <div>
            <input
                id="moving-avg-1"
                v-model="currentChartDataSmoothingType"
                type="radio"
                value="moving-avg-1"
            >
            <label for="moving-avg-1">MA (1% of data)</label>
        </div>
        <div>
            <input
                id="moving-avg-2"
                v-model="currentChartDataSmoothingType"
                type="radio"
                value="moving-avg-2"
            >
            <label for="moving-avg-2">MA (2% of data)</label>
        </div>
        <div>
            <input
                id="moving-avg-5"
                v-model="currentChartDataSmoothingType"
                type="radio"
                value="moving-avg-5"
            >
            <label for="moving-avg-5">MA (5% of data)</label>
        </div>
    </div>
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

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
const chartData = computed(() => ({
    labels: props.speeds.map(e => durationInSecondsToFormattedString(
        ((new Date(e.timestamp)).getTime() - firstTimestamp.getTime()) / 1000, true),
    ),
    datasets: [
        {
            label: "Raw",
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: speedValues,
            tension: 0.1,
            type: "line",
            hidden: false,
        },
        {
            label: "Moving AVG, k=1%",
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: centralMovingAverage(speedValues, speedValues.length * 0.01),
            tension: 0.1,
            type: "line",
            hidden: true,
        },
        {
            label: "Moving AVG, k=2%",
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: centralMovingAverage(speedValues, speedValues.length * 0.02),
            tension: 0.1,
            type: "line",
            hidden: true,
        },
        {
            label: "Moving AVG, k=5%",
            backgroundColor: "#43b400",
            borderColor: "#43b400",
            pointRadius: 0,
            data: centralMovingAverage(speedValues, speedValues.length * 0.05),
            tension: 0.1,
            type: "line",
            hidden: true,
        },
    ],
}));

const newLegendClickHandler = function (e, legendItem, legend) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    for (let i = 0; i < legend.legendItems.length; i++) {
        if (i == index) {
            legend.legendItems[i].hidden = false;
            ci.show(i);
            continue;
        }
        legend.legendItems[i].hidden = true;
        ci.hide(i);
    }
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
            onClick: newLegendClickHandler,
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

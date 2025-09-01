<script setup lang="ts">
const categories = {
    altitude: {
        name: "Altitude",
        color: "#D60901",
    },
};
</script>

<script lang="ts">
export default {
    name: "AppElevationChart",
    props: {
        elevations: {
            type: Array as () => {
                altitude: number;
                timestamp: Date;
            }[],
            required: true,
        },
    },
};
</script>

<template>
    <LineChart
        :data="elevations"
        :categories="categories"
        :height="300"
        :x-formatter="(i: number) => elevations[i]?.timestamp"
        x-label=""
        y-label="Altitude"
    />
</template>

<style scoped>

</style>

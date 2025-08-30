<script lang="ts">
export default {
    name: "AppTime",
};
</script>

<script setup lang="ts">
const props = defineProps({
    time: {
        type: Number,
        required: true,
        description: "Time in seconds",
    },
});

const hours: number = Math.floor(props.time / 3600);
const minutes: number = Math.floor((props.time % 3600) / 60);
const seconds: number = Math.round((props.time % 3600) % 60);
const minuteString = String(minutes).padStart(2, "0");
const secondString = String(seconds).padStart(2, "0");

let timeString = `${minuteString}:${secondString}`;
if (hours > 0) {
    const hourString = String(hours).padStart(2, "0");
    timeString = `${hourString}:` + timeString;
}
</script>

<template>
    <span>
        {{ timeString }}
    </span>
</template>

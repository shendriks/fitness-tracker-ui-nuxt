<script setup lang="ts">
defineProps<{ datetime: Date | string | number }>();
</script>

<script lang="ts">
export default {
    name: "AppTime",
};
</script>

<template>
    <NuxtTime
        :datetime="datetime"
        year="numeric"
        month="numeric"
        day="numeric"
        hour="2-digit"
        minute="2-digit"
    />
</template>

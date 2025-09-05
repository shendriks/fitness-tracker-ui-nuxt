<script lang="ts">
export default {
    name: "AppTime",
    props: {
        datetime: { type: String, required: true },
    },
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

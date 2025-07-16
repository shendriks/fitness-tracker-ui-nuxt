<script setup lang="ts">
const { user } = useUserSession();
</script>

<template>
    <div>
        <h1>{{ user?.name }}</h1>
    </div>
</template>

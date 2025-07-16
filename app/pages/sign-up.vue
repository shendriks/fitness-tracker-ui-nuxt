<script setup lang="ts">
const { loggedIn } = useUserSession();
if (loggedIn.value) {
    await navigateTo("/");
}
</script>

<template>
    <h1>Sign Up</h1>
</template>

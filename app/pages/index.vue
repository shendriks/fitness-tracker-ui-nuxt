<script setup lang="ts">
const { user, clear: clearSession } = useUserSession();

async function logout() {
    await clearSession();
    await navigateTo("/login");
}
</script>

<template>
    <div v-if="user">
        <h1>Welcome {{ user.name }}</h1>
        <button @click="logout">
            Logout
        </button>
    </div>
    <div v-else>
        <h1>Welcome to Fitness Tracker</h1>
        <p>
            If you have an account, please
            <NuxtLink to="/login">login</NuxtLink>
            &mdash;
            or, you can
            <NuxtLink to="/sign-up">sign up</NuxtLink>
            to become part of our evergrowing community!
        </p>
    </div>
</template>

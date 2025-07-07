<script setup lang="ts">
const { data: activities, error, status } = await useFetch("/api/activities", {
    lazy: true,
});
</script>

<template>
    <div>
        <h1>Activities</h1>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
        />
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article
                v-for="activity in activities"
                :key="activity.id"
            >
                {{ activity }}
                <!--                <div class="button-container"> -->
                <!--                    <NuxtLink -->
                <!--                        role="button" -->
                <!--                        :to="{ name: 'tasks-id', params: { id: activity.id } }" -->
                <!--                    >View</NuxtLink> -->
                <!--                </div> -->
            </article>
        </div>
    </div>
</template>

<style scoped>

</style>

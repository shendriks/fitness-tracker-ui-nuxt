<script setup lang="ts">
const route = useRoute();

const { data: activity, error, status } = await useFetch(`/api/activities/${route.params.id}`, {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <div class="centered-medium">
        <h1>
            Activity
        </h1>
        <AppActivityCardSkeleton v-if="status === 'pending'" />
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <AppActivityCard
            v-else
            :activity="activity"
            :with-link="false"
        />
    </div>
</template>

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
    <div>
        <div class="grid">
            <div>
                <h1>
                    Activity
                </h1>
            </div>
        </div>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
            style="text-align: center;"
        >
            Loading Activity ...
        </article>
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <AppActivityCard
            v-else
            :activity="activity"
        />
    </div>
</template>

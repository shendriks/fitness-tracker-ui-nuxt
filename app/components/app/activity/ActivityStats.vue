<script lang="ts">
import ActivityStatsDetail from "~/components/app/activity/ActivityStatsDetail.vue";

export default {
    name: "AppActivityStats",
    components: { ActivityStatsDetail },
};
</script>

<script setup lang="ts">
const { data: activityStats, error, status } = await useFetch("/api/activities/stats", {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <article class="stats-card">
        <div v-if="status === 'pending'">
            <AppActivityCardSkeleton />
        </div>
        <div v-else-if="error">
            <article class="error">
                {{ error.statusMessage }}
            </article>
        </div>
        <div v-else-if="activityStats">
            <header>
                <b>Activity Stats</b>
            </header>
            <hr>
            <ActivityStatsDetail
                :data="activityStats.byType.walking"
                label="Walking"
            />
            <hr>
            <ActivityStatsDetail
                :data="activityStats.byType.running"
                label="Running"
            />
            <hr>
            <ActivityStatsDetail
                :data="activityStats.byType.cycling"
                label="Cycling"
            />
            <hr>
            <ActivityStatsDetail
                :data="activityStats.byType.mountain_biking"
                label="Mountain Biking"
            />
            <hr>
            <ActivityStatsDetail
                :data="activityStats.byType.swimming"
                label="Swimming"
            />
            <hr>
            <ActivityStatsDetail
                :data="activityStats.total"
                label="Total"
            />
        </div>
    </article>
</template>

<style scoped>
  article.stats-card {
    font-size: 0.8rem;
  }
</style>

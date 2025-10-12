<script lang="ts">
import AppActivityStatsDetail from "~/components/app/activity/ActivityStatsDetail.vue";
import AppActivityStatsSkeleton from "~/components/app/activity/ActivityStatsSkeleton.vue";

export default {
    name: "AppActivityStats",
    components: { AppActivityStatsDetail, AppActivityStatsSkeleton },
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
            <AppActivityStatsSkeleton />
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
            <AppActivityStatsDetail
                :data="activityStats.total"
                label="Total"
                is-open
            />
            <hr>
            <AppActivityStatsDetail
                :data="activityStats.byType.walking"
                label="Walking"
            />
            <hr>
            <AppActivityStatsDetail
                :data="activityStats.byType.running"
                label="Running"
            />
            <hr>
            <AppActivityStatsDetail
                :data="activityStats.byType.cycling"
                label="Cycling"
            />
            <hr>
            <AppActivityStatsDetail
                :data="activityStats.byType.mountain_biking"
                label="Mountain Biking"
            />
            <hr>
            <AppActivityStatsDetail
                :data="activityStats.byType.swimming"
                label="Swimming"
            />
        </div>
    </article>
</template>

<style scoped>
  article.stats-card {
    font-size: 0.8rem;
  }
</style>

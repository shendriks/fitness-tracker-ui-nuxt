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
        <header class="stats-header">
            Activity Stats
        </header>
        <div v-if="status === 'pending'">
            <AppActivityStatsSkeleton />
        </div>
        <div v-else-if="error">
            <article class="error">
                {{ error.statusMessage }}
            </article>
        </div>
        <div v-else-if="activityStats">
            <div v-if="activityStats.total.count > 0">
                <AppActivityStatsDetail
                    :data="activityStats.total"
                    label="Total"
                />
                <div v-if="activityStats.byType.walking.count > 0">
                    <hr>
                    <AppActivityStatsDetail
                        :data="activityStats.byType.walking"
                        label="Walking"
                    />
                </div>
                <div v-if="activityStats.byType.running.count > 0">
                    <hr>
                    <AppActivityStatsDetail
                        :data="activityStats.byType.running"
                        label="Running"
                    />
                </div>
                <div v-if="activityStats.byType.cycling.count > 0">
                    <hr>
                    <AppActivityStatsDetail
                        :data="activityStats.byType.cycling"
                        label="Cycling"
                    />
                </div>
                <div v-if="activityStats.byType.mountain_biking.count > 0">
                    <hr>
                    <AppActivityStatsDetail
                        :data="activityStats.byType.mountain_biking"
                        label="Mountain Biking"
                    />
                </div>
                <div v-if="activityStats.byType.swimming.count > 0">
                    <hr>
                    <AppActivityStatsDetail
                        :data="activityStats.byType.swimming"
                        label="Swimming"
                    />
                </div>
            </div>
            <div v-else>
                No data available.
            </div>
        </div>
    </article>
</template>

<style scoped>
  article.stats-card {
    font-size: 0.8rem;
  }

  header.stats-header {
    font-size: 1rem;
    font-weight: bold;
  }
</style>

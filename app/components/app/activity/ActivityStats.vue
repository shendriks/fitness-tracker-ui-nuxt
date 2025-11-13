<script lang="ts">
import AppActivityStatsDetail from "~/components/app/activity/ActivityStatsDetail.vue";
import AppActivityStatsSkeleton from "~/components/app/activity/ActivityStatsSkeleton.vue";

export default {
    name: "AppActivityStats",
    components: { AppActivityStatsDetail, AppActivityStatsSkeleton },
};
</script>

<script setup lang="ts">
const startDate = ref<Date | null>(null);
const selectedOption = ref<string>("last-7-days");

const { data: activityStats, error, status } = await useAsyncData(
    "activityStats",
    () => $fetch("/api/activities/stats", {
        query: {
            start: startDate.value?.toISOString(),
        },
    }), {
        watch: [startDate],
    },
);

function foo() {
    startDate.value = new Date();
    startDate.value.setHours(0, 0, 0, 0);
    switch (selectedOption.value) {
        case "last-7-days":
            startDate.value.setDate(startDate.value.getDate() - 7);
            break;
        case "last-30-days":
            startDate.value.setDate(startDate.value.getDate() - 30);
            break;
        case "last-3-months":
            startDate.value.setMonth(startDate.value.getMonth() - 3);
            break;
        case "last-6-months":
            startDate.value.setMonth(startDate.value.getMonth() - 6);
            break;
        case "last-year":
            startDate.value.setFullYear(startDate.value.getFullYear() - 1);
            break;
        default:
            startDate.value = null;
    }
}

// const { data: activityStats, error, status } = await useFetch("/api/activities/stats", {
//     lazy: true,
//     onResponseError({ response }) {
//         if (response.status === 401) {
//             navigateTo("/login");
//         }
//     },
// });
</script>

<template>
    <article class="stats-card">
        <header class="stats-header">
            <div class="grid">
                <div>
                    Activity Stats
                </div>
                <div>
                    <select
                        v-model="selectedOption"
                        style="padding: 0.2rem; font-size: 0.8rem;"
                        @change="foo"
                    >
                        <option
                            value="last-7-days"
                            selected
                        >
                            Last 7 days
                        </option>
                        <option
                            value="last-30-days"
                        >
                            Last 30 days
                        </option>
                        <option
                            value="last-3-months"
                        >
                            Last 3 months
                        </option>
                        <option
                            value="last-6-months"
                        >
                            Last 6 months
                        </option>
                        <option
                            value="last-year"
                        >
                            Last year
                        </option>
                        <option
                            value="since-beginning"
                        >
                            Since beginning
                        </option>
                    </select>
                </div>
            </div>
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

<script lang="ts">
import { durationInSecondsToFormattedString, metersToKilometers } from "~~/lib/util";

export default {
    name: "AppActivityStats",
    methods: { metersToKilometers, durationInSecondsToFormattedString },
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
    <article>
        <div v-if="status === 'pending'">
            <AppActivityCardSkeleton />
        </div>
        <div v-else-if="error">
            <article class="error">
                {{ error.statusMessage }}
            </article>
        </div>
        <div v-else>
            <header>
                <h1>Activity Stats</h1>
            </header>
            <h4>Overall</h4>
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Activity Count</th>
                        <th>Sum Duration</th>
                        <th>Sum Distance</th>
                        <th>Max Duration</th>
                        <th>Max Distance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Walking</b></td>
                        <td>{{ activityStats.byType.walking.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.walking.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.walking.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.walking.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.walking.maxDistance).toFixed(2) }} km</td>
                    </tr>
                    <tr>
                        <td><b>Running</b></td>
                        <td>{{ activityStats.byType.running.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.running.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.running.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.running.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.running.maxDistance).toFixed(2) }} km</td>
                    </tr>
                    <tr>
                        <td><b>Cycling</b></td>
                        <td>{{ activityStats.byType.cycling.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.cycling.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.cycling.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.cycling.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.cycling.maxDistance).toFixed(2) }} km</td>
                    </tr>
                    <tr>
                        <td><b>Mountain Biking</b></td>
                        <td>{{ activityStats.byType.mountain_biking.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.mountain_biking.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.mountain_biking.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.mountain_biking.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.mountain_biking.maxDistance).toFixed(2) }} km</td>
                    </tr>
                    <tr>
                        <td><b>Swimming</b></td>
                        <td>{{ activityStats.byType.swimming.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.swimming.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.swimming.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.byType.swimming.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.byType.swimming.maxDistance).toFixed(2) }} km</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{{ activityStats.total.count }}</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.total.totalDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.total.totalDistance).toFixed(2) }} km</td>
                        <td>{{ durationInSecondsToFormattedString(activityStats.total.maxDuration) }}</td>
                        <td>{{ metersToKilometers(activityStats.total.maxDistance).toFixed(2) }} km</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </article>
</template>

<style scoped>
a {
  text-decoration: none;
  h3 {
    color: var(--pico-primary);
  }
}

a:hover h3 {
  color: var(--pico-primary-hover);
}
</style>

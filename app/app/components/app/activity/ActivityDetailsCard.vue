<script lang="ts">
import type { PropType } from "vue";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";
import AppKilometerSpeedsCard from "~/components/app/activity/KilometerSpeedsCard.vue";
import { durationInSecondsToFormattedString, metersToKilometers, speedToPace } from "~~/lib/util";
import AppElevationChart from "~/components/app/activity/ElevationChart.vue";
import AppActivityMap from "~/components/app/activity/ActivityMap.vue";
import AppSkeleton from "~/components/app/Skeleton.vue";
import AppTime from "~/components/app/Time.vue";

export default {
    name: "AppDetailedActivityCard",
    components: { AppActivityMap, AppActivityTypeIcon, AppElevationChart, AppKilometerSpeedsCard, AppSkeleton, AppTime },
    props: {
        activityDetails: {
            type: Object as PropType<ActivityDetailsResponse>,
            required: true,
        },
        withLink: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<script setup lang="ts">
const showMap = ref<boolean>(false);

showMap.value = false;
setTimeout(function () {
    showMap.value = true;
}, 250);
</script>

<template>
    <article :key="activityDetails.id">
        <header>
            <h3 style="margin-bottom: 0;">
                {{ activityDetails.title }}
            </h3>
            <AppActivityTypeIcon :activity="activityDetails" />
            &mdash;
            <small>
                <AppTime :datetime="activityDetails.startDate" />
            </small>
            <p v-if="activityDetails.description">
                {{ activityDetails.description }}
            </p>
        </header>
        <div class="grid">
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Duration</td>
                            <td><b>{{ durationInSecondsToFormattedString(activityDetails.duration) }}</b></td>
                        </tr>
                        <tr>
                            <td>Motion Time</td>
                            <td>
                                <b>{{ durationInSecondsToFormattedString(activityDetails.motionTime) }}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>Pausing Time</td>
                            <td>
                                <b>{{ durationInSecondsToFormattedString(activityDetails.pausingTime) }}</b>
                            </td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><b>{{ metersToKilometers(activityDetails.distance).toFixed(2) }}</b> km</td>
                        </tr>
                        <tr v-if="activityDetails.activityType === 'running' || activityDetails.activityType === 'walking'">
                            <td>Average Pace</td>
                            <td><b>{{ durationInSecondsToFormattedString(speedToPace(activityDetails.averageSpeed)) }}</b> / km</td>
                        </tr>
                        <tr v-else>
                            <td>Average Speed</td>
                            <td><b>{{ (activityDetails.averageSpeed * 3.6).toFixed(2) }}</b> km/h</td>
                        </tr>
                        <tr>
                            <td>Elevation Gain</td>
                            <td v-if="activityDetails.elevationGain != null">
                                <b>{{ activityDetails.elevationGain?.toFixed(2) }}</b> m
                            </td>
                            <td v-else>
                                <b>&dash;</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <AppKilometerSpeedsCard :activity="activityDetails" />
            </div>
        </div>
        <div v-if="activityDetails.gpsPositions.length > 0">
            <div class="stacked">
                <Transition name="fade">
                    <div
                        v-if="!showMap"
                        style="height: 500px;"
                    >
                        <AppSkeleton style="height: 500px; width: 100%;" />
                    </div>
                    <AppActivityMap
                        v-else
                        :activity-details="activityDetails"
                    />
                </Transition>
            </div>
        </div>
        <div v-else>
            <article style="height: 500px; text-align: center; background-color: #77777733; border: 1px solid #77777777; border-radius: 0">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                No GPS data available.<br>
                <Icon
                    name="material-symbols:block"
                    style="font-size: 3rem;"
                />
            </article>
        </div>
        <hr>
        <AppElevationChart
            v-if="activityDetails.gpsPositions.length > 0"
            :elevations="activityDetails.gpsPositions.map(position => { return { altitude: position.altitude, timestamp: position.timestamp }; })"
        />
    </article>
</template>

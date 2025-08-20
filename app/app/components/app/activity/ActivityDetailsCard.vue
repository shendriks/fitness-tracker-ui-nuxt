<script lang="ts">
import type { PropType } from "vue";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";

const showMap = ref<boolean>(false);

export default {
    name: "AppDetailedActivityCard",
    components: { AppActivityTypeIcon },
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
showMap.value = false;
setTimeout(function () {
    // window.dispatchEvent(new Event("resize"));
    showMap.value = true;
}, 250);
</script>

<template>
    <article :key="activityDetails.id">
        <AppActivityTypeIcon :activity="activityDetails" />
        <small>
            <NuxtTime
                :datetime="activityDetails.startDate"
                year="numeric"
                month="long"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
            />
        </small>
        <hr>
        <h4>{{ activityDetails.title }}</h4>
        <small>{{ activityDetails.description }}</small><br>
        Duration <b>{{ activityDetails.duration }}</b> &mdash;
        Calories <b>{{ activityDetails.calories }}</b> &mdash;
        Distance <b>{{ activityDetails.distance }}</b>
        <div v-if="activityDetails.gpsPositions.length > 0">
            <div class="stacked">
                <Transition name="fade">
                    <div
                        v-if="!showMap"
                        style="height: 500px;"
                    >
                        <AppSkeleton style="height: 500px; width: 100%;" />
                    </div>
                    <LMap
                        v-else
                        ref="map"
                        style="height: 500px; z-index: 50;"
                        :zoom="13"
                        :center="[
                            activityDetails.gpsPositions.map(position => position.latitude).reduce((prev, current) => prev + current) / activityDetails.gpsPositions.length,
                            activityDetails.gpsPositions.map(position => position.longitude).reduce((prev, current) => prev + current) / activityDetails.gpsPositions.length,
                        ]"
                        :use-global-leaflet="false"
                    >
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                            layer-type="base"
                            name="OpenStreetMap"
                        />
                        <LMarker
                            :lat-lng="[
                                activityDetails.gpsPositions.at(0)?.latitude || 0,
                                activityDetails.gpsPositions.at(0)?.longitude || 0,
                            ]"
                        >
                            <LTooltip>Start</LTooltip>
                        </LMarker>
                        <LMarker
                            :lat-lng="[
                                activityDetails.gpsPositions.at(-1)?.latitude || 0,
                                activityDetails.gpsPositions.at(-1)?.longitude || 0,
                            ]"
                        >
                            <LTooltip>Finish</LTooltip>
                        </LMarker>
                        <LPolyline
                            :lat-lngs="activityDetails.gpsPositions.map(position => [position.latitude, position.longitude])"
                            color="#ee2222"
                        />
                    </LMap>
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
    </article>
</template>

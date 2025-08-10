<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~/dto/activity/ActivityResponse";
import AppActivityTypeIcon from "~/components/app/activity/ActivityTypeIcon.vue";

const showMap = ref<boolean>(false);

export default {
    name: "AppDetailedActivityCard",
    components: { AppActivityTypeIcon },
    props: {
        activity: {
            type: Object as PropType<ActivityResponse>,
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
    <article :key="activity.id">
        <AppActivityTypeIcon :activity="activity" />
        <small>
            <NuxtTime
                :datetime="activity.startDate"
                year="numeric"
                month="long"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
            />
        </small>
        <hr>
        <h4>{{ activity.title }}</h4>
        <small>{{ activity.description }}</small><br>
        Duration <b>{{ activity.duration }}</b> &mdash;
        Calories <b>{{ activity.calories }}</b> &mdash;
        Distance <b>{{ activity.distance }}</b>
        <div v-if="activity.gpsPositions.length > 0">
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
                            activity.gpsPositions.map(position => position.latitude).reduce((prev, current) => prev + current) / activity.gpsPositions.length,
                            activity.gpsPositions.map(position => position.longitude).reduce((prev, current) => prev + current) / activity.gpsPositions.length,
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
                                activity.gpsPositions.at(0)?.latitude || 0,
                                activity.gpsPositions.at(0)?.longitude || 0,
                            ]"
                        >
                            <LTooltip>Start</LTooltip>
                        </LMarker>
                        <LMarker
                            :lat-lng="[
                                activity.gpsPositions.at(-1)?.latitude || 0,
                                activity.gpsPositions.at(-1)?.longitude || 0,
                            ]"
                        >
                            <LTooltip>Finish</LTooltip>
                        </LMarker>
                        <LPolyline
                            :lat-lngs="activity.gpsPositions.map(position => [position.latitude, position.longitude])"
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

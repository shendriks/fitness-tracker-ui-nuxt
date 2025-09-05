<script lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";

export default {
    name: "AppActivityMap",
};
</script>

<script setup lang="ts">
const props = defineProps({
    activityDetails: {
        type: Object as PropType<ActivityDetailsResponse>,
        required: true,
    },
});

const latitudes = props.activityDetails.gpsPositions.map(position => position.latitude);
const longitudes = props.activityDetails.gpsPositions.map(position => position.longitude);
const maxLat = Math.max(...latitudes);
const minLat = Math.min(...latitudes);
const maxLong = Math.max(...longitudes);
const minLong = Math.min(...longitudes);

const map = ref(null);
const onMapReady = () => {
    const { leafletObject } = map.value;
    leafletObject.fitBounds([
        [minLat, minLong],
        [maxLat, maxLong],
    ]);
};
</script>

<template>
    <LMap
        ref="map"
        style="height: 500px; z-index: 50;"
        :use-global-leaflet="false"
        @ready="onMapReady"
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
</template>

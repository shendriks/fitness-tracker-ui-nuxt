<template>
    <LMap
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
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";

export default {
    name: "AppActivityMap",
    props: {
        activityDetails: {
            type: Object as PropType<ActivityDetailsResponse>,
            required: true,
        },
    },
};
</script>

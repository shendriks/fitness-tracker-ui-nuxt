<script setup lang="ts">
const { data: activities, error, status } = await useFetch("/api/activities", {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <div>
        <div class="grid">
            <div>
                <h1>
                    Activities
                </h1>
            </div>
            <div style="text-align: right;">
                <NuxtLink
                    type="button"
                    to="/activities/create"
                >
                    Create Activity
                </NuxtLink>
            </div>
        </div>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
            style="text-align: center;"
        >
            Loading Activities ...
        </article>
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article v-if="activities?.length === 0">
                You have no activities yet. Start by creating one!
            </article>
            <article
                v-for="activity in activities"
                v-else
                :key="activity.id"
            >
                <AppActivityType :activity="activity" />
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
                <NuxtLink :to="{ name: 'activities-id', params: { id: activity.id } }"><h4>{{ activity.title }}</h4></NuxtLink>
                <small>{{ activity.description }}</small><br>
                Duration <b>{{ activity.duration }}</b> &mdash;
                Calories <b>{{ activity.calories }}</b> &mdash;
                Distance <b>{{ activity.distance }}</b>
                <LMap
                    v-if="activity.gpsPositions.length > 0"
                    ref="map"
                    style="height: 350px"
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
                <p v-else>
                    No GPS data available :-(
                </p>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { data: activities, error, status } = await useFetch("/api/activities", {
    lazy: true,
    onResponseError({ request, response, options }) {
        console.log(request, response, options);
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
const zoom = ref(6);
</script>

<template>
    <div>
        <h1>Activities</h1>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
        />
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
                        :datetime="activity.createdAt"
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
                <LazyLMap
                    ref="map"
                    style="height: 350px"
                    :zoom="15"
                    :center="[50.9760493, 7.0721553]"
                    :use-global-leaflet="false"
                >
                    <LazyLTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        layer-type="base"
                        name="OpenStreetMap"
                    />
                    <LazyLMarker :lat-lng="[50.9760493, 7.0721553]" />
                </LazyLMap>

                <!--                <div class="button-container"> -->
                <!--                    <NuxtLink -->
                <!--                        role="button" -->
                <!--                        :to="{ name: 'tasks-id', params: { id: activity.id } }" -->
                <!--                    >View</NuxtLink> -->
                <!--                </div> -->
            </article>
        </div>
    </div>
</template>

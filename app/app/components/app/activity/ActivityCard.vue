<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import AppSpeedPaceCard from "~/components/app/activity/SpeedPaceCard.vue";
import AppTime from "~/components/app/Time.vue";

export default {
    name: "AppActivityCard",
    components: { AppSpeedPaceCard, AppActivityTypeIcon, AppTime },
    props: {
        activity: {
            type: Object as PropType<ActivityResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <article :key="activity.id">
        <NuxtLink :to="{ name: 'activities-id', params: { id: activity.id } }"><h4>{{ activity.title }}</h4></NuxtLink>
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
        Duration <b><AppTime :time="activity.duration" /></b> &mdash;
        Distance <b>{{ (activity.distance / 1000.0).toFixed(2) }}</b> km &mdash;
        <AppSpeedPaceCard :activity="activity" />
    </article>
</template>

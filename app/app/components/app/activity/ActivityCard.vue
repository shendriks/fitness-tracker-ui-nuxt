<script lang="ts">
import type { PropType } from "vue";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";
import AppActivityTypeIcon from "~~/app/components/app/activity/ActivityTypeIcon.vue";
import AppSpeedPaceCard from "~/components/app/activity/SpeedPaceCard.vue";

export default {
    name: "AppActivityCard",
    components: { AppSpeedPaceCard, AppActivityTypeIcon },
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
        <NuxtLink :to="{ name: 'activities-id', params: { id: activity.id } }"><h4>{{ activity.title }}</h4></NuxtLink>
        <small>{{ activity.description }}</small><br>
        Duration <b>{{ activity.duration }}</b> s &mdash;
        Distance <b>{{ activity.distance.toFixed(2) }}</b> m &mdash;
        <AppSpeedPaceCard :activity="activity" />
    </article>
</template>

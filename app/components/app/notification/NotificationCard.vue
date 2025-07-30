<script lang="ts">
import type { PropType } from "vue";
import type { TrophyResponse } from "~/dto/trophy/TrophyResponse";
import type { NotificationResponse } from "~/dto/notification/NotificationResponse";

export default {
    name: "AppNotificationCard",
    props: {
        notification: {
            type: Object as PropType<NotificationResponse>,
            required: true,
        },
    },
};
</script>

<script setup lang="ts">
</script>

<template>
    <article>
        <header>
            <h4>{{ notification.title }}</h4>
            <small>
                <NuxtTime
                    :datetime="notification.createdAt"
                    year="numeric"
                    month="numeric"
                    day="numeric"
                    hour="2-digit"
                    minute="2-digit"
                />
            </small>
        </header>
        <p>{{ notification.description }}</p>
    </article>
</template>

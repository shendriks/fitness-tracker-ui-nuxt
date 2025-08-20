<script lang="ts">
import type { PropType } from "vue";
import type { NotificationResponse } from "~~/dto/notification/NotificationResponse";

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
    <div class="notification-item">
        <div class="notification-header">
            <div>
                <b>{{ notification.title }}</b>
            </div>
            <div>
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
            </div>
        </div>
        {{ notification.description }}
    </div>
</template>

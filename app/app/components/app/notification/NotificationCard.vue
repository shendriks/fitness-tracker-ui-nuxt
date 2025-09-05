<script lang="ts">
import type { PropType } from "vue";
import type { NotificationResponse } from "~~/dto/notification/NotificationResponse";
import AppTime from "~/components/app/Time.vue";

export default {
    name: "AppNotificationCard",
    components: { AppTime },
    props: {
        notification: {
            type: Object as PropType<NotificationResponse>,
            required: true,
        },
    },
};
</script>

<template>
    <div class="notification-item">
        <div class="notification-header">
            <div>
                <b>{{ notification.title }}</b>
            </div>
            <div>
                <small>
                    <AppTime :datetime="notification.createdAt" />
                </small>
            </div>
        </div>
        {{ notification.description }}
    </div>
</template>

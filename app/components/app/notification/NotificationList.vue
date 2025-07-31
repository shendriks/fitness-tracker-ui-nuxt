<script setup lang="ts">
import NotificationCardSkeleton from "~/components/app/notification/NotificationCardSkeleton.vue";

const { data: notifications, error, status } = await useFetch("/api/notifications", {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<script lang="ts">
export default {
    name: "AppNotificationList",
};
</script>

<template>
    <div class="stacked">
        <Transition name="fade">
            <div v-if="status === 'pending'">
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
            </div>
            <div
                v-else-if="error"
                class="notification-item"
            >
                <div class="error">
                    {{ error.statusMessage }}
                </div>
            </div>
            <div v-else>
                <div
                    v-if="notifications?.length === 0"
                    class="notification-item"
                >
                    No notifications found.
                </div>
                <AppNotificationCard
                    v-for="notification in notifications"
                    :key="notification.id"
                    :notification="notification"
                />
            </div>
        </Transition>
    </div>
</template>

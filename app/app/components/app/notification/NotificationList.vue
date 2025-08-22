<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useNotificationStore } from "~~/stores/notifications";
import type { NotificationResponse } from "~~/dto/notification/NotificationResponse";

const notificationStore = useNotificationStore();
const notifications = ref<NotificationResponse[]>([]);
const loading = ref(true);
const errorMessage = ref("");
let refreshTimerId: NodeJS.Timeout;
let isFollowUpFetch = false;

const fetchNotifications = async () => {
    loading.value = true;

    const lastId = notifications.value.length > 0 ? notifications.value.at(0)?.id : null;
    const url = lastId
        ? `/api/notifications?sinceId=${encodeURIComponent(lastId)}`
        : "/api/notifications";

    $fetch<NotificationResponse[]>(
        url,
    ).then(async (data) => {
        errorMessage.value = "";

        const newNotifications = data || [];
        if (newNotifications.length === 0) {
            return;
        }

        notifications.value.unshift(...newNotifications);
        if (isHidden() && isFollowUpFetch) {
            notificationStore.incUnseenCount(newNotifications.length);
        }
    }).catch(async () => {
        errorMessage.value = "An error occurred while fetching notifications";
    }).finally(async () => {
        loading.value = false;
        isFollowUpFetch = true;
    });
};

function isHidden() {
    const notificationList = document.getElementById("notification-list");
    if (!notificationList) {
        return true;
    }
    const style = window.getComputedStyle(notificationList);
    return Number.parseFloat(style.opacity) <= 0;
}

function resetUnseenNotificationCount() {
    notificationStore.resetUnseenCount();
}

onMounted(async () => {
    await fetchNotifications();
    refreshTimerId ??= setInterval(fetchNotifications, 5000);
});

onBeforeUnmount(() => {
    if (refreshTimerId) {
        clearInterval(refreshTimerId);
    }
});
</script>

<script lang="ts">
export default {
    name: "AppNotificationList",
};
</script>

<template id="notification-list">
    <div
        @mouseenter="resetUnseenNotificationCount"
        @mousemove="resetUnseenNotificationCount"
    >
        <div
            v-if="errorMessage"
            class="notification-item"
        >
            <div
                class="error"
                style="padding: 5px; border-radius: 5px;"
            >
                {{ errorMessage }}
            </div>
        </div>
        <div>
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
    </div>
</template>

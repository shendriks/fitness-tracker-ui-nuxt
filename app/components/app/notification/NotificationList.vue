<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import NotificationCardSkeleton from "~/components/app/notification/NotificationCardSkeleton.vue";
import { store } from "~/lib/store";

const notifications = ref([]);
const loading = ref(true);
const errorMessage = ref("");
const statusMessage = ref("");
let refreshTimerId = null;
let isInitialFetch = true;

const fetchNotifications = async () => {
    loading.value = true;
    errorMessage.value = "";

    try {
        const lastId = notifications.value.length > 0 ? notifications.value[0].id : null;
        const url = lastId
            ? `/api/notifications?sinceId=${encodeURIComponent(lastId)}`
            : `/api/notifications`;

        const { data, error, status } = await useFetch(url, {
            server: false,
            immediate: true,
        });

        statusMessage.value = status;
        if (error.value) {
            errorMessage.value = error.value.message;
            return;
        }

        const newNotifications = data.value || [];
        if (newNotifications.length > 0) {
            notifications.value.unshift(...newNotifications);
            if (!isVisible() && !isInitialFetch) {
                store.unseenNotificationCount = newNotifications.length;
            }
        }
    }
    catch (err) {
        errorMessage.value = err.message || "Unknown error occurred.";
    }
    finally {
        loading.value = false;
        isInitialFetch = false;
    }
};

function isVisible() {
    const notificationList = document.getElementById("notification-list");
    if (!notificationList) {
        return false;
    }
    const style = window.getComputedStyle(notificationList);
    return Number.parseFloat(style.opacity) > 0;
}

function resetUnseenNotificationCount() {
    store.unseenNotificationCount = 0;
}

onMounted(async () => {
    await fetchNotifications();
    refreshTimerId = setInterval(fetchNotifications, 5000);
});

onBeforeUnmount(() => {
    clearInterval(refreshTimerId);
});
</script>

<script lang="ts">
export default {
    name: "AppNotificationList",
    methods: [
        "isVisible",
    ],
};
</script>

<template
    id="notification-list"
>
    <div
        class="stacked"
        @mouseenter="resetUnseenNotificationCount"
    >
        <Transition name="fade">
            <div v-if="statusMessage === 'pending'">
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
                <NotificationCardSkeleton />
            </div>
            <div
                v-else-if="errorMessage"
                class="notification-item"
            >
                <div class="error">
                    {{ errorMessage }}
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

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

<template>
    <div class="centered-medium">
        <h1>
            Notifications
        </h1>
        <div class="stacked">
            <Transition name="fade">
                <div v-if="status === 'pending'">
                    <NotificationCardSkeleton />
                    <NotificationCardSkeleton />
                    <NotificationCardSkeleton />
                    <NotificationCardSkeleton />
                    <NotificationCardSkeleton />
                </div>
                <div v-else-if="error">
                    <article class="error">
                        {{ error.statusMessage }}
                    </article>
                </div>
                <div v-else>
                    <article v-if="notifications?.length === 0">
                        No notifications found.
                    </article>
                    <AppNotificationCard
                        v-for="notification in notifications"
                        :key="notification.id"
                        :notification="notification"
                    />
                </div>
            </Transition>
        </div>
    </div>
</template>

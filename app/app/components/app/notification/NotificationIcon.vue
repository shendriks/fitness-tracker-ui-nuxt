<script setup lang="ts">
import { useNotificationStore } from "~~/stores/notifications";

const notificationStore = useNotificationStore();
</script>

<script lang="ts">
export default {
    name: "AppNotificationIcon",
};
</script>

<template>
    <div
        v-if="notificationStore.unseenNotificationCount > 0"
        class="notification-count"
    >
        {{ notificationStore.unseenNotificationCount < 10 ? notificationStore.unseenNotificationCount : "9+" }}
    </div>
    <Icon
        id="notifications-icon"
        name="ic:baseline-notifications"
        size="1.7rem"
    />
</template>

<style scoped>
.notification-count {
  border-radius: 50%;
  background-color: #d60901;
  width: 1.2rem;
  height: 1.2rem;
  color: white;
  position: absolute;
  z-index: 1;
  text-align: center;
  font-size: 0.8rem;
  top: 0;
  left: 25px;
}
</style>

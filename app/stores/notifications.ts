import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        unseenNotificationCount: 0,
    }),

    getters: {
        getUnseenCount: state => state.unseenNotificationCount,
    },

    actions: {
        setUnseenCount(count: number) {
            this.unseenNotificationCount = count;
        },

        resetUnseenCount() {
            this.unseenNotificationCount = 0;
        },
    },
});
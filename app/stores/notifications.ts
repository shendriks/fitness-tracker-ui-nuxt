import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notifications", {
    state: () => ({
        unseenNotificationCount: 0,
    }),

    getters: {
        getUnseenCount: state => state.unseenNotificationCount,
    },

    actions: {
        incUnseenCount(count: number) {
            this.unseenNotificationCount += count;
        },

        resetUnseenCount() {
            this.unseenNotificationCount = 0;
        },
    },
    persist: true,
});

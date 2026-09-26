import { beforeEach, describe, expect, it, vi } from "vitest";
import AppNavBar from "~~/app/components/app/NavBar.vue";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useNotificationStore } from "~~/stores/notifications";
import { ref } from "vue";

const { useUserSessionMock } = vi.hoisted(() => {
    return {
        useUserSessionMock: vi.fn(() => {
            return { loggedIn: false };
        }),
    };
});

mockNuxtImport("useUserSession", () => {
    return useUserSessionMock;
});
vi.mock("~~/public/js/theme-switcher", () => ({
    themeSwitcher: { init: vi.fn() },
}));

describe("NavBar", () => {
    let store: ReturnType<typeof useNotificationStore>;

    beforeEach(() => {
        store = useNotificationStore();
    });

    const mountComponent = async (loggedIn: boolean, route: string) => {
        useUserSessionMock.mockImplementation(() => {
            return { loggedIn: ref(loggedIn), fetch: vi.fn() };
        });

        return await mountSuspended(AppNavBar, {
            route: route,
        });
    };

    it("renders the logo correctly", async () => {
        const wrapper = await mountComponent(false, "/");
        expect(wrapper.find("img[alt=\"Fitness Tracker Logo\"]").exists()).toBe(true);
    });

    it("shows Login button when not logged in and route is 'home'", async () => {
        const wrapper = await mountComponent(false, "/");
        expect(wrapper.find("button.secondary").text()).toBe("Login");
    });

    it("shows Login button when not logged in and route is 'sign-up'", async () => {
        const wrapper = await mountComponent(false, "/sign-up");
        expect(wrapper.find("button.secondary").text()).toBe("Login");
    });

    it("shows Sign Up button when not logged in and route is 'login'", async () => {
        const wrapper = await mountComponent(false, "/login");
        expect(wrapper.find("button.secondary").text()).toBe("Sign Up");
    });

    it("doesn't show Activities dropdown when logged out", async () => {
        const wrapper = await mountComponent(false, "/");
        expect(wrapper.findAll("#activities-dropdown").length).toBe(0);
    });

    it("shows Activities dropdown when logged in", async () => {
        const wrapper = await mountComponent(true, "/");
        expect(wrapper.find("#activities-dropdown").exists()).toBe(true);
    });

    it("doesn't shows user profile dropdown when logged out", async () => {
        const wrapper = await mountComponent(false, "/");
        expect(wrapper.findAll("#nav-account-dropdown").length).toBe(0);
    });

    it("shows user profile dropdown when logged in", async () => {
        const wrapper = await mountComponent(true, "/");
        expect(wrapper.find("#nav-account-dropdown").exists()).toBe(true);
    });

    it("doesn't render notification count when no unseen notifications", async () => {
        store.unseenNotificationCount = 0;
        const wrapper = await mountComponent(true, "/");
        const notificationCount = wrapper.find(".notification-count");
        expect(notificationCount.exists()).toBe(false);
    });

    it("renders notification count with number of unseen notifications", async () => {
        store.unseenNotificationCount = 5;
        const wrapper = await mountComponent(true, "/");
        const notificationCount = wrapper.find(".notification-count");
        expect(notificationCount.exists()).toBe(true);
        expect(notificationCount.text()).toContain("5");
    });

    it("renders notification count with number of unseen notifications set to 9+ if more than 9", async () => {
        store.unseenNotificationCount = 10;
        const wrapper = await mountComponent(true, "/");
        const notificationCount = wrapper.find(".notification-count");
        expect(notificationCount.exists()).toBe(true);
        expect(notificationCount.text()).toContain("9+");
    });

    it("renders notifications icon", async () => {
        const wrapper = await mountComponent(true, "/");
        const notificationIcon = wrapper.find("#notifications-icon");
        expect(notificationIcon.exists()).toBe(true);
    });
});

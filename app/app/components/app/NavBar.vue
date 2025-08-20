<script setup lang="ts">
import { themeSwitcher } from "~~/public/js/theme-switcher";
import { onMounted } from "vue";
import AppNotificationList from "~~/app/components/app/notification/NotificationList.vue";
import { useNotificationStore } from "~~/stores/notifications";

onMounted(() => themeSwitcher.init());

const notificationStore = useNotificationStore();
const { loggedIn } = useUserSession();
const route = useRoute();
</script>

<template>
    <div class="navbar-container">
        <nav class="container">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <NuxtImg
                            src="/images/ft-logo-1-small.png"
                            alt="Fitness Tracker Logo"
                            width="48"
                            height="47"
                            :placeholder="[48, 47]"
                        />
                        <strong style="vertical-align: middle; margin-left: 10px; font-weight: bold;">Fitness Tracker</strong>
                    </NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <details
                        id="activities-dropdown"
                        class="dropdown"
                    >
                        <summary>
                            <NuxtLink to="/activities">Activities</NuxtLink>
                        </summary>
                        <ul dir="rtl">
                            <li>
                                <NuxtLink to="/activities/create">Create Activity</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/activities/upload">Upload Activity</NuxtLink>
                            </li>
                        </ul>
                    </details>
                </li>
                <li v-if="loggedIn">
                    <NuxtLink to="/challenges">Challenges</NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <NuxtLink to="/milestones">Milestones</NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <NuxtLink to="/trophies">Trophies</NuxtLink>
                </li>
            </ul>
            <ul>
                <li
                    v-if="!loggedIn && route.name !== 'login'"
                >
                    <NuxtLink to="/login">
                        <button class="secondary">Login</button>
                    </NuxtLink>
                </li>
                <li
                    v-if="!loggedIn && route.name === 'login'"
                >
                    <NuxtLink to="/sign-up">
                        <button class="secondary">Sign Up</button>
                    </NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <details
                        id="nav-account-dropdown"
                        class="dropdown"
                    >
                        <summary>
                            <Icon
                                name="ic:baseline-account-circle"
                                size="1.7rem"
                            />
                        </summary>
                        <ul dir="rtl">
                            <li>
                                <NuxtLink to="/my-profile">My Profile</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/logout">Logout</NuxtLink>
                            </li>
                        </ul>
                    </details>
                </li>
                <li v-if="loggedIn">
                    <details class="dropdown">
                        <summary>
                            <Icon
                                v-if="notificationStore.unseenNotificationCount > 0"
                                id="notifications-icon"
                                name="ic:baseline-notifications"
                                size="1.7rem"
                                style="color: red;"
                            />
                            <Icon
                                v-else
                                id="notifications-icon"
                                name="ic:baseline-notifications"
                                size="1.7rem"
                            />
                        </summary>
                        <ul
                            dir="rtl"
                            class="overflow-auto notification-list"
                        >
                            <li dir="ltr">
                                <AppNotificationList />
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <AppThemeToggle />
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.notification-list {
  max-height: 75vh;
  scrollbar-width: thin;
}
</style>

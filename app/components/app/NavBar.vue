<script setup lang="ts">
import { themeSwitcher } from "~/public/js/theme-switcher";
import { onMounted } from "vue";

onMounted(() => themeSwitcher.init());

const { loggedIn } = useUserSession();
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
                    <NuxtLink to="/activities">Activities</NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <NuxtLink to="/challenges">Challenges</NuxtLink>
                </li>
                <li v-if="loggedIn">
                    <NuxtLink to="/achievements">Achievements</NuxtLink>
                </li>
            </ul>
            <ul>
                <li
                    v-show="!loggedIn && $route.name !== 'login'"
                >
                    <NuxtLink to="/login"><button class="secondary">Login</button></NuxtLink>
                </li>
                <li
                    v-if="!loggedIn"
                    v-show="!loggedIn && $route.name === 'login'"
                >
                    <NuxtLink to="/sign-up"><button>Sign Up</button></NuxtLink>
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
                            <li><NuxtLink to="/my-profile">My Profile</NuxtLink></li>
                            <li><NuxtLink to="/logout">Logout</NuxtLink></li>
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

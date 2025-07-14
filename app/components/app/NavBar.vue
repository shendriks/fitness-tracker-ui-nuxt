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
                        <strong style="font-size: 1.9rem; vertical-align: middle; margin-left: 10px;">Fitness Tracker</strong>
                    </NuxtLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NuxtLink to="/activities">Activities</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#">Challenges</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#">Achievements</NuxtLink>
                </li>
            </ul>
            <ul>
                <li>
                    <AppThemeToggle />
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { themeSwitcher } from "~/public/js/theme-switcher";
import { onMounted } from "vue";

onMounted(() => themeSwitcher.init());
</script>

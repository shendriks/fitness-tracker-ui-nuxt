<template>
    <nav class="container">
        <ul>
            <li>
                <NuxtLink to="/">
                    <strong>Fitness Tracker</strong>
                </NuxtLink>
            </li>
        </ul>
        <ul>
            <li>
                <NuxtLink :to="{ name: 'activities' }">Activities</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

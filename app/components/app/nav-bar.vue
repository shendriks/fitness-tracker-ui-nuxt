<template>
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
                <NuxtLink :to="{ name: 'activities' }">Activities</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

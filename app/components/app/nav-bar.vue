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

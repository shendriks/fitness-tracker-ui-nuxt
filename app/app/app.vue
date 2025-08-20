<template>
    <NuxtLayout>
        <Notivue v-slot="item">
            <Notification
                :item="item"
                :theme="materialTheme"
            >
                <NotificationProgress :item="item" />
            </Notification>
        </Notivue>
        <NuxtPage />
    </NuxtLayout>
</template>

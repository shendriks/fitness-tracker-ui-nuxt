<script setup lang="ts">
import TrophyCardSkeleton from "~/components/app/trophy/TrophyCardSkeleton.vue";
import AppTrophyCard from "~/components/app/trophy/TrophyCard.vue";

const { data: trophies, error, status } = await useFetch("/api/trophies", {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <div class="centered-medium">
        <div class="grid">
            <div>
                <h1>
                    Trophies
                </h1>
            </div>
        </div>
        <div v-if="status === 'pending'">
            <div class="flex-container">
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
                <div class="flex-item flex-item-3">
                    <TrophyCardSkeleton />
                </div>
            </div>
        </div>
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article v-if="trophies?.length === 0">
                Yikes, no trophies yet.
            </article>
            <div
                v-else
                class="flex-container"
            >
                <div
                    v-for="trophy in trophies"
                    :key="trophy.id"
                    class="flex-item flex-item-3"
                >
                    <AppTrophyCard :trophy="trophy" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TrophyCardSkeleton from "~~/app/components/app/trophy/TrophyCardSkeleton.vue";
import AppTrophyCard from "~~/app/components/app/trophy/TrophyCard.vue";

const { data: trophies, error, status } = await myUseFetch("/api/trophies", {
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
        <h1>
            Trophies
        </h1>
        <div class="stacked">
            <Transition name="fade">
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
                <div v-else-if="error">
                    <article class="error">
                        {{ error.statusMessage }}
                    </article>
                </div>
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
            </Transition>
        </div>
    </div>
</template>

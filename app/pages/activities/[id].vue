<script setup lang="ts">
import type { FetchError } from "ofetch";

const route = useRoute();
const errorMessage = ref("");
const loading = ref(false);

const { data: activity, error, status } = await useFetch(`/api/activities/${route.params.id}`, {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});

function deleteActivity(id: string) {
    loading.value = true;
    errorMessage.value = "";
    $fetch(`/api/activities/${id}`, {
        method: "DELETE",
    }).then(async () => {
        await navigateTo("/activities");
        push.success({
            title: "Activity deleted",
            message: "Activity deleted successfully!",
        });
    }).catch(async (reason) => {
        const error = reason as FetchError;
        errorMessage.value = error.statusMessage || "An unknown error occurred";
        push.error({ title: "Activity deletion failed", message: errorMessage.value, duration: 5000 });
    }).finally(async () => {
        loading.value = false;
    });
}
</script>

<template>
    <div class="centered-medium">
        <dialog id="deletion-modal">
            <article>
                <header>
                    <button
                        aria-label="Close"
                        rel="prev"
                        data-target="deletion-modal"
                        onclick="toggleModal(event)"
                    />
                    <h3>Confirm Deletion</h3>
                </header>
                <p>
                    Are you sure you want to delete this activity? This action cannot be undone.
                </p>
                <footer>
                    <button
                        role="button"
                        class="secondary"
                        data-target="deletion-modal"
                        onclick="toggleModal(event)"
                    >
                        Cancel
                    </button>
                    <button
                        autofocus
                        data-target="deletion-modal"
                        onclick="toggleModal(event)"
                        @click="deleteActivity(activity?.id)"
                    >
                        Yes, delete Activity
                    </button>
                </footer>
            </article>
        </dialog>

        <div class="grid">
            <div>
                <h1>
                    Activity
                </h1>
            </div>
            <div style="text-align: right;">
                <NuxtLink
                    v-if="loading"
                    type="button"
                    aria-busy="true"
                    disabled
                >
                    Deleting...
                </NuxtLink>
                <NuxtLink
                    v-if="!loading && activity"
                    type="button"
                    data-target="deletion-modal"
                    onclick="toggleModal(event)"
                >
                    Delete Activity
                </NuxtLink>
            </div>
        </div>
        <AppActivityCardSkeleton v-if="status === 'pending'" />
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <AppActivityCard
            v-else
            :activity="activity"
            :with-link="false"
        />
    </div>
</template>

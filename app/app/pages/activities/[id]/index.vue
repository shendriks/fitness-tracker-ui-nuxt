<script setup lang="ts">
import type { FetchError } from "ofetch";
import AppActivityDetailsCard from "~~/app/components/app/activity/ActivityDetailsCard.vue";

const route = useRoute();
const errorMessage = ref("");
const deleting = ref(false);

const { data: activityDetails, error, status } = await useFetch(`/api/activities/${route.params.id}`, {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});

function deleteActivity(id: string) {
    if (!confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
        return;
    }

    deleting.value = true;
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
        deleting.value = false;
    });
}
</script>

<template>
    <div class="centered">
        <div class="grid">
            <div>
                <h1>
                    Activity Details
                </h1>
            </div>
            <div style="text-align: right;">
                <div
                    v-if="activityDetails"
                    role="group"
                    style="width: 250px;"
                >
                    <NuxtLink
                        type="button"
                        :to="`/activities/${activityDetails.id}/edit`"
                    >
                        Edit
                    </NuxtLink>
                    <button
                        :aria-busy="deleting"
                        :disabled="deleting"
                        @click="deleteActivity(activityDetails?.id)"
                    >
                        {{ deleting ? "Deleting ..." : "Delete" }}
                    </button>
                </div>
            </div>
        </div>
        <div class="stacked">
            <Transition name="fade">
                <div v-if="status === 'pending'">
                    <AppActivityCardSkeleton />
                </div>
                <div v-else-if="error">
                    <article class="error">
                        {{ error.statusMessage }}
                    </article>
                </div>
                <div v-else>
                    <AppActivityDetailsCard :activity-details="activityDetails" />
                </div>
            </Transition>
        </div>
    </div>
</template>

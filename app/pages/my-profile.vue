<script setup lang="ts">
const { data: userActivityCount, status, error } = await useAsyncData(
    async () => {
        try {
            const [user, activityCount] = await Promise.all([
                $fetch("/api/user/me"),
                $fetch("/api/activities/count"),
            ]);

            return {
                user,
                activityCount,
            };
        }
        catch (error) {
            if (error.statusCode === 401) {
                navigateTo("/login");
            }
            throw error;
        }
    },
    {
        lazy: true,
    },
);
</script>

<template>
    <div class="centered-form">
        <Suspense>
            <template #default>
                <AppMyProfileCard />
            <!--            <AppMyProfileCardSkeleton /> -->
            </template>
            <template #fallback>
                <AppMyProfileCardSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<template>
    <div class="centered-medium">
        <Suspense>
            <template #default>
                <AppMyProfileCard />
            </template>
            <template #fallback>
                <AppMyProfileCardSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<template>
    <div class="centered-form">
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

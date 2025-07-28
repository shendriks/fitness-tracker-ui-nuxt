<script lang="ts">
export default {
    name: "AppChallengeParticipationSkeleton",
};
</script>

<template>
    <article style="width: 150px;">
        <header style="text-align: center;">
            <AppSkeleton
                class="icon-70"
                style="display: inline-block;"
            />
        </header>
        <AppSkeleton class="w-125" />
        <AppSkeleton class="w-125" />
        <AppSkeleton class="w-125" />
        <AppSkeleton class="w-100" />
    </article>
</template>

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
        <div style="text-align: center;">
            <AppSkeleton class="w-50" />
            <progress
                value="0"
                max="100"
            />
            <AppSkeleton class="h-0-875 w-100" />
            <AppSkeleton class="h-0-875 w-75" />
        </div>
    </article>
</template>

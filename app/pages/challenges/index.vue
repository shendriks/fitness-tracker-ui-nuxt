<script setup lang="ts">
import AppChallengeList from "~/components/app/challenge/ChallengeList.vue";
import AppChallengeParticipationList from "~/components/app/challenge/ChallengeParticipationList.vue";
</script>

<template>
    <div class="centered-medium">
        <h1>
            Challenges
        </h1>
        <AppChallengeParticipationList />
        <AppChallengeList />
    </div>
</template>

<script setup lang="ts">
import AppChallengeList from "~~/app/components/app/challenge/ChallengeList.vue";
import AppChallengeParticipationList from "~~/app/components/app/challenge/ChallengeParticipationList.vue";
</script>

<template>
    <div class="centered-medium">
        <h1>
            Challenges
        </h1>
        <AppChallengeParticipationList />
        <hr>
        <AppChallengeList />
    </div>
</template>

<script setup lang="ts">
const { data: user, status, error } = await useFetch("/api/auth/me", {
    lazy: true,
    onResponseError({ response }) {
        if (response.status === 401) {
            navigateTo("/login");
        }
    },
});
</script>

<template>
    <div>
        <h1>My Profile</h1>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
        />
        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article>
                <header><h2>{{ user.name }}</h2></header>
                <b>Email:</b> {{ user.email }}<br>
                <b>Account Type:</b> {{ user.accountType }}<br>
                <footer>
                    <small>
                        Member since:
                        <NuxtTime
                            :datetime="user.createdAt"
                            year="numeric"
                            month="long"
                            day="numeric"
                        />
                    </small>
                </footer>
            </article>
        </div>
    </div>
</template>

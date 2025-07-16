<script setup lang="ts">
// const { data: user, status, error } = await useFetch("/api/auth/me", {
//     lazy: true,
//     onResponseError({ response }) {
//         if (response.status === 401) {
//             navigateTo("/login");
//         }
//     },
// });

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
    <div>
        <h1>My Profile</h1>
        <article
            v-if="status === 'pending'"
            aria-busy="true"
        >
            <header>
                <h2>
                    <Icon
                        name="ic:baseline-account-circle"
                        size="1em"
                    />
                </h2>
            </header>
        </article>

        <article
            v-else-if="error"
            class="error"
        >
            {{ error.statusMessage }}
        </article>
        <div v-else>
            <article>
                <header>
                    <h2>
                        <Icon
                            name="ic:baseline-account-circle"
                            size="1em"
                        />
                        {{ userActivityCount?.user.name }}
                    </h2>
                    <small>
                        Member since:
                        <NuxtTime
                            :datetime="userActivityCount?.user.createdAt || new Date('1970-01-01T00:00:00.000Z')"
                            year="numeric"
                            month="long"
                            day="numeric"
                        />
                    </small>
                </header>
                <b>Email:</b> {{ userActivityCount?.user.email }}<br>
                <b>Account Type:</b> {{ userActivityCount?.user.accountType }}<br>
                <footer>
                    {{ userActivityCount?.activityCount.count }} Activities
                </footer>
            </article>
        </div>
    </div>
</template>

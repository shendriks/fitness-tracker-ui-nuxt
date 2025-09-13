<script setup lang="ts">
const { data: userActivityCount } = await useAsyncData(
    async () => {
        try {
            const [user, activityCount] = await Promise.all([
                myFetch("/api/user/me"),
                myFetch("/api/activities/count"),
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
        lazy: false,
    },
);
</script>

<template>
    <div>
        <h1>My Profile</h1>
        <div>
            <article>
                <header>
                    <h2>
                        {{ userActivityCount?.user.name }}
                    </h2>
                    <small>
                        Member since:
                        <NuxtTime
                            :datetime="userActivityCount?.user.createdAt || new Date('1970-01-01T00:00:00.000Z')"
                            year="numeric"
                            month="numeric"
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

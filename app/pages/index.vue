<template>
    <div class="landing-page-div">
        <div
            style="padding-top: 30vh;"
            class="centered-medium"
        >
            <article class="welcome-card">
                <div>
                    <h1>Welcome to Fitness Tracker</h1>
                    <p>
                        If you have an account, please
                        <NuxtLink to="/login">login</NuxtLink>
                        &mdash;
                        or, you can
                        <NuxtLink to="/sign-up">sign up</NuxtLink>
                        to become part of our evergrowing community!
                    </p>
                </div>
            </article>
        </div>
    </div>
</template>

<style scoped>
.landing-page-div {
  height: 90vh;
  background-image: url(https://images.pexels.com/photos/60230/pexels-photo-60230.jpeg);
  background-size: cover;
  background-position: center;
  margin-top: -1.5rem;
}

.welcome-card {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

[data-theme="dark"] .welcome-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .welcome-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>

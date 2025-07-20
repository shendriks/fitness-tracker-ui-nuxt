<template>
    <div style="height: 90vh; background-image: url(https://images.pexels.com/photos/60230/pexels-photo-60230.jpeg); background-size: cover; background-position: center;">
        <div
            style="padding-top: 20vh;"
            class="centered-medium"
        >
            <article
                style="background: rgba(0, 0, 0, 0.5);
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                border: 1px solid rgba(0, 0, 0, 0.3);"
            >
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

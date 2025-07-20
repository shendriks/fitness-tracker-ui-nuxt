<template>
    <div class="skeleton" />
</template>

<style scoped>
.skeleton {
  height: 1rem;
  width: 250px;
  margin-bottom: 0.5rem;
  border-radius: 5px;

  &.mb-0-5 {
    margin-bottom: 0.5rem;
  }

  &.mb-0-75 {
    margin-bottom: 0.75rem;
  }

  &.mb-1 {
    margin-bottom: 1rem;
  }

  &.mb-1-25 {
    margin-bottom: 1.25rem;
  }

  &.mb-1-5 {
    margin-bottom: 1.5rem;
  }

  &.mb-1-75 {
    margin-bottom: 1.75rem;
  }

  &.mb-2 {
    margin-bottom: 2rem;
  }

  &.h-1 {
    height: 1rem;
  }

  &.h-1-25 {
    height: 1.25rem;
  }

  &.h-1-5 {
    height: 1.5rem;
  }

  &.h-1-75 {
    height: 1.75rem;
  }

  &.h-2 {
    height: 2rem;
  }

  &.w-50 {
    width: 50px;
  }

  &.w-100 {
    width: 100px;
  }

  &.w-150 {
    width: 150px;
  }

  &.w-200 {
    width: 200px;
  }

  &.w-250 {
    width: 200px;
  }

  &.w-300 {
    width: 3300px;
  }

  &.w-350 {
    width: 350px;
  }

  &.w-400 {
    width: 400px;
  }

  &.w-450 {
    width: 450px;
  }

  &.w-500 {
    width: 500px;
  }

  &.w-550 {
    width: 550px;
  }

  &.w-600 {
    width: 600px;
  }

  &.w-650 {
    width: 650px;
  }
}

[data-theme="dark"] .skeleton {
  animation: pulse-bg-dark 1s infinite alternate;
}

[data-theme="light"] .skeleton {
  animation: pulse-bg-light 1s infinite alternate;
}

@keyframes pulse-bg-dark {
  0% {
    background-color: #444;
  }
  100% {
    background-color: #333;
  }
}

@keyframes pulse-bg-light {
  0% {
    background-color: #eee;
  }
  100% {
    background-color: #ddd;
  }
}
</style>

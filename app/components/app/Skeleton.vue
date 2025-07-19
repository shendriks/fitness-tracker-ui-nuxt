<template>
    <div class="skeleton" />
</template>

<style scoped>
.skeleton {
  height: 1rem;
  width: 250px;
  animation: pulse-bg 1s infinite alternate;
  margin-bottom: 0.5rem;
  border-radius: 5px;
}

@keyframes pulse-bg {
  0% {
    background-color: #555;
  }
  100% {
    background-color: #333;
  }
}
</style>

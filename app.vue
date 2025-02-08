<script setup lang="ts">
</script>

<template>
  <div>
   <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
   </NuxtLayout>
  </div>
</template>

<style scoped>
.page-enter-active, .page-leave-active, .layout-enter-active, .layout-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.page-enter-from, .layout-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.page-leave-to, .layout-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

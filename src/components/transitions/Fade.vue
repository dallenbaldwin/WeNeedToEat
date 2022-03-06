<template>
  <!-- wrap the built-in Transition component -->
  <Transition name="fade" :duration="300">
    <slot></slot>
    <!-- pass down slot content -->
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

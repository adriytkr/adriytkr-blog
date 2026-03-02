<script setup lang="ts">
defineProps<{
  isVisible:boolean;
}>();
</script>

<template>
  <button
    class="fab"
    :class="{'is-visible':isVisible}"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.fab{
  aspect-ratio:1/1;
  background-color:rgb(var(--primary-color));
  padding:16px;
  border-radius:999px;
  border:none;
  color:#fff;
  position:fixed;
  right:32px;
  bottom:32px;
  opacity:0;
  transition:opacity 300ms;
}
.fab.is-visible{
  opacity:1;
}
</style>

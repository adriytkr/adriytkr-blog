<script setup lang="ts">
defineProps<{
  label:string;
  isSelected:boolean;
}>();
</script>

<template>
  <button
    class="flex items-center px-4 py-2 text-primary border border-primary rounded-full transition-colors duration-200 [&:not(.is-selected)]:hover:bg-primary/15"
    :class="{'bg-primary text-white is-selected':isSelected}"
  >
    <slot></slot>
    <span class="ml-2 inline-block">{{ label }}</span>
  </button>
</template>

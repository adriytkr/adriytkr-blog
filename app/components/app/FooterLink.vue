<template>
  <a
    v-bind="$attrs"
    target="_blank"
    class="text-muted hover:text-primary transition-colors duration-200"
  >
    <slot></slot>
  </a>
</template>

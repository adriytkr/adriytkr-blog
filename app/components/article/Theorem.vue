<template>
  <div class="theorem">
    <slot></slot>
  </div>
</template>

<style scoped>
.theorem{
  border:3px solid rgb(var(--divider-color));
  border-radius:4px;
  padding:12px;
  border-radius:4px;
  color:rgb(var(--text-color));
}
</style>

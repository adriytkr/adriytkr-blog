<script setup lang="ts">
defineProps<{
  progress:number;
}>();
</script>

<template>
  <div class="readProgressBar">
    <div class="readProgressBar-indicator"></div>
  </div>
</template>

<style scoped>
.readProgressBar{
  width:100%;
  height:10px;
  backdrop-filter:blur(8px);
  background-color:rgb(var(--background-color)/50%);
}
.readProgressBar-indicator{
  width:v-bind(progress*100+'%');
  height:100%;
  background-color:rgb(var(--primary-color));
}
</style>

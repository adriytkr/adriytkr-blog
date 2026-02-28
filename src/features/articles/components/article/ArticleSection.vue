<script setup lang="ts">
defineProps<{
  title:string;
  id:string;
}>();
</script>

<template>
  <section class="article-section" :id="id">
    <h2 class="article-section-title">
      <a class="article-section-link" :href="`#${id}`">
        {{ title }}
      </a>
    </h2>
    <slot></slot>
  </section>
</template>

<style scoped>
.article-section-link{
  position:relative;
}
.article-section-link::after{
  content:'#';
  position:absolute;
  right:105%;
  top:0;
  opacity:0;
  transition:opacity 100ms;
}
.article-section-link:hover::after{
  opacity:1;
}
</style>

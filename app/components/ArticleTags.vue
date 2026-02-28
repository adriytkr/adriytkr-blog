<script setup lang="ts">
defineProps<{
  slug:string;
  tags:string[];
}>();

const {t}=useI18n();
</script>

<template>
  <ul class="article-tags">
    <li class="article-tag" v-for="tag in tags">
      {{ t(`articles.articles.${slug}.tags.${tag}`) }}
    </li>
  </ul>
</template>

<style scoped>
.article-tags{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}
.article-tag{
  padding:6px 12px;
  border:1px solid rgb(var(--text-color));
  border-radius:999px;
  transition:border var(--theme-transition-duration);
}
</style>

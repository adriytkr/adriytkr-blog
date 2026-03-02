<script setup lang="ts">
const {t}=useI18n();

const {data:articles}=await useAsyncData(
  'articles',
  ()=>queryCollection('articles').all(),
);

useSeoMeta({
  title:t('articles-page.title'),
});
</script>

<template>
  <h1 class="articles-title">{{ t('articles-page.title') }}</h1>
  <p class="articles-description">{{ t('articles-page.description1') }}</p>
  <p class="articles-description">{{ t('articles-page.description2') }}</p>
  <ul class="articles-list">
    <ArticleItem
      v-for="article in articles"
      :key="article.slug"
      :article="article"
    />
  </ul>
</template>

<style scoped>
.articles-list{
  display:flex;
  flex-direction:column;
  row-gap:16px;
}
</style>

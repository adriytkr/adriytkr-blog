<script setup lang="ts">
const {t}=useI18n();
</script>

<template>
  <h1 class="articles-title">{{ t('articles.title') }}</h1>
  <p class="articles-description">{{ t('articles.description1') }}</p>
  <p class="articles-description">{{ t('articles.description2') }}</p>
  <ul class="articles-list">
    <ArticleItem
      v-for="article in articles"
      :key="article.slug"
      :article="article"
    />
  </ul>
</template>

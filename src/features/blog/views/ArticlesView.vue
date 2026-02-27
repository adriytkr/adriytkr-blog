<script setup lang="ts">
import TheHeader from '@/shared/components/header/TheHeader.vue';
import TheArticle from '../components/article/TheArticle.vue';

import {articles} from '@/shared/data/articles';

import {useI18n} from 'vue-i18n';

const {t}=useI18n();
</script>

<template>
  <TheHeader/>
  <main class="articles">
    <h1 class="articles-title">{{ t('articles.title') }}</h1>
    <p class="articles-description">{{ t('articles.description') }}</p>
    <ul class="articles-list">
      <TheArticle
        v-for="article in articles"
        :key="article.slug"
        :article="article"
      />
    </ul>
  </main>
</template>

<style scoped>
.articles{
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
}
</style>

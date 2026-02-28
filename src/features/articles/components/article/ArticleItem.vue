<script setup lang="ts">
import type {Article} from '@/shared/types/article';

import ArticleTags from './ArticleTags.vue';

import {useI18n} from 'vue-i18n';

defineProps<{
  article:Article;
}>();

const {t,locale}=useI18n();
</script>

<template>
  <li class="article">
    <RouterLink
      class="article-link"
      :to="`/${locale}/articles/${article.slug}`"
    >
      <h2 class="article-title">
          {{ t(`articles.articles.${article.slug}.title`) }}
      </h2>
      <p class="article-description">
        {{ t(`articles.articles.${article.slug}.description`) }}
      </p>
      <ArticleTags
        :slug="article.slug"
        :tags="article.tags"
      />
    </RouterLink>
  </li>
</template>
]
<style scoped>
.article-link{
  padding:32px 16px;
  border:1px solid rgb(var(--divider-color));
  border-radius:4px;
  display:block;
  transition:
    border 100ms,
    transform 100ms;
}
.article-link:hover{
  border:1px solid rgb(var(--primary-color));
  transform:scale(1.01) translateY(-2px);
}
.article-title{
  transition:color 100ms;
}
.article-link:hover .article-title{
  text-decoration:underline;
  color:rgb(var(--primary-color));
}
</style>

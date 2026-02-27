<script setup lang="ts">
import type {Article} from '@/shared/types/nav';

import {useI18n} from 'vue-i18n';
import ArticleTags from './ArticleTags.vue';

defineProps<{
  article:Article;
}>();

const {t,locale}=useI18n();
</script>

<template>
  <li class="article">
    <h2>
      <RouterLink
        class="article-link"
        :to="`/${locale}/articles/${article.slug}`"
      >
        {{ t(`articles.articles.${article.slug}.title`) }}
      </RouterLink>
    </h2>
    <p class="article-description">
      {{ t(`articles.articles.${article.slug}.description`) }}
    </p>
    <ArticleTags
      :slug="article.slug"
      :tags="article.tags"
    />
  </li>
</template>
]
<style scoped>
.article{
  border:1px solid #ccc;
  border-radius:4px;
}
</style>

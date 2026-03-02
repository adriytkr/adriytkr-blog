<script setup lang="ts">
defineProps<{
  article:ArticleMetadata;
}>();

const {t}=useI18n();
</script>

<template>
  <li class="article">
    <NuxtLinkLocale class="article-link" :to="`/articles/${article.slug}`">
      <h2 class="article-title">
        {{ t(`articles-page.articles.${article.slug}.title`) }}
      </h2>
      <p class="article-description">
        {{ t(`articles-page.articles.${article.slug}.description`) }}
      </p>
      <ArticleTags :tags-slugs="article.tagSlugs"/>
    </NuxtLinkLocale>
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

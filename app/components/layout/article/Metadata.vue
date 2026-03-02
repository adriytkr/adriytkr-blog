<script setup lang="ts">
defineProps<{
  slug:string;
  article:ArticleMetadata;
  shareArticle:()=>void;
}>();
</script>

<template>
  <div class="article-topMetadata">
    <time datetime="">{{ $d(new Date(article?.publishedDate||0),'long') }}</time>
  </div>
  <h1 class="article-title">{{ $t(`articles.${slug}.title`) }}</h1>
  <div class="article-readTime-wrapper">
    <LayoutArticleReadingTime :minutes="article?.readingTimeInMinutes||0" />
  </div>
  <ArticleTags :tagsSlugs="article?.tagSlugs||[]"/>
  <div class="article-actions">
    <button class="article-shareBtn" @click="shareArticle">
      <svg class="article-shareBtn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v13"/>
        <path d="m16 6-4-4-4 4"/>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      </svg>
    </button>
  </div>
  <!-- <div class="article-bottomMetadata">
    <time datetime="">{{ $d(new Date(article?.lastUpdatedDate||0),'long') }}</time>
  </div> -->
</template>

<style scoped>
.article-readTime-wrapper{
  margin-bottom:12px;
}

.article-actions{
  display:flex;
  justify-content:flex-end;
}
.article-shareBtn{
  padding:8px;
  background-color:transparent;
  border:none;
}
</style>

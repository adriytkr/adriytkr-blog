<script setup lang="ts">
const route=useRoute();
const {
  slug,
  tags,
  sections
}=route.meta.props as {
  slug:string;
  tags:string[];
  sections:string[];
};

const {progress,articleRef}=useArticle();
const {t}=useI18n();
</script>

<template>
  <div class="article-container">
    <div class="sticky">
      <LayoutHeader/>
      <LayoutArticleReadProgressBar :progress="progress"/>
    </div>
    <main class="article-main">
      <article class="article" ref="articleRef">
        <h1 class="article-title">
          {{ t(`articles.${slug}.title`) }}
          </h1>
        <ArticleTags :slug="slug" :tagsSlugs="tags"/>
        <LayoutArticleTableOfContents :slug="slug" :sections="sections"/>
        <slot></slot>
      </article>
    </main>
  </div>
</template>

<style>
.sticky{
  position:sticky;
  top:0;
  z-index:999;
}

.article-main{
  display:flex;
}
.article{
  width:100%;
  max-width:850px;
  padding:32px 16px;
  margin:0 auto;
}

.article section{
  margin:32px 0;
  scroll-margin-top:24px;
}
.article hr{
  width:100%;
  height:1px;
  background-color:#d4d4d4;
  border:none;
}

.article [data-table]{
  margin:16px auto;
}

.article [data-mathDisplay]{
  margin:16px;
}

.article [data-graph]{
  max-width:500px;
  margin:24px auto;
}
.article [data-split]{
  display:grid;
  gap:16px;
}

@media screen and (min-width:1000px){
  .article [data-split]{
    grid-template-columns:repeat(2,1fr);
  }
}
</style>

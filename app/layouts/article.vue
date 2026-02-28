<script setup lang="ts">
// defineProps<{
//   headings:Section[];
//   title:string;
//   slug:string;
//   tags:string[];
// }>();

const route=useRoute();
const {
  title='unknown',
  slug='unknown',
  tags=[],
  headings=[]
}=route.meta;

const {progress,articleRef}=useArticle();
</script>

<template>
  <div class="article-container">
    <div class="sticky">
      <LayoutHeader/>
      <ArticleReadProgressBar :progress="progress"/>
    </div>
    <main class="article-main">
      <article class="article" ref="articleRef">
        <h1 class="article-title">{{ title }}</h1>
        <ArticleTags :slug="slug" :tags="tags"/>
        <ArticleTableOfContents :headings="headings"/>
        <slot></slot>
      </article>
    </main>
  </div>
</template>

<style>
.sticky{
  position:sticky;
  top:0;
}

.article-main{
  display:flex;
}
.article{
  width:100%;
  max-width:700px;
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

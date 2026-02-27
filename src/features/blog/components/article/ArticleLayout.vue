<script setup lang="ts">
import type {Heading} from '@/shared/types/nav';

import TheHeader from '@/shared/components/header/TheHeader.vue';
import TableOfContents from './TableOfContents.vue';

import ArticleTags from './ArticleTags.vue';

defineProps<{
  headings:Heading[];
  title:string;
  slug:string;
  tags:string[];
}>();
</script>

<template>
  <div class="article-container">
    <TheHeader/>
    <main class="article-main">
      <article class="article">
        <h1 class="article-title">{{ title }}</h1>
        <ArticleTags :slug="slug" :tags="tags"/>
        <slot></slot>
      </article>
      <!-- <TableOfContents :headings="headings"/> -->
    </main>
  </div>
</template>

<style>
.article-main{
  display:flex;
}
.article{
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

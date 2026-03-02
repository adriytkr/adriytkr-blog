<script setup lang="ts">
const SLUG='gradient-descent';
const sections:string[]=[];

definePageMeta({
  layout:'article',
  props:{
    slug:SLUG,
    sections,
  },
});

useArticleMeta(SLUG);
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <h1>Hi</h1>
 </ArticleSection>
</template>

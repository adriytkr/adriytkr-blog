<script setup lang="ts">
const sections:string[]=[
  'introduction',
  'problem',
  'criteria',
  'compute',
  'infinitely-many-solutions',
  'why-square',
  'linear-algebra',
];

const tags=getArticleTagsBySlug('linear-regression');

definePageMeta({
  layout:'article',
  props:{
    slug:'linear-regression',
    tags,
    sections,
  },
});

const dataset:Point[]=[
  {x:1,y:1},
  {x:3,y:4},
];
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathLatexDisplay formula="x=10"/>
    <ArticleMathLatexInline formula="x=20"/>
    <ArticleWarningBox>
      <p>This is a test</p>
      <p>Super warning</p>
    </ArticleWarningBox>
    <ArticleTheorem>
      <p>This is the main theorem of this shit</p>
      <p>This is the main theorem of this shit</p>
      <p>This is the main theorem of this shit</p>
      <p>This is the main theorem of this shit</p>
    </ArticleTheorem>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathDatasetTable :dataset="dataset"/>
    <ArticleMathGraph
      :points="[
        [
          {x:3,y:9},
          {x:4,y:16},
        ],
      ]"
      :functions="[
        {
          domain:[-3,3],
          samples:300,
          func:x=>x**2,
        },
      ]"
      :domain="[-3,3]"
      :range="[-3,3]"
      draggable
    />
    <ArticleMathDatasetTable :dataset="dataset"/>
 </ArticleSection>
</template>

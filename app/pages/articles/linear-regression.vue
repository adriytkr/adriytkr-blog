<script setup lang="ts">
const SLUG='linear-regression';
const sections:string[]=[
  'introduction',
  'problem',
  'criteria',
  'compute',
  'infinitely-many-solutions',
  'why-square',
  'linear-algebra',
];

definePageMeta({
  layout:'article',
  props:{
    slug:SLUG,
    sections,
  },
});

useArticleMeta(SLUG);

const currentState=ref(0);
const states:GraphState[]=[
  {
    points:[],
    functions:[],
  },
  {
    points:[
      [{x:1,y:1},{x:2,y:4}],
    ],
    functions:[
      {
        domain:[0,2],
        samples:100,
        func:x=>x**2,
      },
    ],
  },
];
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraph
      :domain="[-3,3]"
      :range="[-3,3]"
      :points="states[currentState]?.points"
      :functions="states[currentState]?.functions"
      draggable
    />
    <button @click="currentState++">Next</button>
 </ArticleSection>
</template>

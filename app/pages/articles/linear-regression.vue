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

const graphRef=ref<GraphAPI|null>(null);
onMounted(()=>{
  if(!graphRef.value)return;
  graphRef.value.addAxes();
});

async function begin(){
  // create some objects
}

async function update(){
  // animate them
}
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraphEngine ref="graphRef"/>
    <button @click="begin">Begin</button>
    <button @click="update">Update</button>
 </ArticleSection>
</template>

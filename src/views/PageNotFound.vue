<script setup lang="ts">
import TheHeader from '@/shared/components/header/TheHeader.vue';

import usePageNotFound from '@/composables/usePageNotFound';

const {getRandomGif}=usePageNotFound();
</script>

<template>
  <TheHeader/>
  <main class="notFound">
    <h1 class="notFound-title">Page Not Found</h1>
    <p class="notFound-description">This page... doesn't exist</p>
    <img class="notFound-gif" :src="getRandomGif()" alt="">
    <p>
      Maybe you are interested in reading one of my articles?
      <RouterLink class="notFound-return" to="/en/articles">Articles</RouterLink>
    </p>
    <p>
      A random gif is shown if you refresh the page 👀👀
    </p>
  </main>
</template>

<style scoped>
.notFound{
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
}
.notFound-gif{
  width:100%;
  max-width:500px;
  margin:16px auto;
  display:block;
}
</style>

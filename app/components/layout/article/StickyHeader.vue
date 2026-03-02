<script setup lang="ts">
defineProps<{
  isVisible:boolean;
  readProgress:number;
}>();
</script>

<template>
  <div class="article-top" :class="{'is-hidden':!isVisible}">
    <div class="article-header-wrapper">
      <LayoutHeader/>
    </div>
    <div class="article-readProgressBar-wrapper">
      <LayoutArticleReadProgressBar :progress="readProgress"/>
    </div>
  </div>
</template>

<style scoped>
.article-top{
  position:sticky;
  top:0;
  z-index:999;
}
.article-header-wrapper{
  transition:transform 300ms;
}

.article-top.is-hidden .article-header-wrapper{
  transform:translateY(-100%);
}
.article-top.is-hidden .article-readProgressBar-wrapper{
  width:100%;
  position:absolute;
  top:0;
  left:0;
}
</style>

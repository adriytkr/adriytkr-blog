<script setup lang="ts">
const route=useRoute();
const {
  slug,
  sections,
}=route.meta.props as {
  slug:string;
  sections:string[];
  readingTimeInMinutes:number;
};

const {data:article}=await useAsyncData(
  slug,
  ()=>queryCollection('articles')
    .where('slug','=',slug)
    .first(),
);

const {
  readProgress,
  articleRef,
  isVisible,
  showScrollTop,
  scrollToTop,
  shareArticle,
}=useArticleLayout();
</script>

<template>
  <div class="article-wrapper">
    <LayoutArticleStickyHeader :read-progress="readProgress" :is-visible="isVisible"/>
    <main class="article-main">
      <aside class="article-sidebarToc-wrapper" :class="{'is-hidden':!isVisible}">
        <LayoutArticleTableOfContents :slug="slug" :sections="sections"/>
      </aside>
      <article class="article" ref="articleRef">
        <LayoutArticleMetadata
          :slug="slug"
          :article="article!"
          :share-article="shareArticle"
        />
        <div class="article-mobileToc-wrapper">
          <LayoutArticleTableOfContents :slug="slug" :sections="sections"/>
        </div>
        <slot></slot>
      </article>
      <div class="article-sidebarRight"></div>
    </main>
    <UiFloatingActionButton @click="scrollToTop" :is-visible="showScrollTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--text-color))" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </UiFloatingActionButton>
    <LayoutFooter/>
  </div>
</template>

<style scoped>
.article-wrapper{
  min-height:100vh;
  display:flex;
  flex-direction:column;
}
.article-main{
  display:grid;
  flex-grow:1;
}
.article{
  width:100%;
  max-width:700px;
  padding:32px 16px;
  margin:0 auto;
}

.article-sidebarToc-wrapper{
  height:100vh;
  padding:32px 16px;
  display:none;
  position:sticky;
  top:0;
  transition:opacity 300ms;
}
.article-sidebarToc-wrapper.is-hidden{
  opacity:0;
}
.article-sidebarToc-wrapper:hover{
  opacity:1;
}

@media screen and (min-width:1200px){
  .article-mobileToc-wrapper{
    display:none;
  }
  .article-sidebarToc-wrapper{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .article-main{
    grid-template-columns:1fr 700px 1fr;
  }
}
</style>

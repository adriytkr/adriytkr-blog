<script setup lang="ts">
const route=useRoute();
const {
  slug,
  tags,
  sections,
}=route.meta.props as {
  slug:string;
  tags:string[];
  sections:string[];
};

const {
  readProgress,
  articleRef,
  isVisible,
  showScrollTop,
  scrollToTop,
  shareArticle,
}=useArticle();
const {t}=useI18n();
</script>

<template>
  <div class="article-wrapper">
    <div class="article-top" :class="{'is-hidden':!isVisible}">
      <div class="article-header-wrapper">
        <LayoutHeader/>
      </div>
      <div class="article-readProgressBar-wrapper">
        <LayoutArticleReadProgressBar :progress="readProgress"/>
      </div>
    </div>
    <main class="article-main">
      <aside class="article-sidebarToc-wrapper" :class="{'is-hidden':!isVisible}">
        <LayoutArticleTableOfContents :slug="slug" :sections="sections"/>
      </aside>
      <article class="article" ref="articleRef">
        <div class="article-topMetadata">
          <time datetime="">PUBLISHED MARCH 1, 2026</time>
        </div>
        <h1 class="article-title">{{ t(`articles.${slug}.title`) }}</h1>
        <LayoutArticleReadingTime :minutes="80" />
        <ArticleTags :slug="slug" :tagsSlugs="tags"/>
        <div class="article-actions">
          <button class="article-shareBtn" @click="shareArticle">
            <svg class="article-shareBtn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v13"/>
              <path d="m16 6-4-4-4 4"/>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            </svg>
          </button>
        </div>
        <div class="article-bottomMetadata">
          <time datetime="">PUBLISHED MARCH 1, 2026</time>
        </div>
        <div class="article-mobileToc-wrapper">
          <LayoutArticleTableOfContents :slug="slug" :sections="sections"/>
        </div>
        <slot></slot>
      </article>
      <div class="article-sidebarRight"></div>
    </main>
    <button
      class="article-scrollTopBtn"
      :class="{'is-visible':showScrollTop}"
      @click="scrollToTop"
    >
      <svg class="article-scrollTopBtn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
    <LayoutFooter/>
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

.article-scrollTopBtn{
  aspect-ratio:1/1;
  background-color:rgb(var(--primary-color));
  padding:16px;
  border-radius:999px;
  border:none;
  color:#fff;
  position:fixed;
  right:32px;
  bottom:32px;
  opacity:0;
  transition:opacity 300ms;
}
.article-scrollTopBtn.is-visible{
  opacity:1;
}
.article-scrollTopBtn-icon{
  display:block;
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

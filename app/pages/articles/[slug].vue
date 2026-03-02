<script setup lang="ts">
const {t}=useI18n();
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">{{ t('nonexistent-article-error-page.title') }}</h1>
      <p class="error-description">{{ t('nonexistent-article-error-page.description') }}</p>
      <NuxtLinkLocale
        class="error-goBackLink"
        to="/articles"
      >
        {{ t('nonexistent-article-error-page.callToActionText') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style scoped>
.error-container{
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.error-goBackLink{
  text-decoration:underline;
}
.error-goBackLink:hover{
  color:rgb(var(--primary-color));
}
</style>


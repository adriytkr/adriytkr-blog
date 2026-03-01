<script setup lang="ts">
const {t}=useI18n();
</script>

<template>
  <NuxtLayout name="default">
    <div class="error-container">
      <div class="error-content">
        <h1 class="error-title">{{ t('error-page.title') }}</h1>
        <p class="error-description">{{ t('error-page.description') }}</p>
        <NuxtLinkLocale
          class="error-goBackLink"
          to="/articles"
        >
          {{ t('error-page.goBackText') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </NuxtLayout>
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

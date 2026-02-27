<script setup lang="ts">
import useLanguage from '@/shared/composables/useLanguage';
import LanguageSelectionMenu from './LanguageSelectionMenu.vue';

const {
  isLanguageSelectionOpen,
  toggleLanguageSelection,
  LANGUAGES,
  selectedLanguage,
  selectLanguage,
}=useLanguage();
</script>

<template>
  <div class="languageSelection">
    <button @click="toggleLanguageSelection" class="languageSelection-btn">
      <svg class="languageSelection-btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    </button>
    <Transition name="fade">
      <LanguageSelectionMenu
        :languages="LANGUAGES"
        :selected-language="selectedLanguage"
        @select-language="selectLanguage"
        v-if="isLanguageSelectionOpen"
      />
    </Transition>
  </div>
</template>

<style scoped>
.languageSelection{
  position:relative;
}

.languageSelection-btn{
  background-color:transparent;
  border:none;
}
.languageSelection-btn-icon{
  stroke:var(--text-color);
}

.fade-enter-active,
.fade-leave-active{
  transition:opacity 125ms ease;
}
.fade-enter-from,
.fade-leave-to{
  opacity:0;
}
</style>

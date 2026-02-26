<script setup lang="ts">
import useLanguage from '@/composables/useLanguage';

const {
  languages,
  selectedLanguage,
  isLanguageSelectionOpen,
  toggleLanguageSelection
}=useLanguage();
</script>

<template>
  <div class="language-selection">
    <button @click="toggleLanguageSelection" class="language-toggle">
      <svg class="language-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    </button>
    <Transition name="fade">
      <ul class="languages" v-if="isLanguageSelectionOpen">
        <li
          v-for="language in languages"
          :key="language.language"
          :class="{'active':language.language===selectedLanguage.language}"
        >
          <RouterLink :to="{query:{lang:language.language}}">
            {{ language.label }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.language-selection {
  position:relative;
}

.language-toggle{
  background-color:transparent;
  border:none;
}
.language-toggle-icon{
  stroke:var(--text-color);
}

.languages{
  min-width:125px;
  background-color:var(--background-color);
  padding:10px;
  border:1px solid #ccc;
  border-radius:4px;
  position:absolute;
  top:100%;
  right:0;
}
.languages{
  list-style:none;
  display:flex;
  flex-direction:column;
  row-gap:6px;
}
.languages li a{
  color:var(--text-color);
}
.languages li.active a{
  font-weight:bold;
}

.fade-enter-active,
.fade-leave-active {
  transition:opacity 125ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity:0;
}
</style>

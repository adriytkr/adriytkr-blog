<script setup lang="ts">
import {useDarkMode} from '@/shared/composables/useDarkMode';

const darkMode=useDarkMode();
</script>

<template>
  <button
    @click="darkMode.toggleDarkMode"
    class="toggleDarkMode-btn"
    :class="{'darkModeActive':darkMode.isDarkMode}"
  >
    <div class="toggleDarkMode-btn-indicator-wrapper">
      <div class="toggleDarkMode-btn-indicator"></div>
      <div class="toggleDarkMode-btn-icons">
        <!-- Moon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-moon">
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
        </svg>
        <!-- Sun -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      </div>
    </div>
  </button>
</template>

<style scoped>
.toggleDarkMode-btn{
  width:80px;
  height:40px;
  padding:6px;
  background-color:#fff;
  border-radius:999px;
  border:2px solid #000;
  transition:
    background-color 300ms ease,
    border-color 300ms ease;
}

.toggleDarkMode-btn-indicator-wrapper{
  width:100%;
  height:100%;
  position:relative;
}
.toggleDarkMode-btn-indicator{
  height:100%;
  aspect-ratio:1/1;
  background-color:#000;
  border-radius:999px;
  position:absolute;
  top:0;
  left:0;
  transition:
    transform 300ms ease,
    background-color 300ms ease;
}

.toggleDarkMode-btn-icons{
  display:flex;
  justify-content:space-between;
}
.toggleDarkMode-btn-icons .icon-moon{
  color:#fff;
}

.toggleDarkMode-btn.darkModeActive{
  background-color:#000;
  border:2px solid #fff;
}
.toggleDarkMode-btn.darkModeActive .toggleDarkMode-btn-indicator{
  background-color:#fff;
  transform:translateX(40px);
}
</style>

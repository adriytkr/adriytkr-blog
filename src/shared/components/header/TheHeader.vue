<script setup lang="ts">
import type {NavItem} from '../../types/header';

import LanguageSelectionButton from './LanguageSelectionButton.vue';
import ToggleDarkModeButton from './ToggleDarkModeButton.vue';

import {useI18n} from 'vue-i18n';

const {t,locale} = useI18n();

const navItems:NavItem[]=[
  {name:'about'},
  {name:'articles'},
];
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <ul class="header-nav-list">
        <li
          class="header-nav-item"
          v-for="item in navItems"
          :key="item.name"
        >
          <RouterLink
            class="header-nav-link"
            :to="`/${locale}/${item.name}`"
          >
            {{ t(`nav.${item.name}`) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="header-settings">
      <ToggleDarkModeButton/>
      <LanguageSelectionButton/>
    </div>
  </header>
</template>

<style scoped>
.header{
  max-width:850px;
  padding:16px;
  background-color:rgb(var(--background-color)/50%);
  backdrop-filter:blur(8px);
  margin:0 auto;
  display:flex;
  justify-content:space-between;
  position:relative;
  z-index:999;
}

.header-nav{
  display:flex;
  align-items:center;
}
.header-nav-list{
  display:flex;
  column-gap:16px;
}
.header-nav-link{
  padding:6px;
  font-weight:500;
  color:rgb(var(--text-color));
  transition:color 100ms;
}
.header-nav-link:hover{
  text-decoration:underline;
  color:rgb(var(--primary-color));
}
.header-nav-link.router-link-exact-active{
  font-weight:800;
}

.header-settings{
  display:flex;
  align-items:center;
  column-gap:16px;
}
</style>

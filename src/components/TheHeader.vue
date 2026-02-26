<script setup lang="ts">
import LanguageSelection from './LanguageSelection.vue';
import ToggleDarkMode from './ToggleDarkMode.vue';
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/articles">Articles</RouterLink></li>
      </ul>
    </nav>
    <div class="settings">
      <ToggleDarkMode/>
      <LanguageSelection/>
    </div>
  </header>
</template>

<style scoped>
header{
  max-width:850px;
  padding:16px;
  margin:0 auto;
  display:flex;
  justify-content:space-between;
}
nav{
  display:flex;
  align-items:center;
}
ul{
  list-style:none;
  display:flex;
  gap:16px;
}
ul li a{
  padding:6px;
  font-weight:600;
  color:var(--text-color);
}
.settings{
  display:flex;
  align-items:center;
  column-gap:16px;
}
</style>

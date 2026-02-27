<script setup lang="ts">
import type {Language} from '@/shared/types/language';

defineProps<{
  languages:Language[];
  selectedLanguage:Language;
}>();

defineEmits<{
  (e:'select-language',language:Language):void;
}>();
</script>

<template>
  <ul class="languages">
    <li
      v-for="language in languages"
      :key="language.code"
      class="languages-item"
      :class="{'is-active':language.code===selectedLanguage.code}"
    >
      <button
        class="languages-item-btn"
        @click="$emit('select-language',language)"
      >
        {{ language.name }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.languages{
  min-width:125px;
  background-color:var(--background-color);
  padding:10px;
  border:1px solid #ccc;
  border-radius:4px;
  position:absolute;
  top:100%;
  right:0;
  display:flex;
  flex-direction:column;
  row-gap:6px;
}
.languages-item-btn{
  background-color:transparent;
  border:none;
  outline:none;
  color:var(--text-color);
}
.languages-item.is-active .languages-item-btn{
  font-weight:bold;
}
</style>

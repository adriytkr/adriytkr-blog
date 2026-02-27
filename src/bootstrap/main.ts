import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';
import {createPinia} from 'pinia';
import { i18n } from '@/i18n';

import { useDarkMode } from '@/shared/composables/useDarkMode';

import '@/shared/styles/theme.css';
import '@/shared/styles/main.css';
import 'katex/dist/katex.min.css';

const app=createApp(App);
const pinia=createPinia();

app
  .use(router)
  .use(i18n)
  .use(pinia)
  .mount('#app')

const darkMode=useDarkMode();
darkMode.init();

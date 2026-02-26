import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n/';

import './assets/styles/theme.css';
import './assets/styles/main.css';
import 'katex/dist/katex.min.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');

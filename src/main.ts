import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/reset.css';
import 'katex/dist/katex.min.css';

const app = createApp(App);

app.use(router);
app.mount('#app');

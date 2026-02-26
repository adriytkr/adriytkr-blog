import { createRouter, createWebHistory } from 'vue-router';

import AboutView from '@/views/AboutView.vue';
import ArticlesView from '@/views/ArticlesView.vue';

import LinearRegressionPost from '@/posts/LinearRegressionPost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'about',
    },
    {
      name:'about',
      path:'/about',
      component:AboutView,
    },
    {
      path:'/articles',
      children:[
        {
          name:'articles',
          path:'',
          component:ArticlesView,
        },
        {
          name:'linear regression',
          path:'linear-regression',
          component:LinearRegressionPost,
        },
      ],
    },
  ],
});

export default router;

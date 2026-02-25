import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

import LinearRegressionPost from '@/posts/LinearRegressionPost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'home',
      path:'/',
      component:HomeView,
    },
    {
      path:'/posts',
      children:[
        {
          name:'linear regression',
          path:'linear-regression',
          component:LinearRegressionPost,
        },
      ],
    }
  ],
});

export default router;

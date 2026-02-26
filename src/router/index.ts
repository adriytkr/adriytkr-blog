import { createRouter, createWebHistory } from 'vue-router';
import {i18n} from '@/i18n/';

import AboutView from '@/views/AboutView.vue';
import ArticlesView from '@/views/ArticlesView.vue';

import LinearRegressionPost from '@/posts/LinearRegressionPost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:{
        path:'/en/about',
      },
    },
    {
      path:'/:lang(en|pt)',
      children:[
        {
          name:'about',
          path:'about',
          component:AboutView,
        },
        {
          path:'articles',
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
    }
  ],
});

router.beforeEach((to,from)=>{
  const lang=to.params.lang as string;

  if(lang!=='en'&&lang!=='pt')
    return {path:'/en/about'};

  i18n.global.locale=lang;
});

router.afterEach((to,from)=>{
  const lang=to.params.lang as string;

  document.documentElement.lang=lang;
});

export default router;

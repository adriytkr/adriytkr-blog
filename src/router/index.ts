import type {LanguageCode} from '@/shared/types/language';

import {DEFAULT_LANGUAGE} from '@/shared/constants/languages';
import {DEFAULT_PATH,LANG_REGEX} from './constants';
import {isLanguageValid} from './utils';

import { createRouter, createWebHistory } from 'vue-router';
import {i18n} from '@/i18n/';

import AboutView from '@/features/about/views/AboutView.vue';

import ArticlesView from '@/features/articles/views/ArticlesView.vue';
import LinearRegressionArticle from '@/features/articles/articles/LinearRegressionArticle.vue';

import NotFoundView from '@/features/notFound/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:{path:DEFAULT_PATH},
    },
    {
      path:`/:lang(${LANG_REGEX})`,
      children:[
        {
          name:'about',
          path:'about',
          component:AboutView
        },
        {
          path:'articles',
          children:[
            {
              name:'list-of-articles',
              path:'',
              component:ArticlesView,
            },
            {
              name:'linear-progression-article',
              path:'linear-regression',
              component:LinearRegressionArticle,
            },
          ],
        },
      ],
    },
    {
      name:'Not Found',
      path:'/:pathMatch(.*)*',
      component:NotFoundView,
    },
  ],
});

router.beforeEach((to)=>{
  const lang=to.params.lang as string;

  if(!lang)return;

  if(!isLanguageValid(lang))return {path:DEFAULT_PATH};

  i18n.global.locale=lang as LanguageCode;
  document.documentElement.lang=lang;
});

export default router;

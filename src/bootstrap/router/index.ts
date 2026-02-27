import type {LanguageCode} from '@/shared/types/language';

import {DEFAULT_PATH,LANG_REGEX} from './constants';
import {isLanguageValid} from '@/shared/utils/router';

import { createRouter, createWebHistory } from 'vue-router';
import {i18n} from '@/i18n/';

import {normalRoutes} from './normalRoutes';
import {blogRoutes} from './blogRoutes';
import PageNotFound from '@/views/PageNotFound.vue';

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
        ...normalRoutes,
        {
          path:'articles',
          children:blogRoutes,
        },
      ],
    },
    {
      name:'Not Found',
      path:'/:pathMatch(.*)*',
      component:PageNotFound,
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

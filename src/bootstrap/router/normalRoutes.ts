import type{RouteRecordRaw} from 'vue-router';

import AboutView from '@/features/blog/views/AboutView.vue';
import ArticlesView from '@/features/blog/views/ArticlesView.vue';

export const normalRoutes:RouteRecordRaw[]=[
  {
    name:'about',
    path:'about',
    component:AboutView,
  },
  {
    name:'articles',
    path:'articles',
    component:ArticlesView,
  },
];

import type{RouteRecordRaw} from 'vue-router';

import LinearRegressionPost from '@/features/blog/articles/linear-regression/LinearRegressionPost.vue';

export const blogRoutes:RouteRecordRaw[]=[
  {
    name:'linear regression',
    path:'linear-regression',
    component:LinearRegressionPost,
  },
];

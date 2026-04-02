import { defineCollection,z } from '@nuxt/content';

import type {CustomLocale} from '../../types/i18n';
import type {RecommendationStatus} from '../../types/recommendation';

const status:RecommendationStatus[]=['reviewed','pending'];

export const recommendationSchema=z.object({
  title:z.string(),
  description:z.string(),
  longDescription:z.string(),
  thumbnail:z.string().optional(),
  author:z.string(),
  categories:z.array(z.string()).default([]),
  status:z.enum(status).default('pending'),
});

export const createRecommendationCollection=(locale:CustomLocale)=>
  defineCollection({
    type:'page',
    source:`${locale}/recommendations/**/*.md`,
    schema:recommendationSchema,
  });

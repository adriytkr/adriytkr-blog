import { defineContentConfig } from '@nuxt/content'

import type {CustomLocale} from './app/types/i18n';

import {normalizeCollectionName} from './app/utils/content';

import {createProjectCollection} from './app/config/content/project';
import {createRecommendationCollection} from './app/config/content/recommendation';

const makeCollection=(locale:CustomLocale)=>({
  [normalizeCollectionName('projects',locale)]:createProjectCollection(locale),
  [normalizeCollectionName('recommendations',locale)]:createRecommendationCollection(locale),
});

export default defineContentConfig({
  collections: {
    ...makeCollection('en'),
    ...makeCollection('pt-br'),
    ...makeCollection('de-de'),
  }
})

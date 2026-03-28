import type {CustomLocale} from '../types/i18n';
import type { CustomCollection } from '../types/content';

export const normalizeCollectionName=(type:CustomCollection,locale:CustomLocale)=>
  `${type}_${locale.replace('-','_')}`;

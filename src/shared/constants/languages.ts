import type {Language} from '@/shared/types/language';

export const DEFAULT_LANGUAGE:Language={
  name:'English',
  code:'en',
};

export const LANGUAGES:Language[]=[
  DEFAULT_LANGUAGE,
  {name:'Português',code:'pt'},
];

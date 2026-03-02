import type {LanguageCode} from '../types/locale';

export const getLocaleFiles=(languageCode:LanguageCode):string[]=>{
  const rawCommonLocales=[
    'nav.json',
    'about-page.json',
    'articles-page.json',
    'error-page.json',
    'nonexistent-article-error-page.json',
    'tags.json',
    'articles/index.json',
  ];
  const rawArticlesLocales=[
    'linear-regression.json',
    'gradient-descent.json',
  ];

  const localeFiles=[
    ...rawCommonLocales.map(locale=>`${languageCode}/${locale}`),
    ...rawArticlesLocales.map(locale=>`${languageCode}/articles/${locale}`)
  ];

  return localeFiles;
};

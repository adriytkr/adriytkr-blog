import type {LanguageCode} from '../types/locale';

export const getLocaleFiles=(languageCode:LanguageCode):string[]=>{
  const rawCommonLocales=[
    'nav.json',
    'about-page.json',
    'articles-page.json',
    'tags.json',
  ];
  const rawArticlesLocales=['linear-regression.json'];

  const localeFiles=[
    ...rawCommonLocales.map(locale=>`${languageCode}/${locale}`),
    ...rawArticlesLocales.map(locale=>`${languageCode}/articles/${locale}`)
  ];

  return localeFiles;
};

export const DEFAULT_LANGUAGE:Language={
  name:'English',
  code:'en',
};

export const LANGUAGES:Language[]=[
  DEFAULT_LANGUAGE,
  {name:'Português',code:'pt'},
];

export const articles:Article[]=[
  {
    slug:'linear-regression',
    tags:['machine-learning','regression','statistics','data-science'],
  },
];

export const DARK_STORAGE_KEY='DARK_STORAGE_KEY';

export function getTheme(element:HTMLElement){
  const styles=getComputedStyle(element);
  return{
    bgColor:styles.getPropertyValue('--background-color').trim(),
    textColor:styles.getPropertyValue('--text-color').trim(),
  };
}


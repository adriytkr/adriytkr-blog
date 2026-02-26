import type {LanguageWrapper} from '@/types/language';

import {computed,ref} from 'vue';
import {useRoute} from 'vue-router';

export default function(){
  const isLanguageSelectionOpen=ref(false);

  const toggleLanguageSelection=()=>
    isLanguageSelectionOpen.value=!isLanguageSelectionOpen.value;

  const DEFAULT_LANGUAGE:LanguageWrapper={
    label:'English',
    language:'en'
  };

  const languages:LanguageWrapper[]=[
    DEFAULT_LANGUAGE,
    {label:'Português',language:'pt'},
  ];

  const route=useRoute();

  const selectedLanguage=computed<LanguageWrapper>(()=>
    languages.find((l)=>l.language===route.query.lang)??DEFAULT_LANGUAGE
  );

  // fix later
  // const updateLanguage=(lang:string)=>{
  //   const root=document.documentElement;
  //   root.lang=lang;
  // };

  return{
    languages,
    selectedLanguage,
    isLanguageSelectionOpen,
    toggleLanguageSelection,
  };
}

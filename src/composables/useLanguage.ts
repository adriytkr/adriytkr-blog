import type {LanguageCode,Language} from '@/types/language';

import {computed,ref} from 'vue';
import {useRoute,type RouteLocationRaw} from 'vue-router';
import {useI18n} from 'vue-i18n';

export default function(){
  const isLanguageSelectionOpen=ref(false);
  const toggleLanguageSelection=()=>
    isLanguageSelectionOpen.value=!isLanguageSelectionOpen.value;

  const DEFAULT_LANGUAGE:Language={
    name:'English',
    code:'en'
  };

  const languages:Language[]=[
    DEFAULT_LANGUAGE,
    {name:'Português',code:'pt'},
  ];

  const {locale}=useI18n();
  const selectedLanguage=computed<Language>(()=>
    languages.find(lang=>lang.code===locale.value)||DEFAULT_LANGUAGE
  );

  const route=useRoute();
  const changeLanguage=(language:LanguageCode):RouteLocationRaw=>{
    return{
      params:{
        ...route.params,
        lang:language,
      },
    };
  };

  return{
    isLanguageSelectionOpen,
    toggleLanguageSelection,
    languages,
    selectedLanguage,
    changeLanguage,
  };
}

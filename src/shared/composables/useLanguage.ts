import type {Language} from '@/shared/types/language';

import {DEFAULT_LANGUAGE,LANGUAGES} from '@/shared/constants/languages';

import {computed,ref} from 'vue';
import {
  useRoute,
  useRouter,
  type RouteLocationRaw,
} from 'vue-router';
import {useI18n} from 'vue-i18n';

export default function(){
  const isLanguageSelectionOpen=ref(false);
  const toggleLanguageSelection=()=>
    isLanguageSelectionOpen.value=!isLanguageSelectionOpen.value;

  const {locale}=useI18n();
  const selectedLanguage=computed<Language>(()=>
    LANGUAGES.find(lang=>lang.code===locale.value)||DEFAULT_LANGUAGE
  );

  const route=useRoute();
  const router=useRouter();
  const selectLanguage=(language:Language)=>{
    const newRoute:RouteLocationRaw={
      params:{
        ...route.params,
        lang:language.code,
      },
    };
    router.push(newRoute);
  };

  return{
    isLanguageSelectionOpen,
    toggleLanguageSelection,
    LANGUAGES,
    selectedLanguage,
    selectLanguage,
  };
}

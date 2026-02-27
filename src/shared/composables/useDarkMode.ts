import {defineStore} from 'pinia';
import {useLocalStorage} from '@vueuse/core';

export const useDarkMode=defineStore('darkMode',()=>{
  const isDarkMode=useLocalStorage<boolean>('darkMode',false);

  const toggleDarkMode=()=>{
    isDarkMode.value=!isDarkMode.value;
    updateClass();
  }

  const updateClass=()=>{
    const root=document.documentElement;
    isDarkMode.value
      ?root.classList.add('dark')
      :root.classList.remove('dark');
  };

  const init=()=>{
    updateClass();
  };

  return{
    isDarkMode,
    toggleDarkMode,
    init,
  };
});

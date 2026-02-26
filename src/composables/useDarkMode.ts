import {ref} from 'vue';

const savedDarkMode=localStorage.getItem('darkMode');
const isDarkMode=ref(savedDarkMode==='true');

const applyClass=()=>{
  const root=document.documentElement;
  isDarkMode.value
    ?root.classList.add('dark')
    :root.classList.remove('dark');
};

applyClass();

export default function(){
  const toggleDarkMode=()=>{
    isDarkMode.value=!isDarkMode.value;
    localStorage.setItem('darkMode',isDarkMode.value.toString());
    applyClass();
  }

  return{
    isDarkMode,
    toggleDarkMode,
  };
}

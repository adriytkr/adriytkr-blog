import {onBeforeUnmount,onMounted,ref} from 'vue';

export default function(){
  const progress=ref(0);
  const articleRef=ref<HTMLElement|null>(null);

  const updateProgress=()=>{
    if(!articleRef.value)return;

    const scrolledInsideArticle=window.scrollY-articleRef.value.offsetTop;
    if(scrolledInsideArticle<0){
      progress.value=0;
      return;
    }

    const scrollableDistance=articleRef.value.scrollHeight-window.innerHeight;
    const rawProgress=scrolledInsideArticle/scrollableDistance;
    progress.value=rawProgress;
  };

  onMounted(()=>{
    updateProgress();
    window.addEventListener('scroll',updateProgress)
  });
  onBeforeUnmount(()=>window.removeEventListener('scroll',updateProgress));

  return{
    progress,
    articleRef,
  };
}

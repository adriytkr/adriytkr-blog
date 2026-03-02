export default function(){
  const readProgress=ref(0);
  const articleRef=ref<HTMLElement|null>(null);

  const updateReadProgress=()=>{
    if(!articleRef.value)return;

    const scrolledInsideArticle=window.scrollY-articleRef.value.offsetTop;
    if(scrolledInsideArticle<0){
      readProgress.value=0;
      return;
    }

    const scrollableDistance=articleRef.value.scrollHeight-window.innerHeight;
    const rawProgress=scrolledInsideArticle/scrollableDistance;
    readProgress.value=rawProgress;
  };

  let lastScrollPosition=0;
  const isVisible=ref(true);
  const showScrollTop=ref(false);
  const handleScroll=()=>{
    const currentScrollPosition=window.scrollY;

    showScrollTop.value=currentScrollPosition>400;

    if(Math.abs(currentScrollPosition-lastScrollPosition)<20) return;

    isVisible.value=currentScrollPosition<lastScrollPosition||currentScrollPosition<50;
    lastScrollPosition=currentScrollPosition;
  };

  const scrollToTop=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth',
    });
  };

  const shareArticle=async()=>{
    await navigator.share({
      title:'hi',
      url:window.location.href,
    });
  };

  onMounted(()=>{
    updateReadProgress();
    window.addEventListener('scroll',updateReadProgress);
    window.addEventListener('scroll',handleScroll);
  });

  onBeforeUnmount(()=>{
    window.removeEventListener('scroll',updateReadProgress);
    window.removeEventListener('scroll',handleScroll);
  });

  return{
    readProgress,
    articleRef,
    isVisible,
    showScrollTop,
    scrollToTop,
    shareArticle,
  };
}

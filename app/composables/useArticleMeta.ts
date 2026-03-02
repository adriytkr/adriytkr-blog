export default function(slug:string){
  const {t}=useI18n();
  useSeoMeta({
    title:t(`articles.${slug}.title`),
  });
}

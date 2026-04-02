import { ProjectService } from '~/services/ProjectService';
import type { CustomLocale } from '~/types/i18n';

export async function useProjects(locale:Ref<CustomLocale>){
  const {data}=await useAsyncData(
    `projects-${locale}`,
    async()=>await ProjectService.getAllProjects(locale.value),
    {watch:[locale]},
  );

  return{
    data,
  };
}

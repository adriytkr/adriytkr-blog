import type { ProjectSchema } from '~/types/projects';
import type { ViewMode,SortingMode } from '~/types/filter';

import {
  matchProject,
  sortProjectsWithStrategy,
} from '~/utils/project';

export function useProjectsFilter(){
  const searchQuery=ref<string>('');
  const selectedViewMode=ref<ViewMode>('grid');

  const projects=ref<ProjectSchema[]>([]);
  const {t,locale}=useI18n();

  async function fetch(){
    const {data}=await useAsyncData(
      `projects-${locale}`,
      async()=>await queryCollection('projects')
        .where('path','LIKE',`/docs/projects/${locale.value}/%`)
        .all(),
      {watch:[locale]}
    )

    projects.value=data.value as ProjectSchema[];
  }

  const selectedSortingMode=ref<SortingMode>('sorted');

  const filteredProjects=computed<ProjectSchema[]>(()=>{
    const result=projects.value.filter(project=>{
      return matchProject(
        project,
        searchQuery.value,
      );
    });

    return sortProjectsWithStrategy(
      selectedSortingMode.value,
      result,
    );
  });

  const matchesFound=computed<number>(()=>filteredProjects.value.length);

  function reset(){
    searchQuery.value='';
  }

  return{
    fetch,
    searchQuery,
    selectedViewMode,
    selectedSortingMode,
    filteredProjects,
    matchesFound,
    reset,
  };
}

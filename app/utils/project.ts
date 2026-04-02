import type { ProjectSchema } from '~/types/content';
import type { SortingMode } from '~/types/filter';

export function isProjectElegible(
  recommendation:ProjectSchema,
  query:string,
  tags:string[],
):boolean{
  const normalizedQuery=query.toLowerCase();

  const matchesQuery=
    recommendation.title?.toLowerCase().includes(normalizedQuery)||
    recommendation.description?.toLowerCase().includes(normalizedQuery);

  const matchesTags=tags.some(tag=>
    tag.includes(normalizedQuery)
  );

  return matchesQuery||matchesTags;
}

export function sortProjectsWithStrategy(
  mode:SortingMode,
  projects:ProjectSchema[],
):ProjectSchema[]{
  const projectsCopy=[...projects];

  switch(mode){
    case 'sorted':
      return projectsCopy;
    case 'unsorted':
      return projectsCopy
        .sort()
        .reverse();
  }
}

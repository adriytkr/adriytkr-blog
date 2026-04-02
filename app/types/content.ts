import type { RecommendationStatus } from './recommendation';

export type CustomCollection='projects'|'recommendations';

export interface RecommendationSchema{
  title:string;
  description:string;
  longDescription:string;
  thumbnail:string;
  author:string;
  categories:string[];
  status:RecommendationStatus;
}

export interface ProjectSchema{
  stem:string;
  title:string;
  description:string;
  thumbnail:string;
  tags:string[];
};

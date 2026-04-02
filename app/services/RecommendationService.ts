import type { CustomLocale } from '~/types/i18n';
import type { RecommendationSchema } from '~/types/content';
import { normalizeCollectionName } from '~/utils/content';

export class RecommentationService{
  static async getAllRecommendations(
    locale:CustomLocale,
  ):Promise<RecommendationSchema[]>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale);

    const recommendations:RecommendationSchema[]=
      await queryCollection(normalizedCollectionName).all() as RecommendationSchema[];

    return recommendations;
  }

  static async getRecommendationBySlug(
    locale:CustomLocale,
    slug:string,
  ):Promise<RecommendationSchema|null>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale);
    const recommendationPath=`/${locale}/recommendations/${slug}`;

    const recommendation=await queryCollection(normalizedCollectionName)
      .path(recommendationPath.toLowerCase())
      .first();

    if(recommendation===null)return null;

    return recommendation as RecommendationSchema;
  }
}

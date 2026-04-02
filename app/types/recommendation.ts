export type RecommendationStatus='reviewed'|'pending';
export type RecommendationStatusFilter='all'|RecommendationStatus;

export const RECOMMENDATIONS_STATUS:RecommendationStatusFilter[]=['all', 'reviewed', 'pending'];

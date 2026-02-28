export const getArticleTagsBySlug=(slug:string):string[]=>
  articles.find(article=>article.slug===slug)!.tagSlugs;

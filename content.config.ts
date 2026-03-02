import {defineContentConfig,defineCollection, z} from '@nuxt/content';

export default defineContentConfig({
  collections:{
    articles:defineCollection({
      type:'data',
      source:'articles/*.json',
      schema:z.object({
        slug:z.string(),
        tagSlugs:z.array(z.string()),
        readingTimeInMinutes:z.number(),
        publishedDate:z.date(),
        lastUpdatedDate:z.date(),
      }),
    }),
  },
});

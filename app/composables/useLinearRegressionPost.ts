export default function(){
  const headings:string[]=[
    'introduction',
    'problem',
    'criteria',
    'compute',
    'infinitely-many-solutions',
    'why-square',
    'linear-algebra',
  ];

  const tags=getArticleTagsBySlug('linear-regression');

  return{
    headings,
    tags,
  };
}

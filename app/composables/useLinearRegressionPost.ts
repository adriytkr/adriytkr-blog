export default function(){
  const headings:Section[]=[
    {title:'Introduction',id:'introduction'},
    {title:'Problem',id:'problem'},
    {title:'What criteria should we choose',id:'criteria'},
    {title:'How to compute the best-fitting line',id:'compute'},
    {title:'Infinitely many solutions',id:'infinitely-many-solutions'},
    {title:'Why square and not take the power of 4?',id:'why-square'},
    {title:'Linear regression and Linear Algebra',id:'linear-algebra'},
  ];

  const tags:string[]=articles.find(article=>article.slug==='linear-regression')!.tags;

  const normalPoints:Point[]=[
    {x:100,y:1000},
    {x:200,y:2000},
    {x:300,y:3000},
    {x:400,y:4000},
    {x:500,y:5000},
  ]

  const messyPoints:Point[]=[
    {x:100,y:1100},
    {x:200,y:1500},
    {x:300,y:2200},
    {x:400,y:3600},
    {x:500,y:4800},
  ]

  const a=ref(10);
  const b=ref(0);

  return{
    headings,
    tags,
    normalPoints,
    messyPoints,
    a,
    b,
  };
}

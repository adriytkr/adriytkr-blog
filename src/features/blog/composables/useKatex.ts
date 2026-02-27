import katex from 'katex';
import {computed} from 'vue';

export default function(formula:string,displayMode:boolean){
  const rendered=computed(()=>{
    try{
      return katex.renderToString(
        formula,
        {
          throwOnError:false,
          displayMode,
        },
      );
    }catch(err){
      return formula;
    }
  });

  return{rendered};
}

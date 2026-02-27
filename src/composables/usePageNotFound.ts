import gif1 from '@/assets/images/gif1.gif';
import gif2 from '@/assets/images/gif2.gif';
import gif3 from '@/assets/images/gif3.gif';
import gif4 from '@/assets/images/gif4.gif';

export default function(){
  const gifs=[gif1,gif2,gif3,gif4];
  const getRandomGif=()=>gifs[Math.floor(Math.random()*gifs.length)];

  return{
    getRandomGif,
  };
}

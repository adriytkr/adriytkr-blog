import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function(
  setupScene:(scene:THREE.Scene)=>void,
  animation:(delta:number)=>void,
  controls:boolean,
){
  const containerRef=ref<HTMLDivElement|null>(null);
  let scene:THREE.Scene;
  let camera:THREE.PerspectiveCamera;
  let renderer:THREE.WebGLRenderer;
  let orbitControls:OrbitControls;
  let timer:THREE.Timer;

  const init=()=>{
    if(!containerRef.value)return;

    const width=containerRef.value.clientWidth;
    const height=containerRef.value.clientHeight;

    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(
      75,
      width/height,
      0.1,
      1000
    );
    camera.position.z=5;

    setupScene(scene);

    renderer=new THREE.WebGLRenderer();
    renderer.setSize(width,height);
    containerRef.value.appendChild(renderer.domElement);

    if(controls)orbitControls=new OrbitControls(camera,renderer.domElement);

    timer=new THREE.Timer();
    timer.connect(document)
    // renderer.setAnimationLoop(animate);
  };

  const animate=()=>{
    timer.update();
    const delta=timer.getDelta();
    
    orbitControls.update();
    animation(delta);
    renderer.render(scene,camera);
  };

  const cleanup=()=>{};

  onMounted(init);
  onBeforeUnmount(cleanup);

  return{containerRef};
}

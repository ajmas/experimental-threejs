import * as THREE from 'three';
// import THREE from "three";

// import { mat4, vec4 } from 'gl-matrix';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { loadShaders, getShaderCode } from './shader-loader';
import Earth from './Earth2';
import Sun from './Sun';

import Universe from './Universe';
import Satellites from './Satellites';
import SceneComponent from './interfaces/SceneComponent';
import Orbits from './Orbits';


const sceneComponents: SceneComponent[] = [];
// let sun: SceneComponent;
// let earth: SceneComponent;
// let universe: SceneComponent;
// let satellites: SceneComponent;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function idleRotateCamera (camera: THREE.Camera, time: number = 0) {
  const distance = 13;
  const offset = new THREE.Vector3();

  time = time / 10;
  // alert('Inactive for 5 seconds');
  // for (let i = -0.5; i < 0.5; i++) {
  const mesh = (sceneComponents[0] as any).getMesh();
  if (mesh) {
    offset.x = distance * Math.sin( time * 0.001 );
    offset.z = distance * Math.cos( time * 0.001 );

    // camera.position.copy( camera.position ).add( offset );
    camera.position.copy( mesh.position ).add( offset );


    camera.lookAt( mesh.position );
  }
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );


// satellites.init(scene);

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 15, 0, 10000 );
controls.update();

camera.position.z = 5;

function init () {
  sceneComponents.push(new Earth());
  sceneComponents.push(new Sun());
  sceneComponents.push(new Universe());
  sceneComponents.push(new Satellites());

  for (let i = 0; i < sceneComponents.length; i++) {
    sceneComponents[i].init(scene);
  }

  controls.minDistance = 4;
  controls.maxDistance = 50;
  // earth.init(scene);
  // sun.init(scene);
  // universe.init(scene);
  // satellites.init(scene);
}

function animate( time: number ) {
	requestAnimationFrame( animate );

  for (let i = 0; i < sceneComponents.length; i++) {
    sceneComponents[i].update(scene);
  }

  controls.update();

  // idleRotateCamera(camera, time)
	renderer.render( scene, camera );
}


window.addEventListener('resize', onWindowResize);
init();
animate(0);
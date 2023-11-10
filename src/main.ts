import * as THREE from 'three';
// import THREE from "three";

// import { mat4, vec4 } from 'gl-matrix';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadShaders, getShaderCode } from './shader-loader';
import earth from './Earth2';
import satellites from './Satellites';


function idleRotateCamera (camera: THREE.Camera, time: number = 0) {
  const distance = 5;
  const offset = new THREE.Vector3();

  time = time / 10;
  // alert('Inactive for 5 seconds');
  // for (let i = -0.5; i < 0.5; i++) {
  const mesh = earth.getMesh();
  if (mesh) {
    offset.x = distance * Math.sin( time * 0.001 );
    offset.z = distance * Math.cos( time * 0.001 );

    // camera.position.copy( camera.position ).add( offset );
    camera.position.copy( mesh.position ).add( offset );


    camera.lookAt( mesh.position );
  }
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
// scene.add( new THREE.LineSegments( geometry, lineMaterial ) );

// const geometry = new THREE.SphereGeometry( 1, 32, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

earth.init(scene);
// satellites.init(scene);

// const texture = new THREE.TextureLoader().load('/mercator-tex.jpg');

// const geometry = new THREE.SphereGeometry( 1, 64, 32 );
// const material = new THREE.MeshBasicMaterial({ map : texture, overdraw: 0.5 });
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 100 );
controls.update();

camera.position.z = 5;

function createParticles () {
  // Particle system parameters
  const particleCount = 1000; // Adjust the number of particles as desired
  const particleSize = 0.05; // Adjust the size of the particles
  const particleColor = 0xffff00; // Adjust the color of the particles

  // Create the particle system
  const particlesGeometry = new THREE.BufferGeometry();
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: getShaderCode('dot-vertex2.glsl'),
    fragmentShader: getShaderCode('dot-fragment.glsl'),
    depthTest: false,
    transparent: true,
    vertexColors: true
    // blending:
  });

  const particlesMaterial = new THREE.PointsMaterial({ size: particleSize, color: particleColor });
  // const material = particlesMaterial;

  const material = shaderMaterial;

  // const particlesMaterial = new THREE.ParticleBasicMaterial({
  //   color: 'transparent',
  //   size: 0.8,
  //   // map: this.spriteImage,
  //   transparent: true,
  //   opacity: 0.5,        // should be less than 1.0
  //   sizeAttenuation: true,
  //   depthWrite: false
  // });

  const particles = new THREE.Points(particlesGeometry, material);
  scene.add(particles);

  // Generate random particle positions and colors
  const positions = [];
  const colors = [];

  // particlesGeometry.setAttribute('aPos', 0);
  // particlesGeometry.setAttribute('aColor', 0);
  // particlesGeometry.setAttribute('uMvMatrix', 0);
  // particlesGeometry.setAttribute('uCamMatrix', 0);
  // particlesGeometry.setAttribute('uPMatrix', 0);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    positions.push(x, y, z);

    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    colors.push(r, g, b);
  }

  // particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  // particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('aPos', new THREE.Float32BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));

  console.log('oo', shaderMaterial.uniforms.uCamMatrix);
}

function animate( time: number ) {
	requestAnimationFrame( animate );

  // camera.position.y += 0.01;

  // sphere.rotation.z += 0.01;
  // sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.005;
  earth.update();
  // cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
  controls.update();

  // idleRotateCamera(camera, time)
	renderer.render( scene, camera );
}

// setInterval(() => {
//   sphere.rotation.x += 0.01;
//   sphere.rotation.y += 0.01;
// }, 50);

await loadShaders();
console.log('xx', getShaderCode('dot-fragment.glsl'));

createParticles();

animate();
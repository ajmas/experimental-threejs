// import THREE, { Object3D } from "three";
import * as THREE from 'three';
import { DateTime } from 'luxon';
import SceneComponent from './interfaces/SceneComponent';

// type Mesh = THREE.Mesh;

class Earth implements SceneComponent {
  radiusInKm = 6371;
  pxToRadius = 3185.5;

  sphere: THREE.Mesh | undefined = undefined;
  group: THREE.Group | undefined = undefined;


  init (scene: THREE.Scene) {
    const dayTexture = new THREE.TextureLoader().load('textures/earth-blue-marble.jpg');
    const nightTexture = new THREE.TextureLoader().load('textures/nightearth-4096.png');
    const bumpTexture = new THREE.TextureLoader().load('textures/earth-topology.png');

    const earthSpecularMap = new THREE.TextureLoader().load('textures/earth-water.png');

    const dayMaterial = new THREE.MeshPhongMaterial({
      map: dayTexture,
      bumpMap: bumpTexture,
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0x888888),
      emissiveIntensity: 5,
      specularMap: earthSpecularMap,
      specular: 1,
      shininess: 15,
      bumpScale: 1
    });


    const radius = this.radiusInKm / this.pxToRadius;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.sphere = new THREE.Mesh( geometry, dayMaterial );
    scene.add( this.sphere );
  }

  update(_scene?: THREE.Scene | undefined): void | Promise<void> {
    if (this.sphere) {
    //  this.sphere.rotation.y += 0.005;
    //  this.
    }
  }

  getMesh () {
    return this.sphere;
  }
}

export default Earth;
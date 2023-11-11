// import THREE, { Object3D } from "three";
import * as THREE from 'three';

type Mesh = THREE.Mesh;

class Element3D {
  sphere: Mesh | undefined = undefined;

  init (scene: THREE.Scene) {
    const texture = new THREE.TextureLoader().load('textures/mercator-tex.jpg');

    const geometry = new THREE.SphereGeometry( 1, 64, 32 );
    const material = new THREE.MeshBasicMaterial({ map : texture });
    this.sphere = new THREE.Mesh( geometry, material );
    scene.add( this.sphere );
  }

  update () {
    // TODO
    if (this.sphere) {
    //  this.sphere.rotation.y += 0.005;
    }
  }

  getMesh () {
    return this.sphere;
  }
}

export default new Element3D();
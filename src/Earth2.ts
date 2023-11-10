// import THREE, { Object3D } from "three";
import * as THREE from 'three';

type Mesh = THREE.Mesh;

class Element3D {
  sphere: Mesh | undefined = undefined;

  init (scene: THREE.Object3D) {
    // const light = new THREE.AmbientLight( 0x404040, 20 ); // soft white light
    // scene.add( light );

    const plight = new THREE.PointLight(0xffffff, 1);
    plight.position.set(90, 1, 1)
    scene.add(plight);

    const dayTexture = new THREE.TextureLoader().load('textures/earth-blue-marble.jpg');
    // const nightTexture = new THREE.TextureLoader().load('textures/nightearth-4096.png');
    const nightTexture = new THREE.TextureLoader().load('textures/mercator-tex.jpg');
    const bumpTexture = new THREE.TextureLoader().load('textures/earth-topology.png');

    const earthSpecularMap = new THREE.TextureLoader().load('textures/earth-water.png');

    const dayMaterial = new THREE.MeshPhongMaterial({
      map: dayTexture,
      bumpMap: bumpTexture,
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0x777777),
      emissiveIntensity: 4,
      specularMap: earthSpecularMap,
      // specular: 1,
      // shininess: 15,
      bumpScale: 19
    });

    // const nightMaterial = new THREE.MeshBasicMaterial({
    //   map: texture2,
    //   alphaTest: 0.5
    // });

    // const materials = [ dayMaterial ];//, nightMaterial ];
    const radius = 2;
    // const geometry = new THREE.SphereGeometry( 1, 64, 32 );
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    // const material = new THREE.Mesh({ map: materials });
    this.sphere = new THREE.Mesh( geometry, dayMaterial );
    scene.add( this.sphere );
  }

  update () {
    // TODO
    if (this.sphere) {
     this.sphere.rotation.y += 0.005;
    }
  }

  getMesh () {
    return this.sphere;
  }
}

export default new Element3D();
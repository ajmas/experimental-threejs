// import THREE, { Object3D } from "three";
import * as THREE from 'three';
import SceneComponent from './interfaces/SceneComponent';

// type Mesh = THREE.Mesh;
class Satellites implements SceneComponent{
  // sphere: Mesh | undefined = undefined;

  init (scene: THREE.Scene) {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const materials = [];

    const assignSRGB = ( texture: THREE.Texture ) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    };

    const sprite1 = textureLoader.load( 'textures/sprites/snowflake1.png', assignSRGB );
    const sprite2 = textureLoader.load( 'textures/sprites/snowflake2.png', assignSRGB );
    const sprite3 = textureLoader.load( 'textures/sprites/snowflake3.png', assignSRGB );
    const sprite4 = textureLoader.load( 'textures/sprites/snowflake4.png', assignSRGB );
    const sprite5 = textureLoader.load( 'textures/sprites/snowflake5.png', assignSRGB );


    for ( let i = 0; i < 10000; i ++ ) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      vertices.push( x, y, z );
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    let parameters = [
      [[ 1.0, 0.2, 0.5 ], sprite2, 20 ],
      [[ 0.95, 0.1, 0.5 ], sprite3, 15 ],
      [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
      [[ 0.85, 0, 0.5 ], sprite5, 8 ],
      [[ 0.80, 0, 0.5 ], sprite4, 5 ]
    ];

    for ( let i = 0; i < parameters.length; i ++ ) {

      const color = parameters[ i ][ 0 ] as number[];
      const sprite = parameters[ i ][ 1 ] as THREE.Texture;
      const size = parameters[ i ][ 2 ] as number;

      materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
      materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ], THREE.SRGBColorSpace );

      const particles = new THREE.Points( geometry, materials[ i ] );

      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.add( particles );

    }
  }

  update(_scene?: THREE.Scene | undefined): void | Promise<void> {
    // TODO
    // if (this.sphere) {
    //  this.sphere.rotation.y += 0.005;
    // }
  }
}

export default Satellites;
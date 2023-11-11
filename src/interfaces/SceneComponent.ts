import * as THREE from 'three';

interface SceneComponent {
  init (scene: THREE.Scene): void | Promise<void>;
  update (scene?: THREE.Scene): void | Promise<void>;
}

export default SceneComponent;
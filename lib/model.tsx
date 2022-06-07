/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadGLTFModel = (
  scene: THREE.Scene,
  glbPath: string,
  options = { receiveShadow: true, castShadow: true }
) => {
  const { receiveShadow, castShadow } = options;

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = 'computer';
        obj.position.y = 0;
        obj.position.x = -0.5;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        });
        resolve(gltf);
      },
      undefined,
      (error) => reject(error)
    );
  });
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Loader } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../../lib/model';

const easeOutCirc = (x: number): number => Math.sqrt(1 - (x - 1) ** 4);

export const ThreeContainer = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [scene] = useState(new THREE.Scene());
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [_camera, setCamera] = useState<THREE.OrthographicCamera>();
  const [_controls, setControls] = useState<OrbitControls>();
  const [initialCameraPosition] = useState(
    new THREE.Vector3(20 * Math.sin(0.2 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))
  );
  const [target] = useState(new THREE.Vector3(-0.5, 0.5, 0));

  const handleWindowResize = useCallback(() => {
    const { current: currentRef } = containerRef;
    if (currentRef && renderer) {
      const { clientWidth } = currentRef;
      const { clientHeight } = currentRef;

      renderer.setSize(clientWidth, clientHeight);
    }
  }, [renderer]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const { current: currentRef } = containerRef;
    let mixer: THREE.AnimationMixer;
    const clock = new THREE.Clock();

    if (currentRef && !renderer) {
      const { clientWidth } = currentRef;
      const { clientHeight } = currentRef;

      //Renderer
      const newRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      newRenderer.setPixelRatio(window.devicePixelRatio);
      newRenderer.setSize(clientWidth, clientHeight);
      newRenderer.outputEncoding = THREE.sRGBEncoding;
      currentRef.appendChild(newRenderer.domElement);
      setRenderer(newRenderer);

      //Scene
      const scale = clientHeight * 0.005 + 1;
      const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.001, 25000);
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      scene.add(camera);
      setCamera(camera);

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
      scene.add(ambientLight);

      //Controls
      const controls = new OrbitControls(camera, newRenderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      //Render the scene
      let req: number = 0;
      let frame = 0;

      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        if (frame <= 100) {
          const camPos = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 10;
          camera.position.x = camPos.x * Math.cos(rotSpeed) + camPos.z * Math.sin(rotSpeed);
          camera.position.z = camPos.z * Math.cos(rotSpeed) - camPos.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        newRenderer.render(scene, camera);
      };

      //Load model
      loadGLTFModel(scene, 'http://localhost:3000/scene.gltf', {
        receiveShadow: false,
        castShadow: true,
      }).then((res) => {
        mixer = new THREE.AnimationMixer(res.scene);
        mixer.clipAction(res.animations[0]).play();
        animate();
        setLoading(false);
      });

      //Clean up scene
      return () => {
        cancelAnimationFrame(req);
        currentRef.removeChild(newRenderer.domElement);
        newRenderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <Box
      sx={{
        margin: 'auto',
        position: 'relative',
        width: '640px',
        height: '640px',
        marginTop: '-136px',
        marginBottom: '-200px',
        '@media (max-width: 768px)': {
          width: '480px',
          height: '480px',
          marginTop: '-76px',
          marginBottom: '-140px',
        },
        '@media (max-width: 480px)': {
          width: '280px',
          height: '280px',
          marginTop: '-36px',
          marginBottom: '-40px',
        },
        '@media (min-width: 768px)': {
          marginLeft: '-66px',
        },
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        {loading && <Loader />}
      </div>
    </Box>
  );
};

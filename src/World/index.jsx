import { OrbitControls, useTexture } from "@react-three/drei";
import { Model } from "./Lost";

import blobVertexShader from "../shaders/blob.vertex.glsl";
import blobFragmentShader from "../shaders/blob.fragment.glsl";
import floorVertexShader from "../shaders/floor.vertex.glsl";
import floorFragmentShader from "../shaders/floor.fragment.glsl";

import { Uniform } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const World = () => {
  const blobRef = useRef(null);
  const floorRef = useRef(null);

  const flootTexture = useTexture("/floor.png");

  useFrame(({ clock }) => {
    if (!blobRef.current || !floorRef.current) return;

    const elapsedTime = clock.getElapsedTime();

    blobRef.current.material.uniforms.uTime.value = elapsedTime;
    floorRef.current.material.uniforms.uTime.value = elapsedTime;
  });

  return (
    <>
      <OrbitControls />
      <fog near={3} far={5} color="#dbdbdb" />
      <ambientLight intensity={1.4} />
      <directionalLight intensity={1.3} position={[2, 10, 0]} />
      <Model />

      <mesh position-y={3} ref={blobRef}>
        <sphereGeometry args={[1, 100, 100]} />
        <shaderMaterial
          key={1}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          transparent
          uniforms={{ uTime: new Uniform(0) }}
        />
      </mesh>

      <mesh
        ref={floorRef}
        rotation-x={Math.PI * -0.5}
        // position-y={-1.5}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <shaderMaterial
          key={2}
          vertexShader={floorVertexShader}
          fragmentShader={floorFragmentShader}
          transparent
          alphaTest={0.5}
          uniforms={{
            uTime: new Uniform(0),
            uTexture: new Uniform(flootTexture),
          }}
        />
      </mesh>
    </>
  );
};

export default World;

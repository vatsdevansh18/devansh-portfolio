'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      // Mouse interaction (subtle follow and distortion shift)
      const targetX = (state.pointer.x * viewport.width) / 8;
      const targetY = (state.pointer.y * viewport.height) / 8;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={viewport.width > 10 ? 2.5 : 1.8}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#d4a853"
        envMapIntensity={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.8}
        roughness={0.2}
        distort={0.4} // Base distortion
        speed={1.5} // Animation speed
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#d4a853" />
          <Environment preset="city" />
          <AnimatedSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}

import React from 'react';
import { useGLTF } from '@react-three/drei';

const GLBModel = ({ scale, position, rotation }) => {
  const { scene } = useGLTF('/models/old_computers.glb'); // Replace with your model's path
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
};

export default GLBModel;
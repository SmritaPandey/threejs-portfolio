import { Leva } from 'leva';
import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import GLBModel from '../components/OldComputers.jsx';

import { calculateSizes } from '../constants/index.js';

const Hero = () => {
  // Screen size detection using media queries
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Animation setup for on-scroll animations
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [controls, inView]);

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      {/* Hero text */}
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 gap-3 z-20 relative">
        <motion.p
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans"
        >
          Hi, I am Smrita <span className="waving-hand">👋🏼</span>
        </motion.p>
        <motion.p
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="hero_tag text-gray_gradient"
        >
          Bringing Brands To Life
        </motion.p>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera isMobile={isMobile}>
              <GLBModel
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0, 0, 0]}
              />
            </HeroCamera>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>
            <ambientLight intensity={2} color="#ffffff" />
            <directionalLight position={[10, 10, 10]} intensity={4} color="#ffdfba" />
            <directionalLight position={[-10, 10, 10]} intensity={3} color="#a0c4ff" />
          </Suspense>
        </Canvas>
      </div>

      {/* Call-to-action button */}
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 flex justify-center">
        <a href="#about">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;

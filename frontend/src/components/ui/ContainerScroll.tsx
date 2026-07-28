import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
  link: string;
  index: number;
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({
  titleComponent,
  imgSrc,
  imgAlt,
  link,
  index,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [, setHasRef] = useState(false);

  useEffect(() => {
    // Find the scrollable main container from App.tsx and populate the ref
    const mainEl = document.querySelector('main');
    if (mainEl) {
      scrollContainerRef.current = mainEl;
      setHasRef(true); // Trigger re-render so useScroll binds to the updated ref
    }
  }, []);

  // Track scroll position of this project section relative to the scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ['start end', 'end start'],
  });

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  // Calculate sticky parameters and dimensions dynamically (Larger iPads!)
  const stickyTop = isMobile 
    ? 40 + index * 120 
    : isTablet 
      ? 60 + index * 170 
      : 80 + index * 225;

  const sectionHeight = isMobile 
    ? 400 
    : isTablet 
      ? 560 
      : 750;

  const cardHeight = isMobile 
    ? 280 
    : isTablet 
      ? 400 
      : 540;

  const cardWidth = isMobile 
    ? 370 
    : isTablet 
      ? 540 
      : 720;

  // Aceternity UI responsive scale dimension mappings
  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.92] : [1.05, 1];
  };

  // 3D rotation, scaling, and header translation transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], scaleDimensions());
  const translateHeaderY = useTransform(scrollYProgress, [0, 0.45], [0, -30]);

  // SigmoIT scroll effect: Translate the screenshot image inside the tablet frame
  const imageY = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '-50%']);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: 10 + index,
        height: `${sectionHeight}px`,
      }}
      className="w-full flex items-center justify-center relative p-4 bg-transparent select-none"
    >
      <div 
        className="w-full relative flex flex-col items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Header (Translates upward as scroll occurs) */}
        <motion.div
          style={{
            translateY: translateHeaderY,
          }}
          className="max-w-5xl mx-auto text-center mb-6"
        >
          {titleComponent}
        </motion.div>

        {/* Card (iPad Mockup Frame with 3D Tilt Scroll Effect) */}
        <motion.div
          style={{
            rotateX,
            scale,
            transformStyle: 'preserve-3d',
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
            height: `${cardHeight}px`,
            width: `${cardWidth}px`,
          }}
          className="mx-auto border-8 border-gray-800 p-2 md:p-3 bg-gray-900 rounded-[32px] relative cursor-pointer group"
          onClick={() => window.open(link, '_blank')}
        >
          {/* Tablet Front Camera Notch */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-black z-30" />

          {/* Screen Content Wrapper */}
          <div className="w-full h-full overflow-hidden rounded-xl bg-zinc-950 relative">
            {/* Smooth glass/shine reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-30 z-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Animated Screenshot Image */}
            <motion.img
              src={imgSrc}
              alt={imgAlt}
              style={{ y: imageY }}
              className="w-full h-auto object-cover object-top absolute top-0 left-0 transition-transform duration-300 ease-out"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

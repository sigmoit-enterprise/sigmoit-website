import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';

const SHLOKA = 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।';

const Typewriter: React.FC<{ text: string; delay?: number; speed?: number }> = ({
  text,
  delay = 600,
  speed = 110,
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [started, count, text.length, speed]);

  const done = count >= text.length;

  return (
    <span className="inline-flex items-baseline">
      <span>{text.slice(0, count)}</span>
      <span
        className={`ml-2 inline-block w-[3px] self-stretch bg-white/80 ${
          done ? 'animate-pulse' : ''
        }`}
        style={{ minHeight: '1em' }}
      />
    </span>
  );
};

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden shrink-0 select-none px-6"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)',
        }}
      >
        <div className="relative z-10 w-full max-w-[1200px] text-center">
          <p className="font-devanagari text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.5] tracking-wide">
            <Typewriter text={SHLOKA} />
          </p>
          <p className="mt-8 md:mt-10 text-white/60 text-xs sm:text-sm md:text-base font-light tracking-[0.25em] uppercase">
            Work accomplishes goals, not mere wishes
          </p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8, ease: 'easeOut' }}
          className="absolute bottom-12 md:bottom-16 left-8 md:left-16 lg:left-24 z-10 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-bold text-white tracking-tight leading-none"
        >
          About
        </motion.h1>
      </section>

      <Footer />
    </div>
  );
};

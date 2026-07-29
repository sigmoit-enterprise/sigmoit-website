import React, { useEffect, useState } from 'react';

const WORDS = ['Develop', 'Design', 'Deploy'];

const TYPE_SPEED = 120;
const DELETE_SPEED = 60;
const HOLD_DURATION = 1600;

const CyclingWord: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const word = WORDS[wordIndex];

  useEffect(() => {
    if (!deleting && count === word.length) {
      const timer = setTimeout(() => setDeleting(true), HOLD_DURATION);
      return () => clearTimeout(timer);
    }

    if (deleting && count === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    const timer = setTimeout(
      () => setCount((c) => (deleting ? c - 1 : c + 1)),
      deleting ? DELETE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(timer);
  }, [count, deleting, word.length]);

  return (
    <span className="inline-flex items-baseline text-white italic">
      <span>{word.slice(0, count) || '​'}</span>
      <span
        className="ml-1.5 inline-block w-[3px] self-stretch bg-white/70 animate-pulse"
        style={{ minHeight: '0.9em' }}
      />
    </span>
  );
};

export const RequirementSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[520px] flex flex-col justify-center items-center overflow-hidden select-none px-6 py-24 bg-[#16803f]">
      <svg
        aria-hidden
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M 0,478 C 430,476 660,458 720,260 C 780,62 1010,44 1440,42"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          className="opacity-30 animate-sigmoid-draw"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-white text-sm sm:text-base font-light tracking-[0.2em] uppercase">
          Tell Us Your Requirement
        </p>

        <h2 className="mt-6 font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-center">
          <span>We&nbsp;</span>
          <span className="inline-flex justify-start min-w-[6.5ch] text-left">
            <CyclingWord />
          </span>
        </h2>

        <div className="relative mt-12 flex items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-16 h-56 w-56 rounded-full bg-[#3b82f6] opacity-40 blur-[70px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -bottom-16 h-56 w-56 rounded-full bg-[#d9c39a] opacity-45 blur-[70px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 -bottom-4 h-24 rounded-full bg-[#67e8f9] opacity-20 blur-[60px]"
          />

          <a
            href="#contact"
            className="relative group inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-9 py-4 text-sm font-bold tracking-wide text-white shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20"
          >
            <span>Connect Now</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RequirementSection;

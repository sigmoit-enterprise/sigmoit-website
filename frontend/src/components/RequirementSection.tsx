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
    <section className="w-full min-h-[520px] flex flex-col justify-center items-center overflow-hidden select-none px-6 py-24 bg-[#16803f]">
      <p className="text-white text-sm sm:text-base font-light tracking-[0.2em] uppercase">
        Tell Us Your Requirement
      </p>

      <h2 className="mt-6 font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-center">
        <span>We&nbsp;</span>
        <span className="inline-flex justify-start min-w-[6.5ch] text-left">
          <CyclingWord />
        </span>
      </h2>

      <a
        href="#contact"
        className="mt-12 group inline-flex items-center gap-2 px-9 py-4 rounded-lg bg-white hover:bg-white/90 text-[#16803f] font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-black/30"
      >
        <span>Connect Now</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </a>
    </section>
  );
};

export default RequirementSection;

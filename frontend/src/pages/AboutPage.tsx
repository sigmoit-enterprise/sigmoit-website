import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  FileText,
  PenTool,
  Code2,
  Rocket,
  Wrench,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { Footer } from '../components/Footer';

const SHLOKA = 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।';

const PROCESS_STEPS = [
  {
    icon: Video,
    title: 'Virtual Meeting',
    description: 'We start with a call to understand your goals, users and constraints.',
  },
  {
    icon: FileText,
    title: 'Proposal Drafting',
    description: 'You receive a clear scope, timeline and cost before any work begins.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Wireframes and polished interfaces shaped around real user journeys.',
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'Clean, tested code built in short iterations you can review as we go.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'We ship to production with monitoring, backups and a rollback plan.',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Ongoing updates, fixes and improvements long after launch day.',
  },
];

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

      <section className="w-full bg-[#f0f4f1] px-6 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1080px]">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-[560px] font-sans text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] sm:text-4xl md:text-[2.75rem]"
          >
            Modern Software Development Company
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative mt-10 md:mt-14"
          >
            <img
              src="/office-interior.jpg"
              alt="Sigmoit office interior"
              loading="lazy"
              className="w-full rounded-[28px] object-cover aspect-[4/3] md:aspect-[16/10] md:rounded-[36px]"
            />

            <div className="absolute right-0 top-0 rounded-bl-[36px] bg-[#f0f4f1] pb-6 pl-6 md:pb-9 md:pl-9">
              <span className="absolute right-full top-0 h-5 w-5 bg-[radial-gradient(circle_20px_at_0_100%,transparent_20px,#f0f4f1_21px)] md:h-6 md:w-6 md:bg-[radial-gradient(circle_24px_at_0_100%,transparent_24px,#f0f4f1_25px)]" />
              <span className="absolute right-0 top-full h-5 w-5 bg-[radial-gradient(circle_20px_at_0_100%,transparent_20px,#f0f4f1_21px)] md:h-6 md:w-6 md:bg-[radial-gradient(circle_24px_at_0_100%,transparent_24px,#f0f4f1_25px)]" />
              <div className="flex items-baseline gap-3 md:gap-4">
                <span className="font-sans text-6xl font-bold leading-none text-[#24a556] md:text-[6rem]">
                  5
                </span>
                <span className="text-sm leading-snug text-[#1b1f22]/70 md:text-lg">
                  Years of
                  <br />
                  Digital Excellence
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-[560px] text-sm leading-relaxed text-[#1b1f22]/70 md:absolute md:bottom-0 md:left-0 md:mt-0 md:max-w-[54%] md:rounded-tr-[36px] md:bg-[#f0f4f1] md:pr-9 md:pt-9 md:text-[0.95rem]">
              <span className="absolute bottom-full left-0 hidden h-6 w-6 bg-[radial-gradient(circle_24px_at_100%_0,transparent_24px,#f0f4f1_25px)] md:block" />
              <span className="absolute bottom-0 left-full hidden h-6 w-6 bg-[radial-gradient(circle_24px_at_100%_0,transparent_24px,#f0f4f1_25px)] md:block" />
              We believe technology should not only work flawlessly but also feel personal,
              inspiring trust and confidence in every interaction. Over the years, we&apos;ve built
              lasting partnerships across diverse sectors, helping them reach wider audiences,
              enhance customer experiences and achieve measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#f0f4f1] px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1080px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#24a556]">
              How We Work
            </p>
            <h2 className="mt-4 max-w-[560px] font-sans text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] sm:text-4xl md:text-[2.75rem]">
              Our Process
            </h2>
          </motion.div>

          <ol className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === PROCESS_STEPS.length - 1;
              const endsRowSm = index % 2 === 1;
              const endsRowLg = index % 3 === 2;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className="group relative flex flex-col rounded-[24px] bg-white p-7 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.16)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e1ede5] text-[#24a556] transition-colors duration-500 group-hover:bg-[#24a556] group-hover:text-white">
                      <Icon className="h-5 w-5 stroke-[1.6]" />
                    </span>
                    <span className="font-sans text-3xl font-bold leading-none text-[#0b3d1f]/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 font-sans text-xl font-bold tracking-tight text-[#0b3d1f]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1b1f22]/70">
                    {step.description}
                  </p>

                  {!isLast && (
                    <>
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute left-full top-1/2 w-8 -translate-y-1/2 justify-center text-[#24a556]/60 lg:w-10 ${
                          endsRowSm ? 'sm:hidden' : 'sm:flex'
                        } ${endsRowLg ? 'lg:hidden' : 'lg:flex'} hidden`}
                      >
                        <ArrowRight className="h-5 w-5 stroke-[1.6]" />
                      </span>
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute top-full left-1/2 flex h-8 -translate-x-1/2 items-center justify-center text-[#24a556]/60 lg:h-12 ${
                          endsRowSm ? 'sm:flex' : 'sm:hidden'
                        } ${endsRowLg ? 'lg:flex' : 'lg:hidden'}`}
                      >
                        <ArrowDown className="h-5 w-5 stroke-[1.6]" />
                      </span>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  FileText,
  PenTool,
  Code2,
  Rocket,
  Wrench,
  ArrowRight,
  ArrowDown,
  User,
} from "lucide-react";
import { Footer } from "../components/Footer";

const SHLOKA = "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।";

const APPLY_FORM_URL = "https://forms.gle/DVyAgRjfLzgX99Wh6";

const TEAM = [
  {
    name: "Samir Nepal",
    role: "Founder, CEO",
    tenure: "2026 - Present",
    image: "/Team/samir-nepal.jpg",
  },
  {
    name: "Prasun Bhattarai",
    role: "Co-founder, CTO",
    tenure: "2026 - Present",
    image: "/Team/prasun.jpeg",
  },
];

const PROCESS_STEPS = [
  {
    icon: Video,
    title: "Virtual Meeting",
    description:
      "We start with a call to understand your goals, users and constraints.",
  },
  {
    icon: FileText,
    title: "Proposal Drafting",
    description:
      "You receive a clear scope, timeline and cost before any work begins.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Wireframes and polished interfaces shaped around real user journeys.",
  },
  {
    icon: Code2,
    title: "Develop",
    description:
      "Clean, tested code built in short iterations you can review as we go.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "We ship to production with monitoring, backups and a rollback plan.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Ongoing updates, fixes and improvements long after launch day.",
  },
];

const Typewriter: React.FC<{
  text: string;
  delay?: number;
  speed?: number;
}> = ({ text, delay = 600, speed = 110 }) => {
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
          done ? "animate-pulse" : ""
        }`}
        style={{ minHeight: "1em" }}
      />
    </span>
  );
};

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden shrink-0 select-none px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)",
        }}
      >
        <div className="relative z-10 w-full max-w-[1200px] text-center">
          <p className="font-kalam font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.5] tracking-wide">
            <Typewriter text={SHLOKA} />
          </p>
          <p className="mt-8 md:mt-10 text-white/60 text-xs sm:text-sm md:text-base font-light tracking-[0.25em] uppercase">
            Work accomplishes goals, not mere wishes
          </p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8, ease: "easeOut" }}
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
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-[560px] font-sans text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] sm:text-4xl md:text-[2.75rem]"
          >
            Modern Software Development Company
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
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
              We believe technology should not only work flawlessly but also
              feel personal, inspiring trust and confidence in every
              interaction. Over the years, we&apos;ve built lasting partnerships
              across diverse sectors, helping them reach wider audiences,
              enhance customer experiences and achieve measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#f0f4f1] px-6 pb-24 md:pb-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#24a556]/25 blur-[90px]" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#0b3d1f]/15 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#24a556]/20 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1080px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col rounded-[24px] border border-white/60 bg-white/40 p-7 shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] backdrop-blur-xl transition-all duration-500 hover:border-white/80 hover:bg-white/55 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/60 text-[#24a556] transition-colors duration-500 group-hover:bg-[#24a556] group-hover:text-white">
                      <Icon className="h-5 w-5 stroke-[1.6]" />
                    </span>
                    <span className="font-sans text-3xl font-bold leading-none text-[#0b3d1f]/20">
                      {String(index + 1).padStart(2, "0")}
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
                          endsRowSm ? "sm:hidden" : "sm:flex"
                        } ${endsRowLg ? "lg:hidden" : "lg:flex"} hidden`}
                      >
                        <ArrowRight className="h-5 w-5 stroke-[1.6]" />
                      </span>
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute top-full left-1/2 flex h-8 -translate-x-1/2 items-center justify-center text-[#24a556]/60 lg:h-12 ${
                          endsRowSm ? "sm:flex" : "sm:hidden"
                        } ${endsRowLg ? "lg:flex" : "lg:hidden"}`}
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

      <section className="w-full bg-[#f0f4f1] px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1080px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto w-full max-w-[720px] text-center"
          >
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#24a556]">
              Our Team
            </p>
            <h2 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] sm:text-4xl md:text-[3rem]">
              The team building the future
            </h2>
            <p className="mx-auto mt-6 max-w-[520px] text-sm leading-relaxed text-[#1b1f22]/70 md:text-base">
              We are a team of builders, focused on building for the world, one
              step at a time. We are not afraid to take risks and bet on
              ourselves.
            </p>
            <a
              href={APPLY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-[#24a556] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#24a556]/25 transition-all duration-300 hover:bg-emerald-600"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-4 w-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-24 font-sans text-2xl font-bold tracking-tight text-[#0b3d1f] sm:text-3xl md:mt-32 md:text-[2.25rem]"
          >
            Sigmoit Hall of Fame
          </motion.h3>

          <ul className="mx-auto mt-12 grid w-full max-w-[720px] grid-cols-1 gap-10 sm:grid-cols-2 md:mt-16 md:gap-x-12">
            {TEAM.map((member, index) => (
              <motion.li
                key={member.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className={`group relative ${index % 2 === 1 ? "sm:mt-16" : ""}`}
              >
                <div className="relative aspect-[5/6] w-full overflow-hidden bg-[#dfe8e2]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-16 w-16 stroke-[1.2] text-[#0b3d1f]/25" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#021106]/85 via-[#021106]/35 to-transparent" />

                  <div className="absolute bottom-4 left-6 right-6 z-10 md:bottom-6">
                    <p className="font-sans text-base font-bold leading-tight text-white md:text-lg">
                      {member.name}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-white/70 md:text-xs">
                      {member.tenure} ({member.role})
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

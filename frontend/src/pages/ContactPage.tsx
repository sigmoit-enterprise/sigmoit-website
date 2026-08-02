import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, AtSign, Phone, Clock, Send } from "lucide-react";
import { Footer } from "../components/Footer";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
} from "../components/BrandIcons";
import { inquiriesApi } from "../admin/lib/api";
import { errorMessage } from "../admin/lib/useAsync";

const EMAIL = "thesigmoit@gmail.com";
const PHONE_NUMBER = "+9779822389427";
const PHONE_DISPLAY = "+977 982-2389427";
const WHATSAPP_LINK = "https://wa.me/9779822389427";

const CHANNELS = [
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: WHATSAPP_LINK,
    external: true,
  },
  {
    Icon: Phone,
    label: "Call us",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_NUMBER}`,
    external: false,
  },
  {
    Icon: AtSign,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    Icon: MapPin,
    label: "Office",
    value: "Damak-8, Jhapa, Nepal",
    href: null,
    external: false,
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61581744933809",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thesigmoit/",
    Icon: InstagramIcon,
  },
];

const SERVICES = [
  "Web Development",
  "Mobile App",
  "Digital Marketing",
  "Cloud & DevOps",
  "UI/UX Design",
  "Something else",
];

const inputClass =
  "w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm text-[#0b3d1f] placeholder-[#1b1f22]/40 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#24a556]/70 focus:bg-white/70 focus:ring-2 focus:ring-[#24a556]/20";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, []);

  const summary = `Hi SigmoIT, I'm ${name}.\n\nService: ${service}\nEmail: ${email}\nPhone: ${number}\n\n${message}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await inquiriesApi.submitPublic({
        businessName: company.trim() || name.trim(),
        contactPersonName: name.trim(),
        contact1: number.trim(),
        email1: email.trim(),
        businessType: service,
        description: message.trim(),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setNumber("");
      setCompany("");
      setMessage("");
    } catch (err) {
      setSubmitError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden shrink-0 px-6 select-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#24a556]/25 blur-[100px]" />
          <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-white/5 blur-[110px]" />
        </div>

        {/* Line Art Centered (offset up) */}
        <div className="relative z-10 flex-1 flex items-center justify-center -mt-24 md:-mt-32">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/line-art/contact.png"
            alt=""
            className="w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] object-contain brightness-0 invert"
          />
        </div>

        {/* Contact Title at Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 -mt-8 pb-16 md:mt-0 md:pb-20"
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-light tracking-[0.2em] uppercase text-white/50 mb-3">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Contact</span>
          </nav>

          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
            Contact
          </h1>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#f0f4f1] px-6 py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#24a556]/25 blur-[90px]" />
          <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-[#0b3d1f]/15 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#24a556]/20 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1080px] grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {CHANNELS.map(({ Icon, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/60 text-[#24a556] transition-colors duration-500 group-hover:bg-[#24a556] group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1b1f22]/45">
                      {label}
                    </span>
                    <span className="mt-1 block break-words text-sm font-semibold text-[#0b3d1f]">
                      {value}
                    </span>
                  </span>
                </>
              );

              const cardClass =
                "group flex items-center gap-4 rounded-[20px] border border-white/60 bg-white/40 p-5 shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] backdrop-blur-xl transition-all duration-500 hover:border-white/80 hover:bg-white/55 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]";

              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className={cardClass}>
                  {inner}
                </div>
              );
            })}

            <div className="rounded-[20px] border border-white/60 bg-white/40 p-5 shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] backdrop-blur-xl">
              <div className="flex items-center gap-3 text-[#0b3d1f]">
                <Clock className="h-[18px] w-[18px] text-[#24a556]" />
                <span className="text-sm font-semibold">Sun – Fri, 9am – 6pm</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#24a556]/30 text-[#24a556] transition-all duration-300 hover:border-[#24a556] hover:bg-[#24a556] hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-3 rounded-[28px] border border-white/60 bg-white/40 p-7 shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] backdrop-blur-xl md:p-10"
          >
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#24a556]">
              Start a project
            </p>
            <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight text-[#0b3d1f] md:text-3xl">
              Tell us about it
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  Your name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Samir Nepal"
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="+977 98XXXXXXXX"
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  Company <span className="normal-case tracking-normal opacity-60">(optional)</span>
                </span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Pvt. Ltd."
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  What do you need?
                </span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputClass}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 sm:col-span-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1f22]/50">
                  Project details
                </span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A few lines about your goals, timeline and budget."
                  className={`${inputClass} resize-none`}
                />
              </label>
            </div>

            {submitted && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#24a556]/30 bg-[#24a556]/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#24a556]" />
                <div>
                  <p className="text-sm font-bold text-[#0b3d1f]">
                    Enquiry sent successfully!
                  </p>
                  <p className="mt-0.5 text-sm text-[#1b1f22]/60">
                    Thank you for reaching out — our team will get back to you within one
                    business day.
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm font-medium text-rose-700"
              >
                {submitError}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#24a556] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#24a556]/25 transition-all duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span>{submitting ? "Sending..." : "Send Enquiry"}</span>
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(summary)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#24a556]/40 bg-white/40 px-8 py-3.5 text-sm font-bold tracking-wide text-[#24a556] backdrop-blur-md transition-all duration-300 hover:border-[#24a556] hover:bg-[#24a556] hover:text-white sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Send on WhatsApp</span>
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#1b1f22]/50">
              Your enquiry is saved securely and reviewed by our team — you can also
              send it directly via WhatsApp using the button above.
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AtSign, Phone } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { SigmoMark } from './SigmoMark';

const EMAIL = 'thesigmoit@gmail.com';
const PHONE_NUMBER = '+9779822389427';
const PHONE_DISPLAY = '+977 982-2389427';
const WHATSAPP_LINK = 'https://wa.me/9779822389427';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61581744933809',
    Icon: FacebookIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thesigmoit/',
    Icon: InstagramIcon,
  },
  { label: 'WhatsApp', href: WHATSAPP_LINK, Icon: WhatsAppIcon },
];

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#f4faf6] border-t border-gray-200/40 rounded-t-[3rem] md:rounded-t-[5rem] relative overflow-hidden select-none">
      
      {/* Giant Watermarked Mark in the background */}
      <div
        aria-hidden="true"
        className="absolute -left-16 md:-left-10 top-1/2 -translate-y-1/2 pointer-events-none z-0"
      >
        <SigmoMark className="w-[320px] md:w-[480px] h-auto text-sigmo-green opacity-[0.06]" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid: Links & Corporate Branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-gray-200/60">
          
          {/* Logo & Tagline Column (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col justify-start gap-6">
            <Link to="/" className="inline-flex items-center gap-4 group w-fit">
              <SigmoMark className="h-11 md:h-12 w-auto text-sigmo-green transition-transform duration-300 group-hover:scale-105" />
              <span className="font-rajdhani text-3xl md:text-4xl font-bold tracking-tight text-sigmo-dark leading-none">
                Sigmo<span className="text-sigmo-green">IT</span>
              </span>
            </Link>

            <div className="flex items-center gap-3 font-sans text-xs md:text-sm text-gray-500 font-semibold tracking-wide">
              <span>Innovation.</span>
              <span className="w-1 h-1 rounded-full bg-sigmo-green" />
              <span>Technology.</span>
              <span className="w-1 h-1 rounded-full bg-sigmo-green" />
              <span>People.</span>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-sigmo-green/30 text-sigmo-green flex items-center justify-center hover:bg-sigmo-green hover:border-sigmo-green hover:text-white transition-all duration-300"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Column */}
          <nav aria-labelledby="footer-company" className="flex flex-col gap-4">
            <h2
              id="footer-company"
              className="font-rajdhani text-lg font-bold text-sigmo-green"
            >
              Company
            </h2>
            {/* Deep links into cornerstone content — these carry internal link
                equity to the pages we most want ranking. */}
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <li>
                <Link to="/services" className="hover:text-sigmo-green transition-colors duration-300">
                  What we do
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sigmo-green transition-colors duration-300">
                  How we work
                </Link>
              </li>
              <li>
                <Link to="/blog/website-cost-in-nepal" className="hover:text-sigmo-green transition-colors duration-300">
                  Website pricing in Nepal
                </Link>
              </li>
              <li>
                <Link to="/blog/hire-offshore-developers-nepal" className="hover:text-sigmo-green transition-colors duration-300">
                  Hire a dedicated team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sitemap Links Column */}
          <nav aria-labelledby="footer-sitemap" className="flex flex-col gap-4">
            <h2
              id="footer-sitemap"
              className="font-rajdhani text-lg font-bold text-sigmo-green"
            >
              Sitemap
            </h2>
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <li>
                <Link to="/" className="hover:text-sigmo-green transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sigmo-green transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sigmo-green transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-sigmo-green transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-sigmo-green transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sigmo-green transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Get Started Contact Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-rajdhani text-lg font-bold text-sigmo-green">
              Get started
            </h2>
            {/* Marked up as an hCard-ish address block: the NAP here must match
                siteConfig and the Google Business Profile character for character. */}
            <ul className="flex flex-col gap-3.5 text-sm font-medium text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sigmo-green" aria-hidden="true" />
                <address className="select-text not-italic leading-snug">
                  Damak-8, Jhapa, Nepal
                </address>
              </li>
              <li className="flex items-start gap-3">
                <AtSign className="w-4 h-4 mt-0.5 shrink-0 text-sigmo-green" aria-hidden="true" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-sigmo-green transition-colors duration-300 select-text break-all"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-sigmo-green" aria-hidden="true" />
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="hover:text-sigmo-green transition-colors duration-300 select-text"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="w-4 h-4 mt-0.5 shrink-0 text-sigmo-green" aria-hidden="true" />
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sigmo-green transition-colors duration-300 select-text"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer: Copyrights & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4 text-xs font-semibold text-gray-400 tracking-wider">
          {/* Year is baked in at prerender time; suppress the warning for the
              edge case where a visitor loads the page after New Year. */}
          <div className="select-text" suppressHydrationWarning>
            © {new Date().getFullYear()} SigmoIT. All rights reserved.
          </div>
          <div className="select-text uppercase tracking-widest text-[10px]">
            Your trusted software development partner.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

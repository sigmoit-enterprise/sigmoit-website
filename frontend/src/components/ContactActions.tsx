import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

const PHONE_NUMBER = '+9779822389427';
const WHATSAPP_LINK = 'https://wa.me/9779822389427';

export const ContactActions: React.FC = () => {
  return (
    <section className="w-full bg-white border-t border-gray-100 py-20 md:py-24 px-6 select-none">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-rajdhani font-bold text-sigmo-dark select-text">
          Ready to turn your ideas into <span className="text-sigmo-green">reality?</span>
        </h2>

        <p className="mt-4 text-gray-500 font-light text-sm sm:text-base select-text">
          Start your digital journey with us — reach out and we&apos;ll reply right away.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-sigmo-green hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-sigmo-green/20 transition-all duration-300"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>WhatsApp Now</span>
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg border border-sigmo-green text-sigmo-green hover:bg-sigmo-green hover:text-white font-bold text-sm tracking-wide transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>Call Us</span>
          </a>
        </div>

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mt-6 text-sm font-medium text-gray-400 hover:text-sigmo-green transition-colors duration-300 select-text"
        >
          {PHONE_NUMBER}
        </a>
      </div>
    </section>
  );
};

export default ContactActions;

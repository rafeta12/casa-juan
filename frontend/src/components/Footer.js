import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="bg-[#1A1A1A] text-[#F9F6F0]"
      data-testid="footer"
    >
      {/* CTA Section */}
      <div className="py-16 md:py-24 text-center border-b border-[#333]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            {t('footer.cta')}
          </h2>
          <p className="text-xl md:text-2xl text-[#F9F6F0]/70 mb-8">
            {t('footer.ctaSubtitle')}
          </p>
          <button
            onClick={() => scrollToSection('reservation')}
            className="bg-[#C05A46] hover:bg-[#A34A38] text-white px-10 py-4 text-lg font-medium transition-colors"
            data-testid="footer-cta"
          >
            {t('nav.reserve')}
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img 
                src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/t05fono0_image.png"
                alt="Casa Juan"
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="flex justify-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection('menu')}
                className="text-[#F9F6F0]/70 hover:text-[#C05A46] transition-colors"
              >
                {t('nav.menu')}
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="text-[#F9F6F0]/70 hover:text-[#C05A46] transition-colors"
              >
                {t('nav.reservations')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#F9F6F0]/70 hover:text-[#C05A46] transition-colors"
              >
                {t('nav.contact')}
              </button>
            </nav>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-[#F9F6F0]/50">
              © {new Date().getFullYear()} Casa Juan. {t('footer.rights')}.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

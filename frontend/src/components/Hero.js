import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1724279840151-be7bc472bc4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwZm9vZCUyMGRpbmluZ3xlbnwwfHx8fDE3NzQ4MzQ0ODh8MA&ixlib=rb-4.1.0&q=85)'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#C05A46] mb-6 animate-fade-in-up">
          Rest. Casa Juan
        </span>
        
        <h1 
          className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-none mb-6 animate-fade-in-up animate-delay-100"
          data-testid="hero-title"
        >
          {t('hero.title')}
        </h1>
        
        <p className="text-lg md:text-xl text-[#F9F6F0]/90 max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          <button
            onClick={() => scrollToSection('reservation')}
            className="bg-[#C05A46] hover:bg-[#A34A38] text-white px-8 py-4 text-sm font-medium tracking-wide transition-all hover:scale-105"
            data-testid="hero-cta"
          >
            {t('hero.cta')}
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="border border-white/50 hover:border-white text-white px-8 py-4 text-sm font-medium tracking-wide transition-all hover:bg-white/10"
            data-testid="hero-cta-secondary"
          >
            {t('hero.ctaSecondary')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

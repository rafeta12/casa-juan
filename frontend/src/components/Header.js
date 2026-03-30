import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: '#1A1A1A' }}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/zvo7wsms_image.png"
              alt="Casa Juan"
              className="h-10 md:h-14 w-auto"
              data-testid="logo"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-sm tracking-wide"
              data-testid="nav-menu"
            >
              {t('nav.menu')}
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-sm tracking-wide"
              data-testid="nav-reservations"
            >
              {t('nav.reservations')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-sm tracking-wide"
              data-testid="nav-about"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-sm tracking-wide"
              data-testid="nav-contact"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Right side: Language + CTA */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger 
                className="w-[70px] bg-transparent border-[#59554F] text-[#F9F6F0] focus:ring-[#C05A46] h-9"
                data-testid="lang-selector"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#59554F]">
                <SelectItem value="es" className="text-[#F9F6F0] focus:bg-[#C05A46]">ES</SelectItem>
                <SelectItem value="en" className="text-[#F9F6F0] focus:bg-[#C05A46]">EN</SelectItem>
                <SelectItem value="de" className="text-[#F9F6F0] focus:bg-[#C05A46]">DE</SelectItem>
              </SelectContent>
            </Select>

            {/* CTA Button - Desktop */}
            <button
              onClick={() => scrollToSection('reservation')}
              className="hidden md:block bg-[#C05A46] hover:bg-[#A34A38] text-white px-5 py-2 text-sm font-medium transition-colors"
              data-testid="reserve-button-header"
            >
              {t('nav.reserve')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#F9F6F0] p-2"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#59554F]">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-left py-2"
              >
                {t('nav.menu')}
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-left py-2"
              >
                {t('nav.reservations')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-left py-2"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#F9F6F0] hover:text-[#C05A46] transition-colors text-left py-2"
              >
                {t('nav.contact')}
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="bg-[#C05A46] hover:bg-[#A34A38] text-white px-5 py-3 text-sm font-medium transition-colors w-full mt-2"
              >
                {t('nav.reserve')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

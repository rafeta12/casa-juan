import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone } from 'lucide-react';

const ReservationSection = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="reservation"
      className="py-16 md:py-24 bg-[#F9F6F0]"
      data-testid="reservation-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/5d915sh5_image.png"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Call to Action */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#C05A46] mb-4">
              {t('reservation.title')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C2A26] tracking-tight mb-6">
              {t('reservation.subtitle')}
            </h2>
            <p className="text-[#59554F] text-lg mb-8 max-w-md mx-auto lg:mx-0">
              {t('reservation.callText')}
            </p>
            
            {/* Call Button */}
            <a
              href="tel:+34922781635"
              className="inline-flex items-center gap-3 bg-[#C05A46] hover:bg-[#A34A38] text-white px-10 py-5 text-xl font-medium transition-all hover:scale-105"
              data-testid="call-reserve-btn"
            >
              <Phone className="w-6 h-6" strokeWidth={2} />
              <span>922 78 16 35</span>
            </a>
            
            <p className="text-[#59554F] text-sm mt-6">
              {t('reservation.hoursNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;

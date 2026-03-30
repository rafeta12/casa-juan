import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

const WhySection = () => {
  const { t } = useLanguage();

  const reasons = [
    t('why.item1'),
    t('why.item2'),
    t('why.item3'),
    t('why.item4'),
    t('why.item5')
  ];

  return (
    <section 
      id="about"
      className="py-16 md:py-24 bg-[#F2EDE4]"
      data-testid="why-section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#C05A46] mb-4">
              Casa Juan
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C2A26] tracking-tight mb-8">
              {t('why.title')}
            </h2>
            
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-3"
                  data-testid={`why-item-${index}`}
                >
                  <span className="w-6 h-6 bg-[#7A8B76] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </span>
                  <span className="text-[#2C2A26]">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3633990/pexels-photo-3633990.jpeg"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden mt-8">
              <img 
                src="https://images.pexels.com/photos/2992882/pexels-photo-2992882.jpeg"
                alt="Spanish food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;

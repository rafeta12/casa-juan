import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, Users, Euro } from 'lucide-react';

const StatsRibbon = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Star className="w-6 h-6 text-[#7A8B76]" strokeWidth={1.5} />,
      value: "4.7",
      label: t('stats.rating'),
      suffix: <Star className="w-4 h-4 text-[#7A8B76] fill-[#7A8B76] inline ml-1" strokeWidth={0} />
    },
    {
      icon: <Users className="w-6 h-6 text-[#7A8B76]" strokeWidth={1.5} />,
      value: "1900+",
      label: t('stats.reviews')
    },
    {
      icon: <Euro className="w-6 h-6 text-[#7A8B76]" strokeWidth={1.5} />,
      value: "10-20",
      label: t('stats.price'),
      prefix: "€"
    }
  ];

  return (
    <section 
      className="bg-[#F2EDE4] py-12 md:py-16"
      data-testid="stats-section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-[#2C2A26]">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-[#59554F] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRibbon;

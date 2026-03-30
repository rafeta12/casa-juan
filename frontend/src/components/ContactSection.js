import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Clock } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="contact"
      className="py-16 md:py-24 bg-[#F2EDE4]"
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C2A26] tracking-tight">
            {t('contact.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[350px] overflow-hidden border border-[#E5DFD3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3517.0123456789!2d-16.7265!3d28.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a9f8e7d6c5b4a3%3A0x1234567890abcdef!2sAv.%20Viera%20y%20Clavijo%2C%2012%2C%20Adeje%2C%20Santa%20Cruz%20de%20Tenerife!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Casa Juan Location"
              data-testid="google-map"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8 p-6 lg:p-8 bg-[#F9F6F0] border border-[#E5DFD3]">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C05A46]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#C05A46]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-[#2C2A26] mb-1">{t('contact.address')}</h3>
                <p className="text-[#59554F]">
                  Av. Viera y Clavijo, 12<br />
                  38670 Adeje, Santa Cruz de Tenerife
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C05A46]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#C05A46]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-[#2C2A26] mb-1">{t('contact.phone')}</h3>
                <a 
                  href="tel:+34922781635"
                  className="text-[#C05A46] hover:text-[#A34A38] text-lg transition-colors"
                  data-testid="phone-link"
                >
                  922 78 16 35
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C05A46]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#C05A46]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-[#2C2A26] mb-1">{t('contact.hours')}</h3>
                <p className="text-[#59554F]">
                  {t('contact.hoursValue')}
                </p>
                <p className="text-[#C05A46] text-sm font-medium mt-1">
                  {t('contact.closed')}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="tel:+34922781635"
                className="inline-flex items-center gap-2 bg-[#C05A46] hover:bg-[#A34A38] text-white px-8 py-4 font-medium transition-colors"
                data-testid="call-now-btn"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                <span>922 78 16 35</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

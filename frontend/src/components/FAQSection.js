import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') }
  ];

  return (
    <section 
      className="py-16 md:py-24 bg-[#F9F6F0]"
      data-testid="faq-section"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-[#2C2A26] tracking-tight">
            {t('faq.title')}
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-[#F2EDE4] border border-[#E5DFD3] px-6"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left text-[#2C2A26] hover:text-[#C05A46] py-5 hover:no-underline">
                <span className="font-medium">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#59554F] pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

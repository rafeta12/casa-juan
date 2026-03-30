import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuSection = () => {
  const { language, t } = useLanguage();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('panes');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API}/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const categories = [
    { id: 'panes', label: t('menu.panes') },
    { id: 'entrantes', label: t('menu.entrantes') },
    { id: 'ensaladas', label: t('menu.ensaladas') },
    { id: 'carnes', label: t('menu.carnes') },
    { id: 'pescados', label: t('menu.pescados') },
    { id: 'papas', label: t('menu.papas') },
    { id: 'postres', label: t('menu.postres') }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return '—';
    return `${price.toFixed(2)}€`;
  };

  return (
    <section 
      id="menu"
      className="py-16 md:py-24 bg-[#F9F6F0]"
      data-testid="menu-section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#C05A46] mb-4">
            {t('menu.title')}
          </span>
          <h2 
            className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C2A26] tracking-tight"
            data-testid="menu-title"
          >
            {t('menu.subtitle')}
          </h2>
        </div>

        {/* Category Tabs - Scrollable on mobile */}
        <div className="flex justify-start md:justify-center gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === category.id
                  ? 'bg-[#C05A46] text-white'
                  : 'bg-[#F2EDE4] text-[#59554F] hover:bg-[#E5DFD3]'
              }`}
              data-testid={`menu-tab-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Table */}
        <div className="bg-[#F2EDE4] border border-[#E5DFD3]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-[#E5DFD3] bg-[#1A1A1A] text-[#F9F6F0]">
            <div className="col-span-8 text-sm font-medium">
              {categories.find(c => c.id === activeCategory)?.label}
            </div>
            <div className="col-span-2 text-sm font-medium text-center">
              {t('menu.halfPortion')}
            </div>
            <div className="col-span-2 text-sm font-medium text-center">
              {t('menu.fullPortion')}
            </div>
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-[#E5DFD3]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-[#F9F6F0] transition-colors"
                data-testid={`menu-item-${item.id}`}
              >
                <div className="col-span-8">
                  <span className="text-[#2C2A26] text-sm md:text-base">
                    {item.name[language]}
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-[#59554F] text-sm md:text-base">
                    {formatPrice(item.half)}
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-[#C05A46] font-medium text-sm md:text-base">
                    {formatPrice(item.full)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Interior Images */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/wlyqzsih_image.png"
              alt="Terraza Casa Juan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/5d915sh5_image.png"
              alt="Interior Casa Juan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

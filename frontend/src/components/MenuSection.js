import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuSection = () => {
  const { language, t } = useLanguage();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('starters');

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
    { id: 'starters', label: t('menu.starters') },
    { id: 'mains', label: t('menu.mains') },
    { id: 'desserts', label: t('menu.desserts') }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section 
      id="menu"
      className="py-16 md:py-24 bg-[#F9F6F0]"
      data-testid="menu-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm font-medium transition-all ${
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

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group flex gap-4 p-4 md:p-6 bg-[#F2EDE4] border border-[#E5DFD3] hover:border-[#C05A46] transition-all"
              data-testid={`menu-item-${item.id}`}
            >
              {item.image && (
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl font-medium text-[#2C2A26]">
                    {item.name[language]}
                  </h3>
                  <span className="text-[#C05A46] font-medium whitespace-nowrap">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-[#59554F] mt-1 leading-relaxed">
                  {item.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Images Bento - Restaurant Interior */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
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

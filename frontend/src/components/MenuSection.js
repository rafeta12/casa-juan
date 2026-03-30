import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// ── DATOS DEL MENÚ ──────────────────────────────────────────────────────────
// Edita aquí los platos directamente, sin necesidad de backend.
const MENU_DATA = [
  // PANES
  { id: 1, category: 'panes', name: { es: 'Pan de la casa', en: 'House bread' }, half: null, full: 0.80 },
  { id: 2, category: 'panes', name: { es: 'Pan con ajo', en: 'Garlic bread' }, half: 1.80, full: 2.50 },
  { id: 3, category: 'panes', name: { es: 'Pan Catalana (tomate, ajo, aceite de oliva)', en: 'Catalan bread (tomato, garlic, olive oil)' }, half: 1.80, full: 2.50 },
  { id: 4, category: 'panes', name: { es: 'Pan, tomate, jamón ibérico Badajoz', en: 'Bread, tomato, Badajoz Iberian ham' }, half: 3.50, full: 6.00 },
  { id: 5, category: 'panes', name: { es: 'Pan con tomate y manchego curado', en: 'Bread with tomato and cured manchego' }, half: 3.50, full: 6.00 },
  { id: 6, category: 'panes', name: { es: 'Pan con tomate, manchego e ibérico', en: 'Bread with tomato, manchego and Iberian' }, half: 4.00, full: 7.00 },

  // ENTRANTES — añade tus platos aquí
  { id: 10, category: 'entrantes', name: { es: 'Croquetas caseras', en: 'Homemade croquettes' }, half: 4.00, full: 7.50 },
  { id: 11, category: 'entrantes', name: { es: 'Jamón ibérico', en: 'Iberian ham' }, half: 8.00, full: 15.00 },
  { id: 12, category: 'entrantes', name: { es: 'Queso manchego', en: 'Manchego cheese' }, half: 5.00, full: 9.00 },

  // ENSALADAS
  { id: 20, category: 'ensaladas', name: { es: 'Ensalada mixta', en: 'Mixed salad' }, half: 4.00, full: 7.00 },
  { id: 21, category: 'ensaladas', name: { es: 'Ensalada de la casa', en: 'House salad' }, half: 4.50, full: 8.00 },

  // CARNES
  { id: 30, category: 'carnes', name: { es: 'Solomillo a la plancha', en: 'Grilled sirloin' }, half: null, full: 18.00 },
  { id: 31, category: 'carnes', name: { es: 'Chuletas de cordero', en: 'Lamb chops' }, half: null, full: 16.00 },

  // PESCADOS
  { id: 40, category: 'pescados', name: { es: 'Dorada a la sal', en: 'Salt-baked sea bream' }, half: null, full: 16.00 },
  { id: 41, category: 'pescados', name: { es: 'Bacalao al pil-pil', en: 'Cod pil-pil' }, half: null, full: 15.00 },

  // PAPAS
  { id: 50, category: 'papas', name: { es: 'Papas arrugadas con mojo', en: 'Wrinkled potatoes with mojo' }, half: 3.50, full: 6.00 },
  { id: 51, category: 'papas', name: { es: 'Papas fritas', en: 'French fries' }, half: 2.50, full: 4.50 },

  // POSTRES
  { id: 60, category: 'postres', name: { es: 'Flan casero', en: 'Homemade flan' }, half: null, full: 4.00 },
  { id: 61, category: 'postres', name: { es: 'Tarta de queso', en: 'Cheesecake' }, half: null, full: 4.50 },
];
// ────────────────────────────────────────────────────────────────────────────

const MenuSection = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('panes');

  const categories = [
    { id: 'panes',    label: t('menu.panes') },
    { id: 'entrantes', label: t('menu.entrantes') },
    { id: 'ensaladas', label: t('menu.ensaladas') },
    { id: 'carnes',   label: t('menu.carnes') },
    { id: 'pescados', label: t('menu.pescados') },
    { id: 'papas',    label: t('menu.papas') },
    { id: 'postres',  label: t('menu.postres') },
  ];

  const filteredItems = MENU_DATA.filter(item => item.category === activeCategory);

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

        {/* Category Tabs */}
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

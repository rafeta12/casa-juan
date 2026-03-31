import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// ── DATOS DEL MENÚ ──────────────────────────────────────────────────────────
// Edita aquí los platos directamente, sin necesidad de backend.
 const MENU_DATA = [
  // PANES
  { id: 1, category: 'panes', name: { es: 'Pan de la casa', en: 'House bread' }, half: null, full: 0.80 },
  { id: 2, category: 'panes', name: { es: 'Pan con ajo', en: 'Garlic bread' }, half: 1.80, full: 2.50 },
  { id: 3, category: 'panes', name: { es: 'Pan Catalana (tomate, ajo, aceite de oliva)', en: 'Catalan bread (tomato, garlic, olive oil)' }, half: 1.80, full: 2.50 },
  { id: 4, category: 'panes', name: { es: 'Pan, tomate, jamón ibérico Badajoz', en: 'Bread, tomato, Iberian ham Badajoz' }, half: 3.50, full: 6.00 },
  { id: 5, category: 'panes', name: { es: 'Pan con tomate y manchego curado', en: 'Bread with tomato and cured manchego' }, half: 3.50, full: 6.00 },
  { id: 6, category: 'panes', name: { es: 'Pan con tomate, manchego e ibérico', en: 'Bread with tomato, manchego and Iberian' }, half: 4.00, full: 7.00 },

  // ENTRANTES
  { id: 10, category: 'entrantes', name: { es: 'Ensaladilla rusa', en: 'Russian salad' }, half: 4.00, full: 6.00 },
  { id: 11, category: 'entrantes', name: { es: 'Queso blanco de Guía de Isora', en: 'White cheese from Guía de Isora' }, half: 5.00, full: 8.00 },
  { id: 12, category: 'entrantes', name: { es: 'Queso manchego curado', en: 'Cured manchego cheese' }, half: 7.00, full: 10.50 },
  { id: 13, category: 'entrantes', name: { es: 'Queso blanco a la plancha con mojos o arándanos', en: 'Grilled white cheese with mojo or blueberries' }, half: null, full: 9.50 },
  { id: 14, category: 'entrantes', name: { es: 'Croquetas mixtas (pollo, bonito, jamón, espinaca)', en: 'Mixed croquettes (chicken, tuna, ham, spinach)' }, half: 5.00, full: 7.00 },
  { id: 15, category: 'entrantes', name: { es: 'Champiñones empanados rellenos de almogrote', en: 'Breaded mushrooms stuffed with almogrote' }, half: 6.00, full: 9.00 },
  { id: 16, category: 'entrantes', name: { es: 'Gambas al ajillo', en: 'Garlic prawns' }, half: null, full: 9.90 },
  { id: 17, category: 'entrantes', name: { es: 'Tabla de jamón ibérico con tostas con tomate', en: 'Iberian ham board with tomato toasts' }, half: 12.50, full: 18.00 },
  { id: 18, category: 'entrantes', name: { es: 'Pimientos de Padrón', en: 'Padrón peppers' }, half: 5.00, full: 8.00 },
  { id: 19, category: 'entrantes', name: { es: 'Caracoles', en: 'Snails' }, half: 7.00, full: 11.00 },

  // ENSALADAS
  { id: 20, category: 'ensaladas', name: { es: 'Ensalada mixta', en: 'Mixed salad' }, half: null, full: 6.00 },
  { id: 21, category: 'ensaladas', name: { es: 'Ensalada de atún', en: 'Tuna salad' }, half: null, full: 7.00 },
  { id: 22, category: 'ensaladas', name: { es: 'Ensalada de la casa', en: 'House salad' }, half: null, full: 8.50 },

  // CARNES
  { id: 30, category: 'carnes', name: { es: 'Entrecot añojo', en: 'Yearling entrecote' }, half: null, full: 15.00 },
  { id: 31, category: 'carnes', name: { es: 'Carne fiesta', en: 'Fiesta meat' }, half: null, full: 11.90 },
  { id: 32, category: 'carnes', name: { es: 'Ternera en salsa', en: 'Beef in sauce' }, half: 8.50, full: 13.00 },
  { id: 33, category: 'carnes', name: { es: 'Albóndigas con papas fritas', en: 'Meatballs with fries' }, half: 6.00, full: 9.90 },
  { id: 34, category: 'carnes', name: { es: 'Pechuga de pollo empanada (ensalada y papas fritas)', en: 'Breaded chicken breast (salad and fries)' }, half: null, full: 9.90 },
  { id: 35, category: 'carnes', name: { es: 'Alitas de pollo con papas fritas', en: 'Chicken wings with fries' }, half: 5.00, full: 8.00 },
  { id: 36, category: 'carnes', name: { es: 'Salchichas con papas fritas', en: 'Sausages with fries' }, half: 5.00, full: 8.00 },
  { id: 37, category: 'carnes', name: { es: 'Lingote de vaca madurada (220 gramos)', en: 'Aged beef ingot (220 grams)' }, half: null, full: 17.00 },

  // PESCADOS
  { id: 40, category: 'pescados', name: { es: 'Pulpo a la gallega', en: 'Galician-style octopus' }, half: 13.00, full: 19.00 },
  { id: 41, category: 'pescados', name: { es: 'Pulpo a la canaria', en: 'Canarian-style octopus' }, half: 13.00, full: 19.00 },
  { id: 42, category: 'pescados', name: { es: 'Chopitos fritos', en: 'Fried baby squid' }, half: 6.50, full: 9.90 },
  { id: 43, category: 'pescados', name: { es: 'Calamares a la andaluza', en: 'Andalusian-style squid' }, half: 7.00, full: 12.00 },
  { id: 44, category: 'pescados', name: { es: 'Chipirones a la plancha', en: 'Grilled baby squid' }, half: 7.00, full: 12.00 },
  { id: 45, category: 'pescados', name: { es: 'Chocos a la plancha con papas arrugadas y ensalada', en: 'Grilled cuttlefish with wrinkled potatoes and salad' }, half: 8.00, full: 13.00 },
  { id: 46, category: 'pescados', name: { es: 'Atún a la plancha con papas arrugadas y ensalada', en: 'Grilled tuna with wrinkled potatoes and salad' }, half: 7.50, full: 10.50 },
  { id: 47, category: 'pescados', name: { es: 'Bacalao a la portuguesa', en: 'Portuguese-style cod' }, half: 9.90, full: 17.00 },
  { id: 48, category: 'pescados', name: { es: 'Pescado a la espalda', en: 'Butterflied grilled fish' }, half: null, full: 14.50 },
  { id: 49, category: 'pescados', name: { es: 'Parrilla de pescado y mariscos (mín. 2 pers.)', en: 'Fish and seafood grill (min. 2 people)' }, half: null, full: 42.00 },
  { id: 50, category: 'pescados', name: { es: 'Fritura de pescado y mariscos (mín. 2 pers.)', en: 'Fried fish and seafood (min. 2 people)' }, half: null, full: 44.00 },
  { id: 51, category: 'pescados', name: { es: 'Zamburiñas a la plancha', en: 'Grilled scallops' }, half: 9.90, full: 18.00 },
  { id: 52, category: 'pescados', name: { es: 'Navajas a la plancha', en: 'Grilled razor clams' }, half: 6.00, full: 9.90 },
  { id: 53, category: 'pescados', name: { es: 'Langostinos a la plancha', en: 'Grilled king prawns' }, half: 6.00, full: 10.90 },
  { id: 54, category: 'pescados', name: { es: 'Gambón a la plancha', en: 'Grilled large prawn' }, half: null, full: 2.00 },

  // PAPAS
  { id: 60, category: 'papas', name: { es: 'Papas fritas', en: 'French fries' }, half: 2.50, full: 4.00 },
  { id: 61, category: 'papas', name: { es: 'Papas arrugadas', en: 'Wrinkled potatoes' }, half: 2.50, full: 4.00 },
  { id: 62, category: 'papas', name: { es: 'Huevos rotos con papas fritas', en: 'Broken eggs with fries' }, half: null, full: 8.00 },

  // POSTRES
  { id: 70, category: 'postres', name: { es: 'Quesillo', en: 'Quesillo' }, half: null, full: 4.00 },
  { id: 71, category: 'postres', name: { es: 'Tiramisú', en: 'Tiramisu' }, half: null, full: 4.50 },
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

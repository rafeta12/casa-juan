import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// ── DATOS DEL MENÚ ──────────────────────────────────────────────────────────
// Edita aquí los platos directamente, sin necesidad de backend.
const MENU_DATA = [
  // PANES
  { id: 1, category: 'panes', name: { es: 'Pan de la casa', en: 'House bread', de: 'Hausbrot', pt: 'Pão da casa', it: 'Pane della casa', pl: 'Chleb domowy', ru: 'Домашний хлеб' }, half: null, full: 0.80 },
  { id: 2, category: 'panes', name: { es: 'Pan con ajo', en: 'Garlic bread', de: 'Knoblauchbrot', pt: 'Pão com alho', it: 'Pane all\'aglio', pl: 'Chleb czosnkowy', ru: 'Чесночный хлеб' }, half: 1.80, full: 2.50 },
  { id: 3, category: 'panes', name: { es: 'Pan Catalana (tomate, ajo, aceite de oliva)', en: 'Catalan bread (tomato, garlic, olive oil)', de: 'Katalanisches Brot (Tomate, Knoblauch, Olivenöl)', pt: 'Pão catalão (tomate, alho, azeite)', it: 'Pane catalano (pomodoro, aglio, olio d\'oliva)', pl: 'Chleb kataloński (pomidor, czosnek, oliwa)', ru: 'Каталонский хлеб (томат, чеснок, оливковое масло)' }, half: 1.80, full: 2.50 },
  { id: 4, category: 'panes', name: { es: 'Pan, tomate, jamón ibérico Badajoz', en: 'Bread, tomato, Iberian ham Badajoz', de: 'Brot, Tomate, iberischer Schinken Badajoz', pt: 'Pão, tomate, presunto ibérico Badajoz', it: 'Pane, pomodoro, prosciutto iberico Badajoz', pl: 'Chleb, pomidor, szynka iberyjska Badajoz', ru: 'Хлеб, томат, иберийский хамон Бадахос' }, half: 3.50, full: 6.00 },
  { id: 5, category: 'panes', name: { es: 'Pan con tomate y manchego curado', en: 'Bread with tomato and cured manchego', de: 'Brot mit Tomate und gereiftem Manchego', pt: 'Pão com tomate e manchego curado', it: 'Pane con pomodoro e manchego stagionato', pl: 'Chleb z pomidorem i dojrzałym manchego', ru: 'Хлеб с томатом и выдержанным манчего' }, half: 3.50, full: 6.00 },
  { id: 6, category: 'panes', name: { es: 'Pan con tomate, manchego e ibérico', en: 'Bread with tomato, manchego and Iberian', de: 'Brot mit Tomate, Manchego und Ibérico', pt: 'Pão com tomate, manchego e ibérico', it: 'Pane con pomodoro, manchego e iberico', pl: 'Chleb z pomidorem, manchego i iberyjskim', ru: 'Хлеб с томатом, манчего и иберийским' }, half: 4.00, full: 7.00 },

  // ENTRANTES
  { id: 10, category: 'entrantes', name: { es: 'Ensaladilla rusa', en: 'Russian salad', de: 'Russischer Salat', pt: 'Salada russa', it: 'Insalata russa', pl: 'Sałatka rosyjska', ru: 'Оливье' }, half: 4.00, full: 6.00 },
  { id: 11, category: 'entrantes', name: { es: 'Queso blanco de Guía de Isora', en: 'White cheese from Guía de Isora', de: 'Weißkäse aus Guía de Isora', pt: 'Queijo branco de Guía de Isora', it: 'Formaggio bianco di Guía de Isora', pl: 'Biały ser z Guía de Isora', ru: 'Белый сыр из Гия-де-Исора' }, half: 5.00, full: 8.00 },
  { id: 12, category: 'entrantes', name: { es: 'Queso manchego curado', en: 'Cured manchego cheese', de: 'Gereifter Manchego-Käse', pt: 'Queijo manchego curado', it: 'Formaggio manchego stagionato', pl: 'Dojrzały ser manchego', ru: 'Выдержанный сыр манчего' }, half: 7.00, full: 10.50 },
  { id: 13, category: 'entrantes', name: { es: 'Queso blanco a la plancha con mojos o arándanos', en: 'Grilled white cheese with mojo or blueberries', de: 'Gegrillter Weißkäse mit Mojo oder Heidelbeeren', pt: 'Queijo branco grelhado com mojos ou mirtilos', it: 'Formaggio bianco alla griglia con mojo o mirtilli', pl: 'Grillowany biały ser z mojo lub jagodami', ru: 'Жареный белый сыр с мохо или черникой' }, half: null, full: 9.50 },
  { id: 14, category: 'entrantes', name: { es: 'Croquetas mixtas (pollo, bonito, jamón, espinaca)', en: 'Mixed croquettes (chicken, tuna, ham, spinach)', de: 'Gemischte Kroketten (Huhn, Thunfisch, Schinken, Spinat)', pt: 'Croquetes mistos (frango, bonito, presunto, espinafre)', it: 'Crocchette miste (pollo, tonno, prosciutto, spinaci)', pl: 'Mieszane krokiety (kurczak, tuńczyk, szynka, szpinak)', ru: 'Смешанные крокеты (курица, тунец, хамон, шпинат)' }, half: 5.00, full: 7.00 },
  { id: 15, category: 'entrantes', name: { es: 'Champiñones empanados rellenos de almogrote', en: 'Breaded mushrooms stuffed with almogrote', de: 'Panierte Champignons gefüllt mit Almogrote', pt: 'Cogumelos empanados recheados com almogrote', it: 'Funghi impanati ripieni di almogrote', pl: 'Panierowane pieczarki nadziewane almogrote', ru: 'Панированные грибы с альмогроте' }, half: 6.00, full: 9.00 },
  { id: 16, category: 'entrantes', name: { es: 'Gambas al ajillo', en: 'Garlic prawns', de: 'Garnelen mit Knoblauch', pt: 'Gambas ao alho', it: 'Gamberetti all\'aglio', pl: 'Krewetki z czosnkiem', ru: 'Креветки с чесноком' }, half: null, full: 9.90 },
  { id: 17, category: 'entrantes', name: { es: 'Tabla de jamón ibérico con tostas con tomate', en: 'Iberian ham board with tomato toasts', de: 'Iberischer Schinkenteller mit Tomatenbrot', pt: 'Tábua de presunto ibérico com tostas com tomate', it: 'Tagliere di prosciutto iberico con crostini al pomodoro', pl: 'Deska szynki iberyjskiej z tostami z pomidorem', ru: 'Доска иберийского хамона с тостами с томатом' }, half: 12.50, full: 18.00 },
  { id: 18, category: 'entrantes', name: { es: 'Pimientos de Padrón', en: 'Padrón peppers', de: 'Padrón-Paprika', pt: 'Pimentos de Padrón', it: 'Peperoni di Padrón', pl: 'Papryczki Padrón', ru: 'Перцы Падрон' }, half: 5.00, full: 8.00 },
  { id: 19, category: 'entrantes', name: { es: 'Caracoles', en: 'Snails', de: 'Schnecken', pt: 'Caracóis', it: 'Lumache', pl: 'Ślimaki', ru: 'Улитки' }, half: 7.00, full: 11.00 },

  // ENSALADAS
  { id: 20, category: 'ensaladas', name: { es: 'Ensalada mixta', en: 'Mixed salad', de: 'Gemischter Salat', pt: 'Salada mista', it: 'Insalata mista', pl: 'Sałatka mieszana', ru: 'Смешанный салат' }, half: null, full: 6.00 },
  { id: 21, category: 'ensaladas', name: { es: 'Ensalada de atún', en: 'Tuna salad', de: 'Thunfischsalat', pt: 'Salada de atum', it: 'Insalata di tonno', pl: 'Sałatka z tuńczykiem', ru: 'Салат с тунцом' }, half: null, full: 7.00 },
  { id: 22, category: 'ensaladas', name: { es: 'Ensalada de la casa', en: 'House salad', de: 'Haussalat', pt: 'Salada da casa', it: 'Insalata della casa', pl: 'Sałatka domowa', ru: 'Фирменный салат' }, half: null, full: 8.50 },

  // CARNES
  { id: 30, category: 'carnes', name: { es: 'Entrecot añojo', en: 'Yearling entrecote', de: 'Jungrinds-Entrecôte', pt: 'Entrecosto de novilho', it: 'Entrecôte di vitellone', pl: 'Entrekot z młodej wołowiny', ru: 'Антрекот из молодой говядины' }, half: null, full: 15.00 },
  { id: 31, category: 'carnes', name: { es: 'Carne fiesta', en: 'Fiesta meat', de: 'Fiestafleisc', pt: 'Carne de festa', it: 'Carne fiesta', pl: 'Mięso fiesta', ru: 'Карне фиеста' }, half: null, full: 11.90 },
  { id: 32, category: 'carnes', name: { es: 'Ternera en salsa', en: 'Beef in sauce', de: 'Rindfleisch in Soße', pt: 'Vitela em molho', it: 'Vitello in salsa', pl: 'Wołowina w sosie', ru: 'Телятина в соусе' }, half: 8.50, full: 13.00 },
  { id: 33, category: 'carnes', name: { es: 'Albóndigas con papas fritas', en: 'Meatballs with fries', de: 'Fleischbällchen mit Pommes', pt: 'Almôndegas com batatas fritas', it: 'Polpette con patatine fritte', pl: 'Klopsiki z frytkami', ru: 'Тефтели с картофелем фри' }, half: 6.00, full: 9.90 },
  { id: 34, category: 'carnes', name: { es: 'Pechuga de pollo empanada (ensalada y papas fritas)', en: 'Breaded chicken breast (salad and fries)', de: 'Panierte Hähnchenbrust (Salat und Pommes)', pt: 'Peito de frango empanado (salada e batatas fritas)', it: 'Petto di pollo impanato (insalata e patatine)', pl: 'Panierowana pierś z kurczaka (sałatka i frytki)', ru: 'Панированная куриная грудка (салат и картофель фри)' }, half: null, full: 9.90 },
  { id: 35, category: 'carnes', name: { es: 'Alitas de pollo con papas fritas', en: 'Chicken wings with fries', de: 'Hähnchenflügel mit Pommes', pt: 'Asas de frango com batatas fritas', it: 'Ali di pollo con patatine fritte', pl: 'Skrzydełka z kurczaka z frytkami', ru: 'Куриные крылышки с картофелем фри' }, half: 5.00, full: 8.00 },
  { id: 36, category: 'carnes', name: { es: 'Salchichas con papas fritas', en: 'Sausages with fries', de: 'Würstchen mit Pommes', pt: 'Salsichas com batatas fritas', it: 'Salsicce con patatine fritte', pl: 'Kiełbaski z frytkami', ru: 'Сосиски с картофелем фри' }, half: 5.00, full: 8.00 },
  { id: 37, category: 'carnes', name: { es: 'Lingote de vaca madurada (220 gramos)', en: 'Aged beef ingot (220 grams)', de: 'Gereiftes Rindfleisch-Lingot (220 Gramm)', pt: 'Lingote de vaca maturada (220 gramas)', it: 'Lingotto di manzo maturato (220 grammi)', pl: 'Dojrzała wołowina lingot (220 gramów)', ru: 'Слиток выдержанной говядины (220 грамм)' }, half: null, full: 17.00 },

  // PESCADOS
  { id: 40, category: 'pescados', name: { es: 'Pulpo a la gallega', en: 'Galician-style octopus', de: 'Galizischer Oktopus', pt: 'Polvo à galega', it: 'Polpo alla galiziana', pl: 'Ośmiornica po galicyjsku', ru: 'Осьминог по-галисийски' }, half: 13.00, full: 19.00 },
  { id: 41, category: 'pescados', name: { es: 'Pulpo a la canaria', en: 'Canarian-style octopus', de: 'Kanarischer Oktopus', pt: 'Polvo à canária', it: 'Polpo alla canaria', pl: 'Ośmiornica po kanaryjsku', ru: 'Осьминог по-канарски' }, half: 13.00, full: 19.00 },
  { id: 42, category: 'pescados', name: { es: 'Chopitos fritos', en: 'Fried baby squid', de: 'Frittierte kleine Tintenfische', pt: 'Chopitos fritos', it: 'Moscardini fritti', pl: 'Smażone małe kałamarnice', ru: 'Жареные мини-кальмары' }, half: 6.50, full: 9.90 },
  { id: 43, category: 'pescados', name: { es: 'Calamares a la andaluza', en: 'Andalusian-style squid', de: 'Andalusische Tintenfischringe', pt: 'Calamares à andaluza', it: 'Calamari alla andalusa', pl: 'Kałamarnice po andaluzyjsku', ru: 'Кальмары по-андалузски' }, half: 7.00, full: 12.00 },
  { id: 44, category: 'pescados', name: { es: 'Chipirones a la plancha', en: 'Grilled baby squid', de: 'Gegrillte kleine Tintenfische', pt: 'Chipirones grelhados', it: 'Moscardini alla griglia', pl: 'Grillowane małe kałamarnice', ru: 'Жареные мини-кальмары на гриле' }, half: 7.00, full: 12.00 },
  { id: 45, category: 'pescados', name: { es: 'Chocos a la plancha con papas arrugadas y ensalada', en: 'Grilled cuttlefish with wrinkled potatoes and salad', de: 'Gegrillte Sepia mit Runzelkartoffeln und Salat', pt: 'Chocos grelhados com batatas com casca e salada', it: 'Seppie alla griglia con patate rugose e insalata', pl: 'Grillowana mątwa z pomarszczonymi ziemniakami i sałatką', ru: 'Каракатица на гриле с морщинистым картофелем и салатом' }, half: 8.00, full: 13.00 },
  { id: 46, category: 'pescados', name: { es: 'Atún a la plancha con papas arrugadas y ensalada', en: 'Grilled tuna with wrinkled potatoes and salad', de: 'Gegrillter Thunfisch mit Runzelkartoffeln und Salat', pt: 'Atum grelhado com batatas com casca e salada', it: 'Tonno alla griglia con patate rugose e insalata', pl: 'Grillowany tuńczyk z pomarszczonymi ziemniakami i sałatką', ru: 'Тунец на гриле с морщинистым картофелем и салатом' }, half: 7.50, full: 10.50 },
  { id: 47, category: 'pescados', name: { es: 'Bacalao a la portuguesa', en: 'Portuguese-style cod', de: 'Portugiesischer Kabeljau', pt: 'Bacalhau à portuguesa', it: 'Baccalà alla portoghese', pl: 'Dorsz po portugalsku', ru: 'Треска по-португальски' }, half: 9.90, full: 17.00 },
  { id: 48, category: 'pescados', name: { es: 'Pescado a la espalda', en: 'Butterflied grilled fish', de: 'Schmetterlings-Grillfish', pt: 'Peixe à espalda', it: 'Pesce alla schiena', pl: 'Ryba z grilla po hiszpańsku', ru: 'Рыба на гриле по-испански' }, half: null, full: 14.50 },
  { id: 49, category: 'pescados', name: { es: 'Parrilla de pescado y mariscos (mín. 2 pers.)', en: 'Fish and seafood grill (min. 2 people)', de: 'Fisch- und Meeresfrüchtegrill (mind. 2 Pers.)', pt: 'Parrillada de peixe e mariscos (mín. 2 pess.)', it: 'Grigliata di pesce e frutti di mare (min. 2 pers.)', pl: 'Grill rybny i owoce morza (min. 2 os.)', ru: 'Рыбный гриль и морепродукты (мин. 2 чел.)' }, half: null, full: 42.00 },
  { id: 50, category: 'pescados', name: { es: 'Fritura de pescado y mariscos (mín. 2 pers.)', en: 'Fried fish and seafood (min. 2 people)', de: 'Frittierter Fisch und Meeresfrüchte (mind. 2 Pers.)', pt: 'Fritura de peixe e mariscos (mín. 2 pess.)', it: 'Frittura di pesce e frutti di mare (min. 2 pers.)', pl: 'Smażona ryba i owoce morza (min. 2 os.)', ru: 'Жареная рыба и морепродукты (мин. 2 чел.)' }, half: null, full: 44.00 },
  { id: 51, category: 'pescados', name: { es: 'Zamburiñas a la plancha', en: 'Grilled scallops', de: 'Gegrillte Kammmuscheln', pt: 'Zamburiñas grelhadas', it: 'Capesante alla griglia', pl: 'Grillowane przegrzebki', ru: 'Гребешки на гриле' }, half: 9.90, full: 18.00 },
  { id: 52, category: 'pescados', name: { es: 'Navajas a la plancha', en: 'Grilled razor clams', de: 'Gegrillte Schwertmuscheln', pt: 'Navalhas grelhadas', it: 'Cannolicchi alla griglia', pl: 'Grillowane małże brzytwowe', ru: 'Мидии-бритвы на гриле' }, half: 6.00, full: 9.90 },
  { id: 53, category: 'pescados', name: { es: 'Langostinos a la plancha', en: 'Grilled king prawns', de: 'Gegrillte Riesengarnelen', pt: 'Gambão grelhado', it: 'Gamberi alla griglia', pl: 'Grillowane krewetki królewskie', ru: 'Королевские креветки на гриле' }, half: 6.00, full: 10.90 },
  { id: 54, category: 'pescados', name: { es: 'Gambón a la plancha', en: 'Grilled large prawn', de: 'Gegrillte große Garnele', pt: 'Gambão grande grelhado', it: 'Gambero grande alla griglia', pl: 'Grillowana duża krewetka', ru: 'Крупная креветка на гриле' }, half: null, full: 2.00 },

  // PAPAS
  { id: 60, category: 'papas', name: { es: 'Papas fritas', en: 'French fries', de: 'Pommes frites', pt: 'Batatas fritas', it: 'Patatine fritte', pl: 'Frytki', ru: 'Картофель фри' }, half: null, full: null },
  { id: 61, category: 'papas', name: { es: 'Papas arrugadas', en: 'Wrinkled potatoes', de: 'Runzelkartoffeln', pt: 'Batatas com casca', it: 'Patate rugose', pl: 'Pomarszczone ziemniaki', ru: 'Морщинистый картофель' }, half: 2.50, full: 4.00 },
  { id: 62, category: 'papas', name: { es: 'Huevos rotos con papas fritas', en: 'Broken eggs with fries', de: 'Gebrochene Eier mit Pommes', pt: 'Ovos rotos com batatas fritas', it: 'Uova rotte con patatine fritte', pl: 'Rozbite jajka z frytkami', ru: 'Разбитые яйца с картофелем фри' }, half: null, full: 8.00 },

  // POSTRES
  { id: 70, category: 'postres', name: { es: 'Quesillo', en: 'Quesillo', de: 'Quesillo', pt: 'Quesillo', it: 'Quesillo', pl: 'Quesillo', ru: 'Кесильо' }, half: null, full: 4.00 },
  { id: 71, category: 'postres', name: { es: 'Tiramisú', en: 'Tiramisu', de: 'Tiramisu', pt: 'Tiramisu', it: 'Tiramisù', pl: 'Tiramisu', ru: 'Тирамису' }, half: null, full: 4.50 },
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

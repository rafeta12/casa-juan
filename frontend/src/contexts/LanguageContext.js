import React, { createContext, useContext, useState } from 'react';

const translations = {
  es: {
    nav: {
      menu: "Carta",
      reservations: "Reservar",
      about: "Sobre Nosotros",
      contact: "Contacto",
      reserve: "Reservar Mesa"
    },
    hero: {
      title: "Auténtica Comida Casera Canaria",
      subtitle: "Sabor de siempre en el corazón de Adeje",
      cta: "Reservar Mesa",
      ctaSecondary: "Ver Carta"
    },
    stats: {
      rating: "Valoración",
      reviews: "Reseñas",
      price: "Por persona"
    },
    menu: {
      title: "Nuestra Carta",
      subtitle: "Platos tradicionales con el sabor de siempre",
      panes: "Panes",
      entrantes: "Entrantes",
      ensaladas: "Ensaladas",
      carnes: "Carnes",
      pescados: "Pescados",
      papas: "Papas",
      postres: "Postres Caseros",
      halfPortion: "1/2 Rac.",
      fullPortion: "Ración",
      askPrice: "Consultar"
    },
    reservation: {
      title: "Reserva Tu Mesa",
      subtitle: "Te esperamos con los brazos abiertos",
      callText: "Llámanos para reservar tu mesa. Estaremos encantados de atenderte.",
      hoursNote: "Mar-Sáb: 12:00-15:30 y 19:00-22:00"
    },
    faq: {
      title: "Preguntas Frecuentes",
      q1: "¿Se puede comer en el local?",
      a1: "Sí, disponemos de servicio en mesa en un ambiente familiar y acogedor.",
      q2: "¿Hacen comida para llevar?",
      a2: "Sí, puedes pedir y recoger fácilmente.",
      q3: "¿Tienen servicio a domicilio?",
      a3: "No, actualmente solo ofrecemos servicio en local o para llevar.",
      q4: "¿Es necesario reservar?",
      a4: "No es obligatorio, pero recomendable en horas punta.",
      q5: "¿Qué tipo de comida ofrecen?",
      a5: "Comida casera y platos tradicionales canarios, con raciones generosas."
    },
    contact: {
      title: "Encuéntranos",
      address: "Dirección",
      phone: "Teléfono",
      hours: "Horario",
      hoursValue: "Mar-Sáb: 12:00-15:30, 19:00-22:00",
      closed: "Lunes y Domingo: Cerrado"
    },
    footer: {
      cta: "¿Tienes hambre?",
      ctaSubtitle: "Casa Juan te espera",
      rights: "Todos los derechos reservados"
    },
    why: {
      title: "¿Por qué elegir Casa Juan?",
      item1: "Comida casera de verdad",
      item2: "Excelente relación calidad-precio",
      item3: "Más de 1900 clientes satisfechos",
      item4: "Servicio rápido y cercano",
      item5: "Ubicación céntrica en Adeje"
    }
  },
  en: {
    nav: {
      menu: "Menu",
      reservations: "Reserve",
      about: "About Us",
      contact: "Contact",
      reserve: "Book a Table"
    },
    hero: {
      title: "Authentic Canarian Home Cooking",
      subtitle: "Traditional flavors in the heart of Adeje",
      cta: "Book a Table",
      ctaSecondary: "View Menu"
    },
    stats: {
      rating: "Rating",
      reviews: "Reviews",
      price: "Per person"
    },
    menu: {
      title: "Our Menu",
      subtitle: "Traditional dishes with timeless flavor",
      panes: "Breads",
      entrantes: "Starters",
      ensaladas: "Salads",
      carnes: "Meats",
      pescados: "Seafood",
      papas: "Potatoes",
      postres: "Homemade Desserts",
      halfPortion: "1/2 Port.",
      fullPortion: "Portion",
      askPrice: "Ask"
    },
    reservation: {
      title: "Book Your Table",
      subtitle: "We're waiting for you with open arms",
      callText: "Call us to book your table. We'll be happy to assist you.",
      hoursNote: "Tue-Sat: 12:00-15:30 and 19:00-22:00"
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "Can we dine in?",
      a1: "Yes, we offer table service in a cozy, family-friendly atmosphere.",
      q2: "Do you offer takeaway?",
      a2: "Yes, you can easily order and pick up.",
      q3: "Do you offer delivery?",
      a3: "No, currently we only offer dine-in and takeaway.",
      q4: "Do I need to make a reservation?",
      a4: "It's not mandatory, but recommended during peak hours.",
      q5: "What kind of food do you serve?",
      a5: "Home-cooked Canarian traditional dishes with generous portions."
    },
    contact: {
      title: "Find Us",
      address: "Address",
      phone: "Phone",
      hours: "Hours",
      hoursValue: "Tue-Sat: 12:00-15:30, 19:00-22:00",
      closed: "Monday and Sunday: Closed"
    },
    footer: {
      cta: "Hungry?",
      ctaSubtitle: "Casa Juan awaits you",
      rights: "All rights reserved"
    },
    why: {
      title: "Why choose Casa Juan?",
      item1: "Real home cooking",
      item2: "Excellent value for money",
      item3: "Over 1900 satisfied customers",
      item4: "Fast and friendly service",
      item5: "Central location in Adeje"
    }
  },
  de: {
    nav: {
      menu: "Speisekarte",
      reservations: "Reservieren",
      about: "Über Uns",
      contact: "Kontakt",
      reserve: "Tisch Reservieren"
    },
    hero: {
      title: "Authentische Kanarische Hausmannskost",
      subtitle: "Traditionelle Aromen im Herzen von Adeje",
      cta: "Tisch Reservieren",
      ctaSecondary: "Speisekarte"
    },
    stats: {
      rating: "Bewertung",
      reviews: "Bewertungen",
      price: "Pro Person"
    },
    menu: {
      title: "Unsere Speisekarte",
      subtitle: "Traditionelle Gerichte mit zeitlosem Geschmack",
      panes: "Brote",
      entrantes: "Vorspeisen",
      ensaladas: "Salate",
      carnes: "Fleisch",
      pescados: "Meeresfrüchte",
      papas: "Kartoffeln",
      postres: "Hausgemachte Desserts",
      halfPortion: "1/2 Port.",
      fullPortion: "Portion",
      askPrice: "Fragen"
    },
    reservation: {
      title: "Reservieren Sie Ihren Tisch",
      subtitle: "Wir erwarten Sie mit offenen Armen",
      callText: "Rufen Sie uns an, um Ihren Tisch zu reservieren. Wir helfen Ihnen gerne.",
      hoursNote: "Di-Sa: 12:00-15:30 und 19:00-22:00"
    },
    faq: {
      title: "Häufig Gestellte Fragen",
      q1: "Kann man im Restaurant essen?",
      a1: "Ja, wir bieten Tischservice in einer gemütlichen, familienfreundlichen Atmosphäre.",
      q2: "Bieten Sie Essen zum Mitnehmen an?",
      a2: "Ja, Sie können einfach bestellen und abholen.",
      q3: "Bieten Sie Lieferservice an?",
      a3: "Nein, derzeit bieten wir nur Vor-Ort-Service und Abholung an.",
      q4: "Muss ich reservieren?",
      a4: "Es ist nicht obligatorisch, aber empfohlen zu Stoßzeiten.",
      q5: "Welche Art von Essen bieten Sie an?",
      a5: "Hausgemachte kanarische traditionelle Gerichte mit großzügigen Portionen."
    },
    contact: {
      title: "Finden Sie Uns",
      address: "Adresse",
      phone: "Telefon",
      hours: "Öffnungszeiten",
      hoursValue: "Di-Sa: 12:00-15:30, 19:00-22:00",
      closed: "Montag und Sonntag: Geschlossen"
    },
    footer: {
      cta: "Hungrig?",
      ctaSubtitle: "Casa Juan erwartet Sie",
      rights: "Alle Rechte vorbehalten"
    },
    why: {
      title: "Warum Casa Juan wählen?",
      item1: "Echte Hausmannskost",
      item2: "Ausgezeichnetes Preis-Leistungs-Verhältnis",
      item3: "Über 1900 zufriedene Kunden",
      item4: "Schneller und freundlicher Service",
      item5: "Zentrale Lage in Adeje"
    }
  },
  pl: {
    nav: { menu: "Menu", reservations: "Rezerwacja", about: "O nas", contact: "Kontakt", reserve: "Zarezerwuj stolik" },
    hero: { title: "Autentyczna Kuchnia Kanaryjska", subtitle: "Tradycyjne smaki w sercu Adeje", cta: "Zarezerwuj stolik", ctaSecondary: "Zobacz menu" },
    stats: { rating: "Ocena", reviews: "Opinii", price: "Na osobę" },
    menu: { title: "Nasze Menu", subtitle: "Tradycyjne dania z niezmiennym smakiem", panes: "Pieczywo", entrantes: "Przystawki", ensaladas: "Sałatki", carnes: "Mięsa", pescados: "Owoce morza", papas: "Ziemniaki", postres: "Desery domowe", halfPortion: "1/2 Porc.", fullPortion: "Porcja", askPrice: "Zapytaj" },
    reservation: { title: "Zarezerwuj Stolik", subtitle: "Czekamy na Ciebie z otwartymi ramionami", callText: "Zadzwoń do nas, aby zarezerwować stolik.", hoursNote: "Wt-Sob: 12:00-15:30 i 19:00-22:00" },
    faq: { title: "Często Zadawane Pytania", q1: "Czy można jeść na miejscu?", a1: "Tak, oferujemy obsługę przy stoliku.", q2: "Czy oferujecie jedzenie na wynos?", a2: "Tak, możesz zamówić i odebrać.", q3: "Czy dostarczacie do domu?", a3: "Nie, obecnie tylko na miejscu lub na wynos.", q4: "Czy trzeba rezerwować?", a4: "Nie jest wymagane, ale zalecane w godzinach szczytu.", q5: "Jakie jedzenie oferujecie?", a5: "Domowe dania kanaryjskie z obfitymi porcjami." },
    contact: { title: "Znajdź nas", address: "Adres", phone: "Telefon", hours: "Godziny", hoursValue: "Wt-Sob: 12:00-15:30, 19:00-22:00", closed: "Poniedziałek i niedziela: Zamknięte" },
    footer: { cta: "Głodny?", ctaSubtitle: "Casa Juan czeka na Ciebie", rights: "Wszelkie prawa zastrzeżone" },
    why: { title: "Dlaczego Casa Juan?", item1: "Prawdziwe domowe jedzenie", item2: "Doskonały stosunek jakości do ceny", item3: "Ponad 1900 zadowolonych klientów", item4: "Szybka i przyjazna obsługa", item5: "Centralna lokalizacja w Adeje" }
  },
  it: {
    nav: { menu: "Menu", reservations: "Prenota", about: "Chi siamo", contact: "Contatti", reserve: "Prenota un tavolo" },
    hero: { title: "Autentica Cucina Casalinga Canaria", subtitle: "Sapori tradizionali nel cuore di Adeje", cta: "Prenota un tavolo", ctaSecondary: "Vedi menu" },
    stats: { rating: "Valutazione", reviews: "Recensioni", price: "A persona" },
    menu: { title: "Il Nostro Menu", subtitle: "Piatti tradizionali con sapore autentico", panes: "Pane", entrantes: "Antipasti", ensaladas: "Insalate", carnes: "Carni", pescados: "Pesce", papas: "Patate", postres: "Dolci della casa", halfPortion: "1/2 Porz.", fullPortion: "Porzione", askPrice: "Chiedi" },
    reservation: { title: "Prenota il Tuo Tavolo", subtitle: "Ti aspettiamo a braccia aperte", callText: "Chiamaci per prenotare il tuo tavolo.", hoursNote: "Mar-Sab: 12:00-15:30 e 19:00-22:00" },
    faq: { title: "Domande Frequenti", q1: "Si può mangiare sul posto?", a1: "Sì, offriamo servizio al tavolo.", q2: "Fate cibo da asporto?", a2: "Sì, puoi ordinare e ritirare.", q3: "Fate consegna a domicilio?", a3: "No, attualmente solo sul posto o da asporto.", q4: "È necessario prenotare?", a4: "Non è obbligatorio, ma consigliato nelle ore di punta.", q5: "Che tipo di cibo offrite?", a5: "Cucina casalinga canaria con porzioni abbondanti." },
    contact: { title: "Trovaci", address: "Indirizzo", phone: "Telefono", hours: "Orari", hoursValue: "Mar-Sab: 12:00-15:30, 19:00-22:00", closed: "Lunedì e domenica: Chiuso" },
    footer: { cta: "Hai fame?", ctaSubtitle: "Casa Juan ti aspetta", rights: "Tutti i diritti riservati" },
    why: { title: "Perché scegliere Casa Juan?", item1: "Vera cucina casalinga", item2: "Ottimo rapporto qualità-prezzo", item3: "Oltre 1900 clienti soddisfatti", item4: "Servizio veloce e cordiale", item5: "Posizione centrale ad Adeje" }
  },
  pt: {
    nav: { menu: "Cardápio", reservations: "Reservar", about: "Sobre nós", contact: "Contato", reserve: "Reservar mesa" },
    hero: { title: "Autêntica Comida Caseira Canária", subtitle: "Sabores tradicionais no coração de Adeje", cta: "Reservar mesa", ctaSecondary: "Ver cardápio" },
    stats: { rating: "Avaliação", reviews: "Avaliações", price: "Por pessoa" },
    menu: { title: "Nosso Cardápio", subtitle: "Pratos tradicionais com sabor autêntico", panes: "Pães", entrantes: "Entradas", ensaladas: "Saladas", carnes: "Carnes", pescados: "Peixes", papas: "Batatas", postres: "Sobremesas caseiras", halfPortion: "1/2 Porç.", fullPortion: "Porção", askPrice: "Consultar" },
    reservation: { title: "Reserve Sua Mesa", subtitle: "Esperamos por você de braços abertos", callText: "Ligue para reservar sua mesa.", hoursNote: "Ter-Sáb: 12:00-15:30 e 19:00-22:00" },
    faq: { title: "Perguntas Frequentes", q1: "Pode-se comer no local?", a1: "Sim, oferecemos serviço de mesa.", q2: "Fazem comida para viagem?", a2: "Sim, pode pedir e levantar.", q3: "Fazem entregas ao domicílio?", a3: "Não, atualmente apenas no local ou para levar.", q4: "É necessário reservar?", a4: "Não é obrigatório, mas recomendado nas horas de ponta.", q5: "Que tipo de comida oferecem?", a5: "Comida caseira canária com porções generosas." },
    contact: { title: "Encontre-nos", address: "Endereço", phone: "Telefone", hours: "Horário", hoursValue: "Ter-Sáb: 12:00-15:30, 19:00-22:00", closed: "Segunda e domingo: Fechado" },
    footer: { cta: "Com fome?", ctaSubtitle: "Casa Juan espera por si", rights: "Todos os direitos reservados" },
    why: { title: "Porquê escolher Casa Juan?", item1: "Verdadeira comida caseira", item2: "Excelente relação qualidade-preço", item3: "Mais de 1900 clientes satisfeitos", item4: "Serviço rápido e simpático", item5: "Localização central em Adeje" }
  },
  ru: {
    nav: { menu: "Меню", reservations: "Бронь", about: "О нас", contact: "Контакты", reserve: "Забронировать" },
    hero: { title: "Настоящая Канарская Домашняя Кухня", subtitle: "Традиционные вкусы в сердце Адехе", cta: "Забронировать столик", ctaSecondary: "Смотреть меню" },
    stats: { rating: "Рейтинг", reviews: "Отзывов", price: "На человека" },
    menu: { title: "Наше Меню", subtitle: "Традиционные блюда с неизменным вкусом", panes: "Хлеб", entrantes: "Закуски", ensaladas: "Салаты", carnes: "Мясо", pescados: "Морепродукты", papas: "Картофель", postres: "Домашние десерты", halfPortion: "1/2 Порц.", fullPortion: "Порция", askPrice: "Спросить" },
    reservation: { title: "Забронируйте Столик", subtitle: "Ждём вас с распростёртыми объятиями", callText: "Позвоните нам, чтобы забронировать столик.", hoursNote: "Вт-Сб: 12:00-15:30 и 19:00-22:00" },
    faq: { title: "Часто Задаваемые Вопросы", q1: "Можно ли поесть в ресторане?", a1: "Да, у нас есть обслуживание за столом.", q2: "Есть еда на вынос?", a2: "Да, вы можете заказать и забрать.", q3: "Есть доставка?", a3: "Нет, только в ресторане или на вынос.", q4: "Нужно ли бронировать?", a4: "Не обязательно, но рекомендуется в часы пик.", q5: "Какую кухню вы предлагаете?", a5: "Домашние канарские блюда с щедрыми порциями." },
    contact: { title: "Найти нас", address: "Адрес", phone: "Телефон", hours: "Часы работы", hoursValue: "Вт-Сб: 12:00-15:30, 19:00-22:00", closed: "Понедельник и воскресенье: Закрыто" },
    footer: { cta: "Голодны?", ctaSubtitle: "Casa Juan ждёт вас", rights: "Все права защищены" },
    why: { title: "Почему Casa Juan?", item1: "Настоящая домашняя кухня", item2: "Отличное соотношение цены и качества", item3: "Более 1900 довольных клиентов", item4: "Быстрое и дружелюбное обслуживание", item5: "Центральное расположение в Адехе" }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

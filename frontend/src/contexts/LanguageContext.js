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
      starters: "Entrantes",
      mains: "Platos Principales",
      desserts: "Postres"
    },
    reservation: {
      title: "Reserva Tu Mesa",
      subtitle: "Te esperamos con los brazos abiertos",
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      date: "Fecha",
      time: "Hora",
      guests: "Comensales",
      notes: "Notas especiales (alergias, ocasión...)",
      submit: "Confirmar Reserva",
      success: "¡Reserva confirmada!",
      successMessage: "Te hemos enviado un email de confirmación.",
      selectDate: "Selecciona una fecha",
      selectTime: "Selecciona hora",
      selectGuests: "Número de personas",
      person: "persona",
      people: "personas"
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
      starters: "Starters",
      mains: "Main Courses",
      desserts: "Desserts"
    },
    reservation: {
      title: "Book Your Table",
      subtitle: "We're waiting for you with open arms",
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      date: "Date",
      time: "Time",
      guests: "Guests",
      notes: "Special notes (allergies, occasion...)",
      submit: "Confirm Reservation",
      success: "Reservation confirmed!",
      successMessage: "We've sent you a confirmation email.",
      selectDate: "Select a date",
      selectTime: "Select time",
      selectGuests: "Number of guests",
      person: "person",
      people: "people"
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
      starters: "Vorspeisen",
      mains: "Hauptgerichte",
      desserts: "Nachspeisen"
    },
    reservation: {
      title: "Reservieren Sie Ihren Tisch",
      subtitle: "Wir erwarten Sie mit offenen Armen",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      date: "Datum",
      time: "Uhrzeit",
      guests: "Gäste",
      notes: "Besondere Hinweise (Allergien, Anlass...)",
      submit: "Reservierung Bestätigen",
      success: "Reservierung bestätigt!",
      successMessage: "Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.",
      selectDate: "Datum auswählen",
      selectTime: "Uhrzeit auswählen",
      selectGuests: "Anzahl der Gäste",
      person: "Person",
      people: "Personen"
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

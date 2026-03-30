import React from "react";
import "@/App.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsRibbon from "./components/StatsRibbon";
import MenuSection from "./components/MenuSection";
import ReservationSection from "./components/ReservationSection";
import WhySection from "./components/WhySection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-[#F9F6F0]" data-testid="app-container">
        <Header />
        <main>
          <Hero />
          <StatsRibbon />
          <MenuSection />
          <ReservationSection />
          <WhySection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

import { useState, useRef } from "react";
import "./portfolio.css";
import { TXT } from "./data/texts";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useMouseSpotlight } from "./hooks/useMouseSpotlight";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Portfolio() {
  const [lang, setLang] = useState("fr");
  const t = TXT[lang];
  const rootRef = useRef(null);

  useScrollReveal(rootRef, lang);
  useMouseSpotlight(rootRef);

  return (
    <div className="pf" ref={rootRef}>
      <div className="aurora"><b className="a1" /><b className="a2" /></div>
      <div className="grain" />

      <Navbar
        lang={lang}
        onLangChange={setLang}
        touring={false}
        onStopTour={() => {}}
      />

      <div className="wrap">
        <HeroSection t={t} lang={lang} />
        <ProjectsSection t={t} lang={lang} />
        <SkillsSection t={t} />
        <CertificationsSection t={t} />
        <AboutSection t={t} />
        <ContactSection t={t} />
      </div>

      <footer>© 2026 Ange Stève Hakira BAKO — {t.footer}</footer>
    </div>
  );
}

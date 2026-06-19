export default function Navbar({ lang, onLangChange, onStopTour, touring }) {
  return (
    <nav className="nav">
      <div className="nav-in">
        <div className="logo">AHB<span className="accent">.</span></div>
        <div className="nav-r">
          <a className="nav-hide" href="#projects">{lang === "fr" ? "Projets" : "Projects"}</a>
          <a className="nav-hide" href="#skills">{lang === "fr" ? "Compétences" : "Skills"}</a>
          <a className="nav-hide" href="#certs">{lang === "fr" ? "Certifications" : "Certifications"}</a>
          <a className="nav-hide" href="#about">{lang === "fr" ? "Parcours" : "Background"}</a>
          <button
            className="iconbtn langtog"
            title="Français / English"
            aria-label="Changer de langue / Switch language"
            onClick={() => {
              if (touring) onStopTour();
              onLangChange(lang === "fr" ? "en" : "fr");
            }}
          >
            <span className={lang === "fr" ? "on" : ""}>FR</span>
            <span className="sep">/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

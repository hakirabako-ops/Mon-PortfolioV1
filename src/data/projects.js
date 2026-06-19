// ───────────────────────────────────────────────────────────────────
//  ANNÉES (libellés des groupes)
// ───────────────────────────────────────────────────────────────────
export const YEARS = {
  fr: { prepa: "Prépa · MP2I / MPI", "1": "1ʳᵉ année", "2": "2ᵉ année", "3": "3ᵉ année" },
  en: { prepa: "Prep · MP2I / MPI", "1": "Year 1", "2": "Year 2", "3": "Year 3" },
};
export const YEAR_ORDER = ["3", "2", "1", "prepa"];

export const DOMAINS = {
  fr: { ai: "IA / ML", eng: "Logiciel", data: "Data", other: "Autre" },
  en: { ai: "AI / ML", eng: "Software", data: "Data", other: "Other" },
};

// ───────────────────────────────────────────────────────────────────
//  PROJETS — pour en AJOUTER un, copiez un bloc { ... } ci-dessous.
//  year: "prepa" | "1" | "2" | "3"   ·   domain: "ai"|"eng"|"data"|"other"
// ───────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "bot", year: "1", domain: "ai", name: "bot_cartographe — ApexAI",
    image: "",
    stack: ["TypeScript", "Python", "LLM", "PostgreSQL", "Scraper", "Vercel"], badges: ["team", "live"],
    links: [{ label: "GitHub", url: "https://github.com/LaryConseiga/bot_cartographe" }, { label: "Démo ↗", url: "https://apexai-vert.vercel.app" }],
    fr: { tag: "Application LLM · conseil carrière", metric: "Déployé en ligne · équipe de 2", case: [
      "Les étudiants peinent à savoir quelles compétences développer pour décrocher une offre précise.",
      "Une équipe de 2 a bâti une application full-stack : un scraper alimente une base PostgreSQL d'offres, un backend Python orchestre le LLM qui croise le CV de l'étudiant avec l'offre visée, et un frontend TypeScript porte la conversation.",
      "Application déployée et accessible en ligne(Pas totalement fonctionnelle) (Vercel). "] },
    en: { tag: "LLM application · career guidance", metric: "Deployed live · team of 2", case: [
      "Students struggle to know which skills to develop to land a specific job offer.",
      "A team of 2 built a full-stack app: a scraper feeds a PostgreSQL database of offers, a Python backend orchestrates the LLM matching the student's CV against the target offer, and a TypeScript frontend carries the conversation.",
      "App deployed and accessible online(Needs improvement) (Vercel). "] },
  },
  {
    id: "rul", year: "1", domain: "ai", name: "RUL — Maintenance prédictive turbofan",
    image: "",
    stack: ["Python", "scikit-learn", "Pandas", "Régression", "Colab"], badges: [],
    links: [{ label: "Notebook Colab ↗", url: "https://colab.research.google.com/drive/1i4UAYa-Zs10C3Dd_V2TMmpIUDJ7b3uWm?usp=sharing" }],
    fr: { tag: "Machine Learning · régression", metric: "Dataset type NASA C-MAPSS", case: [
      "Anticiper la défaillance d'un moteur turbofan avant qu'elle ne survienne, à partir de ses capteurs.",
      "Pipeline ML complet : nettoyage des séries temporelles de capteurs, ingénierie de features, entraînement d'un modèle de régression estimant les cycles restants (RUL), puis évaluation.",
      "Modèle fonctionnel prédisant la durée de vie résiduelle. (Métrique — ex. RMSE — à ajouter.)"] },
    en: { tag: "Machine Learning · regression", metric: "NASA C-MAPSS-style dataset", case: [
      "Anticipate a turbofan engine's failure before it happens, from its sensor readings.",
      "Full ML pipeline: cleaning the sensor time-series, feature engineering, training a regression model estimating remaining cycles (RUL), then evaluation.",
      "Working model predicting Remaining Useful Life. (Metric — e.g. RMSE — to be added.)"] },
  },
  {
    id: "blog", year: "1", domain: "eng", name: "Interface moderne de blog",
    image: "",
    stack: ["Next.js", "React", "Express", "MySQL", "DaisyUI"], badges: [],
    links: [{ label: "GitHub", url: "https://github.com/hakirabako-ops" }],
    fr: { tag: "Full-stack web", metric: "Du rendu client à la base de données", case: [
      "Concevoir une plateforme de blog moderne, réactive et maintenable.",
      "Frontend React/Next.js avec composants réutilisables et formulaires contrôlés ; API Express ; persistance MySQL.",
      "Plateforme full-stack fonctionnelle de bout en bout."] },
    en: { tag: "Full-stack web", metric: "From client render to database", case: [
      "Build a modern, responsive and maintainable blog platform.",
      "React/Next.js frontend with reusable components and controlled forms; Express API; MySQL persistence.",
      "A working end-to-end full-stack platform."] },
  },
  {
    id: "erp", year: "prepa", domain: "eng", name: "Mini-ERP de gestion commerciale",
    image: "",
    stack: ["Java 17", "MVC", "JavaFX", "FXML"], badges: [],
    links: [{ label: "GitHub", url: "https://github.com/hakirabako-ops" }],
    fr: { tag: "Java · POO · MVC", metric: "Architecture MVC propre", case: [
      "Outiller la gestion commerciale d'une PME : clients, produits, facturation.",
      "Application Java 17 en architecture MVC stricte, interface JavaFX + FXML, modélisation orientée objet du domaine.",
      "Mini-ERP opérationnel couvrant les besoins fondamentaux d'une entreprise."] },
    en: { tag: "Java · OOP · MVC", metric: "Clean MVC architecture", case: [
      "Tool a small company's commercial management: clients, products, invoicing.",
      "Java 17 app in strict MVC architecture, JavaFX + FXML GUI, object-oriented domain modeling.",
      "A working mini-ERP covering a company's core needs."] },
  },
  {
    id: "graph", year: "prepa", domain: "other", name: "Théorie des graphes — réseau",
    image: "",
    stack: ["Python", "Tarjan", "Dijkstra", "Graphes"], badges: [],
    links: [{ label: "GitHub", url: "https://github.com/hakirabako-ops" }],
    fr: { tag: "Algorithmique", metric: "Tarjan + Dijkstra", case: [
      "Diagnostiquer et maintenir un réseau informatique modélisé comme un graphe.",
      "Implémentation en Python des algorithmes de Tarjan (composantes critiques) et de Dijkstra (plus courts chemins).",
      "Outil identifiant les points de défaillance et les chemins optimaux du réseau."] },
    en: { tag: "Algorithms", metric: "Tarjan + Dijkstra", case: [
      "Diagnose and maintain a computer network modeled as a graph.",
      "Python implementation of Tarjan's (critical components) and Dijkstra's (shortest paths) algorithms.",
      "A tool identifying the network's failure points and optimal paths."] },
  },
  // 👉 NOUVEAU PROJET ? Copiez un bloc ci-dessus, changez id/year/domain/name/...
];

// ───────────────────────────────────────────────────────────────────
//  CERTIFICATIONS — status: "done" | "progress" | "planned"
// ───────────────────────────────────────────────────────────────────
export const CERTS = [
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI · Coursera", date: "2026", status: "planned", link: "" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI · Coursera", date: "2026", status: "planned", link: "" },
  // 👉 NOUVELLE CERTIF ? Copiez une ligne ci-dessus.
];

// 👉 PHOTO : remplacez "" par l'URL de votre image
export const PHOTO = "";
export const CV_URL = "/cv.pdf";

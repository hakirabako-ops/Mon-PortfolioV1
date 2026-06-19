import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({ t, lang }) {
  return (
    <section id="projects" className="sr">
      <div className="sec-head">
        <span className="sec-num">01</span>
        <h2 className="sec-title">{t.secProjects}</h2>
        <span className="sec-sub">{t.secProjectsSub}</span>
      </div>
      {PROJECTS.map((p) => (
        <ProjectCard key={p.id} p={p} t={t} lang={lang} />
      ))}
    </section>
  );
}

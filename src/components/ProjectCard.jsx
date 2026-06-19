import { useState } from "react";
import { DOMAINS } from "../data/projects";

export default function ProjectCard({ p, t, lang }) {
  const [open, setOpen] = useState(false);
  const d = p[lang];

  const onCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
  };

  return (
    <div className="card glass" id={"card-" + p.id} onMouseMove={onCardMove}>
      <div className="thumb">
        {p.image
          ? <img src={p.image} alt={p.name} />
          : <div className="thumb-ph"><span className="mono">{DOMAINS[lang][p.domain]}</span></div>}
      </div>
      <div className="card-top">
        <div><h3>{p.name}</h3><div className="ptag">{d.tag}</div></div>
        <div className="badges">
          <span className="badge dom">{DOMAINS[lang][p.domain]}</span>
          {p.badges.includes("team") && <span className="badge">{t.teamBadge}</span>}
          {p.badges.includes("live") && <span className="badge live">{t.liveBadge}</span>}
        </div>
      </div>
      <div className="metricline">{d.metric}</div>
      <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <div className="card-actions">
        {p.links.map((l) => (
          <a key={l.label} className="lnk" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
        ))}
        <button className="toggle" onClick={() => setOpen(!open)}>
          {open ? "— " + t.hide : "+ " + t.details}
        </button>
      </div>
      {open && (
        <div className="case">
          {d.case.map((txt, i) => (
            <div className="case-row" key={i}>
              <div className="case-k">{String(i + 1).padStart(2, "0")} · {t.caseLabels[i]}</div>
              <div className="case-v">{txt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { PHOTO } from "../data/projects";

export default function AboutSection({ t }) {
  return (
    <section id="about" className="sr">
      <div className="sec-head">
        <span className="sec-num">04</span>
        <h2 className="sec-title">{t.secAbout}</h2>
        <span className="sec-sub">{t.secAboutSub}</span>
      </div>
      <div className="about-grid">
        <div className="about-card glass">
          <div className="about-head">
            <div className="avatar">
              {PHOTO ? <img src={PHOTO} alt="Ange Stève Hakira BAKO" /> : <span>AHB</span>}
            </div>
            <div>
              <div className="bar" />
              <div className="about-name">Ange Stève Hakira BAKO</div>
              <div className="about-role mono">{t.role}</div>
            </div>
          </div>
          <p className="about-text">{t.about}</p>
        </div>
        <div className="tl glass">
          {t.timeline.map(([y, v]) => (
            <div className="tl-row" key={y}>
              <span className="tl-y">{y}</span>
              <span className="tl-v">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

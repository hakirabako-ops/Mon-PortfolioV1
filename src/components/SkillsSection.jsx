export default function SkillsSection({ t }) {
  return (
    <section id="skills" className="sr">
      <div className="sec-head">
        <span className="sec-num">02</span>
        <h2 className="sec-title">{t.secSkills}</h2>
        <span className="sec-sub">{t.secSkillsSub}</span>
      </div>
      <div className="layers">
        {t.layers.map(([name, items]) => (
          <div className="layer glass" key={name}>
            <h4>{name}</h4>
            <div className="stack">{items.map((i) => <span key={i}>{i}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ContactSection({ t }) {
  const words = t.contactTitle.split(" ");
  const lastWord = words.slice(-1)[0];
  const restWords = words.slice(0, -1).join(" ");

  return (
    <section id="contact" className="contact sr">
      <span className="sec-num mono">05 · {t.secContact}</span>
      <h2>{restWords} <span className="grad">{lastWord}</span></h2>
      <p>{t.contactSub}</p>
      <a className="cta" href="mailto:hakira.bako@gmail.com">{t.contactBtn}</a>
      <div className="meta">
        <a href="mailto:hakira.bako@gmail.com">hakira.bako@gmail.com</a>
        {" · "}+226 55762498{" · "}
        <a href="https://github.com/hakirabako" target="_blank" rel="noreferrer">github.com/hakirabako</a>
      </div>
    </section>
  );
}

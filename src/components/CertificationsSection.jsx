import { CERTS } from "../data/projects";

export default function CertificationsSection({ t }) {
  return (
    <section id="certs" className="sr">
      <div className="sec-head">
        <span className="sec-num">03</span>
        <h2 className="sec-title">{t.secCerts}</h2>
        <span className="sec-sub">{t.secCertsSub}</span>
      </div>
      {CERTS.length === 0 ? (
        <div className="cert-empty glass">{t.certEmpty}</div>
      ) : (
        <div className="certs">
          {CERTS.map((c, i) => (
            <div className="cert glass" key={i}>
              <div className="cert-top">
                <span className={"cert-status " + c.status}>{t.certStatus[c.status]}</span>
                <span className="cert-date mono">{c.date}</span>
              </div>
              <h4>
                {c.link
                  ? <a href={c.link} target="_blank" rel="noreferrer">{c.name} ↗</a>
                  : c.name}
              </h4>
              <div className="cert-issuer">{c.issuer}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

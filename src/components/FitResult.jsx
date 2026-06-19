export default function FitResult({ a, t }) {
  const score = Math.max(0, Math.min(100, Math.round(Number(a.score) || 0)));
  const R = 34, CIRC = 2 * Math.PI * R, off = CIRC * (1 - score / 100);
  return (
    <div className="fit">
      <div className="fit-gauge">
        <svg viewBox="0 0 84 84" width="92" height="92">
          <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="7" />
          <circle cx="42" cy="42" r={R} fill="none" stroke="url(#fitg)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={CIRC} strokeDashoffset={off} transform="rotate(-90 42 42)" />
          <defs>
            <linearGradient id="fitg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5ed6c4" />
              <stop offset="1" stopColor="#8b9cff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="fit-score"><b>{score}</b><span>{t.fitScore}</span></div>
      </div>
      <div className="fit-body">
        <div className="fit-block">
          <h5 className="fit-h ok">{t.fitStrengths}</h5>
          <ul>{(a.strengths || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        {(a.gaps || []).length > 0 && (
          <div className="fit-block gap-block">
            <h5 className="fit-h gap">{t.fitGaps}</h5>
            <ul>{(a.gaps || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
        {a.verdict && (
          <div className="fit-verdict"><b>{t.fitVerdict} ·</b> {a.verdict}</div>
        )}
      </div>
    </div>
  );
}

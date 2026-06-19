import { useState, useRef, useEffect } from "react";
import Typewriter from "./Typewriter";
import { PROFILE } from "../data/profile";
import { TOUR } from "../data/tour";

async function callClaude(body) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: body.system, messages: body.messages }),
  });
  if (!res.ok) throw new Error("API " + res.status);
  const data = await res.json();
  return (data.text || "").trim();
}

const SYSTEM = {
  fr: (profile) =>
    "Tu es l'assistant du portfolio d'Ange Stève Hakira BAKO, étudiant-ingénieur en IA. " +
    "Réponds UNIQUEMENT en français, à partir du dossier ci-dessous. Concis (2 à 5 phrases), précis, honnête (profil junior, n'invente rien). " +
    "Cite les projets par leur nom. Si l'info manque, dis-le et invite à contacter Ange (hakira.bako@gmail.com). bot_cartographe est un projet d'équipe.\n\n=== DOSSIER ===\n" + profile,
  en: (profile) =>
    "You are the portfolio assistant of Ange Stève Hakira BAKO, an AI engineering student. " +
    "Reply ONLY in English, based solely on the dossier below. Be concise (2 to 5 sentences), accurate, honest (junior profile — never invent anything). " +
    "Refer to projects by name. If information is missing, say so and invite the user to contact Ange (hakira.bako@gmail.com). bot_cartographe is a team project.\n\n=== DOSSIER ===\n" + profile,
};

export default function ChatBox({ t, lang, messages, setMessages, touring, tour, onStartTour, onStopTour, onNextTour }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const scrollChat = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  useEffect(() => { scrollChat(); }, [messages, loading]);

  async function ask(question) {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setInput("");
    const next = [...messages, { role: "user", content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const text = await callClaude({
        model: "claude-sonnet-4-20250514", max_tokens: 1000,
        system: SYSTEM[lang] ? SYSTEM[lang](PROFILE) : SYSTEM.fr(PROFILE),
        messages: next.map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages((m) => [...m, { role: "assistant", content: text || t.errorMsg }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.errorMsg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={"chat glass reveal" + (touring ? " float" : "")} style={{ animationDelay: ".25s" }}>
      <div className="chat-head">
        <span className="dot" />
        <span className="tt mono">{t.chatTitle}</span>
        <span className="ss mono">{t.chatSub}</span>
      </div>
      <div className="chat-body" ref={scrollRef}>
        <div className="msg bot"><Typewriter text={t.chatIntro} onTick={scrollChat} /></div>
        {messages.length === 0 && !touring && (
          <div className="chips">
            <button className="chip tour-cta" onClick={onStartTour}>{t.tourBtn}</button>
            {t.suggestions.map((s) => (
              <button key={s} className="chip" onClick={() => ask(s)}>{s}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={"msg " + (m.role === "user" ? "user" : "bot")}>
            {m.role === "assistant" ? <Typewriter text={m.content} onTick={scrollChat} /> : m.content}
          </div>
        ))}
        {loading && <div className="typing"><i /><i /><i /> {t.thinking}…</div>}
      </div>
      <div className="chat-foot">
        {touring ? (
          <div className="tour-ctrl">
            <button className="tbtn stop" onClick={onStopTour}>■ {t.tourStop}</button>
            <span className="tstep mono">{Math.min(tour + 1, TOUR.length)} / {TOUR.length}</span>
            <button className="tbtn next" onClick={onNextTour}>{t.tourNext} →</button>
          </div>
        ) : (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
              placeholder={t.chatPlaceholder}
            />
            <button onClick={() => ask()} disabled={loading || !input.trim()}>→</button>
          </>
        )}
      </div>
    </div>
  );
}

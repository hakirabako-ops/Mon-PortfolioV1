import { useRef, useState } from "react";
import { useNeuralCanvas } from "../hooks/useNeuralCanvas";
import { useGuidedTour } from "../hooks/useGuidedTour";
import ChatBox from "./ChatBox";

export default function HeroSection({ t, lang }) {
  const canvasRef = useRef(null);
  const highlightRef = useRef(null);
  const [messages, setMessages] = useState([]);

  function highlightTarget(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("tour-focus");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.classList.remove("tour-focus"), 2600);
  }
  highlightRef.current = highlightTarget;

  useNeuralCanvas(canvasRef, highlightRef);

  const { tour, touring, startTour, stopTour, nextTour } = useGuidedTour(
    lang,
    (text) => setMessages((m) => [...m, { role: "assistant", content: text }])
  );

  function handleStartTour() {
    setMessages([]);
    startTour();
  }

  return (
    <header className="hero" id="hero">
      <canvas ref={canvasRef} className="neural" />
      <div>
        <span className="status reveal"><span className="dot" />{t.statusLabel}</span>
        <div className="role reveal mono" style={{ animationDelay: ".05s" }}>{t.role}</div>
        <h1 className="reveal" style={{ animationDelay: ".1s" }}>
          <span className="grad">{t.name1}</span><br /><span className="grad">{t.name2}.</span>
        </h1>
        <p className="tag reveal" style={{ animationDelay: ".15s" }}>{t.tagline}</p>
        <div className="neural-hint reveal mono" style={{ animationDelay: ".18s" }}>✦ {t.neuralHint}</div>
      </div>
      <ChatBox
        t={t}
        lang={lang}
        messages={messages}
        setMessages={setMessages}
        touring={touring}
        tour={tour}
        onStartTour={handleStartTour}
        onStopTour={stopTour}
        onNextTour={nextTour}
      />
    </header>
  );
}

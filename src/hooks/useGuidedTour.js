import { useState, useRef, useEffect } from "react";
import { TOUR } from "../data/tour";

export function useGuidedTour(lang, onTourMessage) {
  const [tour, setTour] = useState(null);
  const tourTimer = useRef(null);
  const touring = tour !== null;

  function startTour() {
    if (tourTimer.current) clearTimeout(tourTimer.current);
    setTour(0);
  }

  function stopTour() {
    if (tourTimer.current) clearTimeout(tourTimer.current);
    document.querySelectorAll(".tour-focus").forEach((el) => el.classList.remove("tour-focus"));
    setTour(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextTour() {
    if (tourTimer.current) clearTimeout(tourTimer.current);
    setTour((s) => (s === null ? null : s + 1));
  }

  useEffect(() => {
    if (tour === null) return;
    if (tour >= TOUR.length) { stopTour(); return; }
    const step = TOUR[tour];
    document.querySelectorAll(".tour-focus").forEach((el) => el.classList.remove("tour-focus"));
    const el = document.getElementById(step.target);
    if (el) { el.classList.add("tour-focus"); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
    const text = step[lang];
    if (onTourMessage) onTourMessage(text);
    tourTimer.current = setTimeout(
      () => setTour((s) => (s === null ? null : s + 1)),
      2600 + text.length * 27
    );
    return () => { if (tourTimer.current) clearTimeout(tourTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  return { tour, touring, startTour, stopTour, nextTour };
}

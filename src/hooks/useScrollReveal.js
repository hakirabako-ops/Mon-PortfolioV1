import { useEffect } from "react";

export function useScrollReveal(rootRef, dep) {
  useEffect(() => {
    const els = rootRef.current ? rootRef.current.querySelectorAll(".sr") : [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, dep]);
}

import { useEffect } from "react";

export function useMouseSpotlight(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const move = (e) => {
      root.style.setProperty("--spot-x", e.clientX + "px");
      root.style.setProperty("--spot-y", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rootRef]);
}

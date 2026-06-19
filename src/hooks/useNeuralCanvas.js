import { useEffect } from "react";

const ANCHORS = [
  { label: "bot_cartographe", target: "card-bot" },
  { label: "RUL", target: "card-rul" },
  { label: "Certifications", target: "certs" },
  { label: "Python", target: "skills" },
  { label: "MP2I", target: "about" },
];

export function useNeuralCanvas(canvasRef, highlightRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf;
    const mouse = { x: -999, y: -999, on: false };
    let nodes = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(58, Math.floor((w * h) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, anchor: null,
      }));
      const step = Math.max(1, Math.floor(nodes.length / ANCHORS.length));
      ANCHORS.forEach((a, i) => { const n = nodes[i * step]; if (n) n.anchor = a; });
    }

    let hovered = null;
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 4 || n.x > w - 4) n.vx *= -1;
        if (n.y < 16 || n.y > h - 4) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 125) {
            ctx.strokeStyle = "rgba(94,214,196," + (1 - d / 125) * 0.45 + ")";
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      hovered = null;
      for (const n of nodes) {
        if (n.anchor) {
          const hot = mouse.on && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 24;
          if (hot) hovered = n;
          ctx.shadowColor = "rgba(94,214,196,.9)"; ctx.shadowBlur = hot ? 22 : 12;
          ctx.fillStyle = "rgba(139,156,255,1)";
          ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 8 : 5.5, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 13 : 10, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(94,214,196," + (hot ? 0.95 : 0.5) + ")"; ctx.lineWidth = 1.4; ctx.stroke();
          ctx.font = (hot ? "600 " : "500 ") + "12px 'IBM Plex Mono', monospace";
          ctx.fillStyle = hot ? "rgba(233,234,241,1)" : "rgba(170,176,190,.8)";
          ctx.textAlign = "center";
          ctx.fillText(n.anchor.label, n.x, n.y - 17);
        } else {
          ctx.fillStyle = "rgba(139,156,255,.75)";
          ctx.beginPath(); ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2); ctx.fill();
        }
      }
      const hero = document.getElementById("hero");
      if (hero) hero.style.cursor = hovered ? "pointer" : "";
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x >= 0 && x <= w && y >= 0 && y <= h) { mouse.x = x; mouse.y = y; mouse.on = true; }
      else { mouse.on = false; }
    }

    function onClick(e) {
      if (e.target.closest && e.target.closest(".chat, nav, a, button, textarea, input")) return;
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      for (const n of nodes) {
        if (n.anchor && Math.hypot(n.x - mx, n.y - my) < 22) {
          if (highlightRef.current) highlightRef.current(n.anchor.target);
          break;
        }
      }
    }

    resize(); tick();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
    };
  }, [canvasRef, highlightRef]);
}

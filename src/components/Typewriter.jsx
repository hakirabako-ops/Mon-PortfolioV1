import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 9, onTick }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(Math.min(i, text.length));
      if (onTick) onTick();
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="caret" style={{ opacity: n < text.length ? 1 : 0 }}>▍</span>
    </>
  );
}

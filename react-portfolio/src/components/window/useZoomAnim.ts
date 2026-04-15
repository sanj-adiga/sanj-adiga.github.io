import { useState, useEffect, useCallback } from "react";

export function useZoomAnim(visible: boolean) {
  const [phase, setPhase] = useState("closed");

  useEffect(() => {
    if (visible) {
      setPhase("mounting");
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("open"))
      );
      return () => cancelAnimationFrame(id);
    } else {
      setPhase(p =>
        p === "open" || p === "mounting" ? "closing" : p
      );
    }
  }, [visible]);

  const onTransitionEnd = useCallback(() => {
    setPhase(p => (p === "closing" ? "closed" : p));
  }, []);

  return {
    isRendered: phase !== "closed",
    onTransitionEnd,
    zoomStyle: {
      transformOrigin: "center bottom",
      transition:
        "transform 240ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
      transform: phase === "open" ? "scale(1)" : "scale(0.35)",
      opacity: phase === "open" ? 1 : 0,
      pointerEvents: phase === "open" ? "auto" : "none",
    },
  };
}

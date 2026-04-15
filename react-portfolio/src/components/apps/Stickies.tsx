import { useState, useCallback, useRef,  } from "react";
import { useZoomAnim } from "../window/useZoomAnim";
import { clamp } from "../../utils/clamp";

type StickiesProps = {
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  z: number;
};

export default function Stickies({ visible, onClose, onFocus, z }: StickiesProps) {
  const ref  = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ ox: number; oy: number } | null>(null);
  const [pos, setPos]     = useState({ x: 55, y: 290 });
  const [text, setText]   = useState("Hi, I'm Sanjana. Welcome to my portfolio!\n\nClick apps in the Dock below to explore :)");
  const { isRendered, zoomStyle, onTransitionEnd } = useZoomAnim(visible);

  // Use center-center zoom origin for the note
  const noteZoom = { ...zoomStyle, transformOrigin: "center center" };

  const startDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.tagName === "TEXTAREA") return;
    if (e.target.closest("[data-nodrag]")) return;
    if (e.button !== 0) return;
    e.preventDefault();
    onFocus();
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = { ox: e.clientX - r.left, oy: e.clientY - r.top };
    document.body.style.userSelect = "none";
    const onMove = (ev: PointerEvent) => {
      if (!drag.current) return;
      const w = ref.current?.offsetWidth  || 220;
      const h = ref.current?.offsetHeight || 250;
      setPos({
        x: clamp(ev.clientX - drag.current.ox, 0, window.innerWidth  - w),
        y: clamp(ev.clientY - drag.current.oy, 24, window.innerHeight - h - 80),
      });
    };
    const onUp = () => {
      drag.current = null;
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup",   onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
  }, [onFocus]);

  if (!isRendered) return null;

  // Hot pink palette — matches the screenshot
  const BG     = "#ff84be";
  const HEADER = "#e8609a";
  const BORDER = "#cc4080";

  return (
    <div
      ref={ref}
      onMouseDown={onFocus}
      onPointerDown={startDrag}
      onTransitionEnd={onTransitionEnd}
      style={{
        position: "fixed", left: pos.x, top: pos.y,
        width: 220,
        zIndex: z,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "3px 5px 16px rgba(0,0,0,.38), 0 1px 4px rgba(0,0,0,.22)",
        border: `1.5px solid ${BORDER}`,
        display: "flex", flexDirection: "column",
        ...noteZoom as React.CSSProperties,
      }}
    >
      {/* ── Stickies header bar ── */}
      <div style={{
        height: 20, flexShrink: 0,
        background: `linear-gradient(180deg, #ff9acc 0%, ${HEADER} 100%)`,
        borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5px",
        userSelect: "none",
        cursor: "default",
      }}>
        {/* Classic Mac square close button */}
        <div
          data-nodrag
          onClick={onClose}
          title="Close"
          style={{
            width: 10, height: 10,
            border: "1.5px solid rgba(0,0,0,.45)",
            borderRadius: 1,
            background: "rgba(255,255,255,.35)",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background .1s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>)=> e.currentTarget.style.background = "rgba(255,255,255,.62)"}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.background = "rgba(255,255,255,.35)"}
        />

        {/* Decorative resize triangle — top-right classic Mac style */}
        <div data-nodrag style={{
          width: 0, height: 0,
          borderLeft: "9px solid transparent",
          borderBottom: "9px solid rgba(0,0,0,.22)",
          cursor: "se-resize",
          flexShrink: 0,
        }} />
      </div>

      {/* ── Note body ── */}
      <div style={{ position: "relative", flex: 1, background: BG, minHeight: 180 }}>
        {/* Lined-paper underlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(180deg, transparent, transparent 23px, rgba(0,0,0,.08) 23px, rgba(0,0,0,.08) 24px)",
          backgroundPositionY: "9px",
        }} />
        <textarea
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          style={{
            position: "relative",
            display: "block",
            width: "100%", height: "100%",
            minHeight: 180,
            background: "transparent",
            border: "none", outline: "none",
            resize: "none",
            padding: "9px 11px",
            fontFamily: "'Lucida Grande','Helvetica Neue',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#1a0028",
            cursor: "text",
          }}
        />
      </div>
    </div>
  );
}

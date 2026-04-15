import TrafficLights from "./TrafficLights";
import { clamp } from "../../utils/clamp";
import { useZoomAnim } from "./useZoomAnim";
import {useState, useRef, useCallback} from "react";

type AppWindowProps = {
  title: string;
  width?: number;
  height?: number;
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPos: {x: number, y: number};
  children?: React.ReactNode;
};


export default function AppWindow({ title, width, height, visible, onClose, onFocus, zIndex, defaultPos, children }: AppWindowProps) {
  const ref  = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ ox: number; oy: number } | null>(null);
  const [pos, setPos] = useState(defaultPos || { x: 80, y: 50 });
  const { isRendered, zoomStyle, onTransitionEnd } = useZoomAnim(visible);

  const handleDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onFocus();
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = { ox: e.clientX - r.left, oy: e.clientY - r.top };
    document.body.style.userSelect = "none";
    const onMove = (ev: PointerEvent) => {
      if (!drag.current) return;
      const w = ref.current?.offsetWidth  || width  || 400;
      const h = ref.current?.offsetHeight || height || 300;
      setPos({
        x: clamp(ev.clientX - drag.current.ox, 0, AppWindow.innerWidth  - w),
        y: clamp(ev.clientY - drag.current.oy, 24, AppWindow.innerHeight - h - 80),
      });
    };
    const onUp = () => {
      drag.current = null;
      document.body.style.userSelect = "";
      AppWindow.removeEventListener("pointermove", onMove);
      AppWindow.removeEventListener("pointerup",   onUp);
    };
    AppWindow.addEventListener("pointermove", onMove);
    AppWindow.addEventListener("pointerup",   onUp);
  }, [onFocus, width, height]);

  if (!isRendered) return null;

  return (
    <div ref={ref} onMouseDown={onFocus} onTransitionEnd={onTransitionEnd} style={{
      position: "fixed", left: pos.x, top: pos.y,
      width: width || 500,
      zIndex,
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 10px 40px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.75)",
      border: "1px solid rgba(80,100,140,.35)",
      display: "flex", flexDirection: "column",
      background: "rgba(235,242,252,.97)",
      ...zoomStyle as React.CSSProperties,
    }}>
      {/* Title bar */}
      <div onPointerDown={handleDown} style={{
        height: 22, flexShrink: 0,
        background: "linear-gradient(180deg,#f6f6f6 0%,#e0e0e0 60%,#c8c8c8 100%)",
        borderBottom: "1px solid #aaa",
        display: "flex", alignItems: "center",
        padding: "0 8px", gap: 8,
        cursor: "default", userSelect: "none",
        borderRadius: "7px 7px 0 0",
      }}>
        <TrafficLights onClose={onClose} />
        <span style={{
          flex: 1, textAlign: "center",
          fontSize: 11, fontWeight: 600, color: "#333",
          fontFamily: "'Lucida Grande','Helvetica Neue',sans-serif",
          letterSpacing: .2, marginRight: 42,
        }}>{title}</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", minHeight: height || 200 }}>
        {children}
      </div>
    </div>
  );
}
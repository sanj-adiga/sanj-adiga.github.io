import { DOCK_APPS } from "./dockApps";
import { useState } from "react";

type DockProps = {
  onClick: (id: string) => void;
  openWins: string[];
};


export default function Dock({ onClick, openWins }: DockProps) {
  const [hov, setHov]       = useState<string | null >(null);
  const [bounce, setBounce] = useState<string | null >(null);
  const click = (id: string) => { setBounce(id); setTimeout(() => setBounce(null), 550); onClick(id); };

  return (
    <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "flex-end", gap: 3, background: "rgba(255,255,255,.22)", backdropFilter: "blur(20px) saturate(1.8)", border: "1px solid rgba(255,255,255,.5)", borderRadius: 16, padding: "6px 10px", boxShadow: "0 4px 24px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.55)", zIndex: 9997 }}>
      {DOCK_APPS.map(a => {
        const isH = hov === a.id, isB = bounce === a.id, isOpen = openWins.includes(a.id);
        return (
          <div key={a.id} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
            onMouseEnter={() => setHov(a.id)} onMouseLeave={() => setHov(null)} onClick={() => click(a.id)}>
            {isH && (
              <div style={{ position: "absolute", bottom: "calc(100% + 6px)", background: "rgba(20,20,20,.85)", color: "#fff", fontSize: 10, padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none", fontFamily: "'Lucida Grande',sans-serif" }}>{a.tip}</div>
            )}
            <span
              style={{
                fontSize: 36,
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                cursor: "pointer",
                transform: `scale(${isH ? 1.4 : 1}) translateY(${isH ? -6 : 0}px)`,
                transition: "transform .18s cubic-bezier(.34,1.56,.64,1)",
                animation: isB ? "dockB .5s cubic-bezier(.34,1.56,.64,1)" : "none",
                filter: isH
                  ? "drop-shadow(0 4px 8px rgba(0,0,0,.45))"
                  : "drop-shadow(0 2px 3px rgba(0,0,0,.2))",
              }}
            >
              <img
                src={a.icon}
                alt={a.tip}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </span>

            {/* Running indicator dot */}
            {isOpen && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff", boxShadow: "0 0 4px rgba(255,255,255,.9)", marginTop: 2 }} />}
          </div>
        );
      })}
    </div>
  );
}
import { useEffect, useState } from "react";

type MenuBarProps = {
  app: string;
  time: string;
};

export default function MenuBar({ app, time }: MenuBarProps) {
  const [open, setOpen] = useState(false);
  const pinstripe = "repeating-linear-gradient(180deg,#f6f6f6,#f6f6f6 3px,#e2e2e2 3px,#e2e2e2 4px)";
  const items = ["About This Mac","—","Home Page","Projects","Contact Me","—","Shut Down…"];
  useEffect(() => {
    const h = () => setOpen(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 24, background: pinstripe, borderBottom: "1px solid #999", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", zIndex: 9999, fontFamily: "'Lucida Grande','Helvetica Neue',sans-serif", fontSize: 13, color: "#222", userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", cursor: "pointer" }} onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>
          <span style={{ fontSize: 16 }}>🍎</span>
          {open && (
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "100%", left: -4, background: "rgba(242,242,242,.98)", backgroundImage: pinstripe, border: "1px solid #aaa", borderRadius: 5, boxShadow: "0 4px 14px rgba(0,0,0,.28)", minWidth: 160, zIndex: 10001, padding: "4px 0" }}>
              {items.map((it, i) => it === "—"
                ? <div key={i} style={{ height: 1, background: "#bbb", margin: "3px 0" }} />
                : <div key={i} style={{ padding: "4px 14px", fontSize: 13, cursor: "default" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(180deg,#4d88d9,#2461bb)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}
                  >{it}</div>
              )}
            </div>
          )}
        </div>
        <strong style={{ fontWeight: 700 }}>{app}</strong>
        {["File","Edit","View","Go","Help"].map(m => <span key={m} style={{ opacity: .75 }}>{m}</span>)}
      </div>
      <span style={{ fontSize: 12, letterSpacing: .4 }}>{time}</span>
    </div>
  );
}
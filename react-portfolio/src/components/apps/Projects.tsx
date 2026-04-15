import Window from "../window/AppWindow";

const PROJECTS = [
  { title: "Space Shooter Game", year: "2023", emoji: "🚀", desc: "Custom game for Western Engineering Competition — logic puzzles, multi-level gameplay.", tags: ["C++","OpenGL","GLSL"] },
  { title: "Portfolio OS",        year: "2025", emoji: "🖥️", desc: "This site — Mac OS X Jaguar–inspired portfolio, now React/TypeScript.", tags: ["React","TypeScript","CSS"] },
  { title: "ML Security Tool",    year: "2024", emoji: "🔐", desc: "ML pipeline detecting anomalous network patterns with accessible visualizations.", tags: ["Python","scikit-learn","D3.js"] },
  { title: "Visual Storytelling", year: "2024", emoji: "🎨", desc: "Renders complex datasets as narrative-driven graphical stories.", tags: ["Three.js","WebGL","Python"] },
];
type ProjectProps = {
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  z: number;
};
export default function Projects({ visible, onClose, onFocus, z }: ProjectProps) {
  const pinstripe = "repeating-linear-gradient(180deg,#fafafa,#fafafa 3px,#efefef 3px,#efefef 4px)";
  return (
    <Window title="Projects.rtf — Saved" width={500} height={420} visible={visible} onClose={onClose} onFocus={onFocus} zIndex={z} defaultPos={{ x: 240, y: 70 }}>
      <div style={{ background: pinstripe, height: "100%", overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 5, padding: "4px 8px", background: "linear-gradient(180deg,#e6e6e6,#d2d2d2)", borderBottom: "1px solid #bbb", alignItems: "center" }}>
          {[["B","bold"],["I","italic"],["U","normal"]].map(([l, fw]) => <button key={l} style={{ background: "linear-gradient(180deg,#efefef,#d8d8d8)", border: "1px solid #aaa", borderRadius: 3, width: 20, height: 18, fontSize: 11, fontWeight: fw, cursor: "default" }}>{l}</button>)}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>12pt</span>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 4 }}>Projects</h2>
          <p style={{ fontSize: 12, color: "#666", marginBottom: 14 }}>Some cool applications I've worked on.</p>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ marginBottom: 14, padding: 11, background: "rgba(255,255,255,.72)", border: "1px solid rgba(0,0,0,.09)", borderRadius: 7, boxShadow: "0 1px 3px rgba(0,0,0,.07)", transition: "box-shadow .15s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,.13)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.07)"}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 13, color: "#1a2b4a" }}>{p.title}</strong>
                    <span style={{ fontSize: 10, color: "#888" }}>{p.year}</span>
                  </div>
                  <p style={{ fontSize: 11.5, color: "#444", margin: "4px 0 7px", lineHeight: 1.5 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} style={{ background: "linear-gradient(180deg,#d6e8f8,#b6d0f0)", border: "1px solid #90b8e0", borderRadius: 10, padding: "1px 8px", fontSize: 10, color: "#1a4a7a" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}


import AsciiCanvas from "../shared/AsciiCanvas"
import Window from "../window/AppWindow";

type SafariProps = {
  visible: boolean;
  onClose: () => void;
  onFocus: () => void;
  z: number;
};

export default function Safari({ visible, onClose, onFocus, z }: SafariProps) {
  const tags = ["C++","OpenGL","GLSL","Python","React","TypeScript","ML","Cybersecurity"];
  return (
    <Window title="Safari" width={600} height={460} visible={visible} onClose={onClose} onFocus={onFocus} zIndex={z} defaultPos={{ x: 100, y: 40 }}>
      <div style={{ background: "linear-gradient(180deg,#e4e4e4,#cfcfcf)", borderBottom: "1px solid #bbb", display: "flex", alignItems: "center", gap: 5, padding: "3px 8px" }}>
        {["◀","▶","↺","＋"].map((b, i) => <button key={i} style={{ background: "linear-gradient(180deg,#efefef,#d8d8d8)", border: "1px solid #aaa", borderRadius: 4, padding: "1px 7px", fontSize: 11, cursor: "default" }}>{b}</button>)}
        <input readOnly value="https://www.welcome.html" style={{ flex: 1, fontSize: 12, padding: "2px 6px", border: "1px solid #aaa", borderRadius: 4, background: "#fff", fontFamily: "monospace", color: "#333" }} />
        <input placeholder="Google" style={{ width: 80, fontSize: 11, padding: "2px 5px", border: "1px solid #aaa", borderRadius: 4 }} />
      </div>
      <div style={{ overflowY: "auto", height: "calc(100% - 30px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "linear-gradient(180deg,#f5f0e0,#ece5c8)", borderBottom: "1px solid #ddd" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#b8cce8,#7aaad0)", border: "3px solid rgba(255,255,255,.8)", boxShadow: "0 2px 8px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, flexShrink: 0 }}>👩🏽‍💻</div>
          <AsciiCanvas />
        </div>
        <div style={{ padding: "14px 18px", fontFamily: "'Lucida Grande',Georgia,serif", fontSize: 12.5, lineHeight: 1.72, color: "#1a1a1a" }}>
          <p style={{ marginBottom: 8 }}>
            {[["resume","#"],["linkedin","https://www.linkedin.com/in/sanjana-adiga/"],["github","https://github.com/sanj-adiga"]].map(([l, h], i, arr) => (
              <span key={l}><a href={h} target="_blank" rel="noreferrer" style={{ color: "#1a5fac" }}>{l}</a>{i < arr.length - 1 ? " -- " : ""}</span>
            ))}
          </p>
          <h2 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45, color: "#111", margin: "8px 0" }}>I'm studying Software Engineering at Western University and am constantly inspired by how code, design, and community can shape better futures.</h2>
          <p style={{ marginBottom: 7 }}>I like building things at the intersection of machine learning, visual storytelling, and people-first design. I want to create systems that are secure, expressive, and joyful.</p>
          <p style={{ marginBottom: 6 }}>I'm curious about a lot:</p>
          <ul style={{ paddingLeft: 18, marginBottom: 7 }}>
            {["how we use computer graphics to visualize complex systems","how to make cybersecurity more intuitive and accessible","how to use machine learning to create more inclusive and accessible systems","how technology can support people and communities, grounded in long-term sustainability"].map((t, i) => <li key={i} style={{ marginBottom: 3 }}>{t}</li>)}
          </ul>
          <p style={{ marginBottom: 7 }}>I'm also building up my running distance, watching lots of movies (Sinners for the 4th time), and exploring how sustainability and engineering can align in the tools we actually use.</p>
          <p style={{ marginBottom: 7 }}>I get excited about systems that are resilient, expressive, and designed with care. I love working with kind, curious people who are down to co-build something weird.</p>
          <p>If that's you, say hi :)</p>
          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 5 }}>
            {tags.map(t => <span key={t} style={{ background: "linear-gradient(180deg,#fbd0da,#f5aabc)", border: "1px solid #d08098", borderRadius: 12, padding: "2px 10px", fontSize: 10.5, color: "#7a2040" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </Window>
  );
}
import { useState, useEffect } from "react";
import MenuBar from "./components/menubar/MenuBar";
import Dock from "./components/dock/Dock";
import Boot from "./components/desktop/Boot"
import Safari from "./components/apps/Safari";
import Projects from "./components/apps/Projects";
import DeskIcons from "./components/desktop/DeskIcons";
import Contact from "./components/apps/Contact";
import About from "./components/apps/About";
import Stickies from "./components/apps/Stickies";
import { nextZ } from "./utils/zIndex";

import "./App.css"
import "./index.css"

type WindowId =
  | "safari"
  | "projects"
  | "contact"
  | "stickies"
  | "about";


type WindowState = {
  v: boolean;
  z: number;
};

type Windows = Record<WindowId, WindowState>;

export default function App() {
  const [booted,    setBooted]    = useState(false);
  const [time,      setTime]      = useState("");
  const [activeApp, setActiveApp] = useState("Finder");

  const [wins, setWins] = useState<Windows>({
    safari:   { v: false, z: 100 },
    projects: { v: false, z: 100 },
    contact:  { v: false, z: 100 },
    stickies: { v: false, z: 100 },
    about:    { v: false, z: 100 },
  });

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`);
    };
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
  }, []);

  const APP_NAMES: Record<WindowId, string> = { safari: "Safari", projects: "TextEdit", contact: "Address Book", stickies: "Stickies", about: "About This Mac" };
  const open  = (id: WindowId) => setWins(w => ({ ...w, [id]: { v: true,  z: nextZ() } }));
  const close = (id: WindowId) => setWins(w => ({ ...w, [id]: { ...w[id], v: false } }));
  const focus = (id: WindowId) => { setWins(w => ({ ...w, [id]: { ...w[id], z: nextZ() } })); setActiveApp(APP_NAMES[id] || "Finder"); };

  const dockClick = (id: string) => {
    const map: Record<string, WindowId> = { safari: "safari", projects: "projects", contact: "contact", stickies: "stickies", finder: "about" };
    const wid = map[id]; if (!wid) return;
    wins[wid].v ? focus(wid) : (open(wid), setTimeout(() => focus(wid), 10));
  };

  const openWins = Object.entries(wins).filter(([, w]) => w.v).map(([id]) => id as WindowId);

  if (!booted) return <Boot onDone={() => setBooted(true)} />;

  return (
    <>
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dockB  { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-18px)} 65%{transform:translateY(-7px)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,.06); }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.26); border-radius: 3px; }
        body { margin: 0; overflow: hidden; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
      `}</style>

      {/* Wallpaper */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "linear-gradient(175deg,#1a4080 0%,#2868b8 28%,#4a8ed4 52%,#72b8ec 72%,#a4d8f8 88%,#c8eeff 100%)" }}>
        <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, height: 100, background: "radial-gradient(ellipse 80% 60% at 30% 80%, rgba(255,255,255,.07) 0%, transparent 70%)" }} />
      </div>

      <MenuBar app={activeApp} time={time} />
      <DeskIcons />

      <Safari   visible={wins.safari.v}   z={wins.safari.z}   onClose={() => close("safari")}   onFocus={() => focus("safari")} />
      <Projects visible={wins.projects.v} z={wins.projects.z} onClose={() => close("projects")} onFocus={() => focus("projects")} />
      <Contact  visible={wins.contact.v}  z={wins.contact.z}  onClose={() => close("contact")}  onFocus={() => focus("contact")} />
      <Stickies visible={wins.stickies.v} z={wins.stickies.z} onClose={() => close("stickies")} onFocus={() => focus("stickies")} />
      <About    visible={wins.about.v}    z={wins.about.z}    onClose={() => close("about")}    onFocus={() => focus("about")} />

      <Dock onClick={dockClick} openWins={openWins} />
    </>
  );
}

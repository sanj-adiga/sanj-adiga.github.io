import { useState } from "react";
import { nextZ } from "../utils/zIndex";


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

export function useWindowManager() {
  const [wins, setWins] = useState<Windows>({
    safari:   { v: false, z: 100 },
    projects: { v: false, z: 100 },
    contact:  { v: false, z: 100 },
    stickies: { v: false, z: 100 },
    about:    { v: false, z: 100 },
  });

  const open = (id: WindowId) =>
    setWins(w => ({ ...w, [id]: { v: true, z: nextZ() } }));

  const close = (id: WindowId) =>
    setWins(w => ({ ...w, [id]: { ...w[id], v: false } }));

  const focus = (id: WindowId) =>
    setWins(w => ({ ...w, [id]: { ...w[id], z: nextZ() } }));

  const openWins = Object.entries(wins)
    .filter(([, w]) => w.v)
    .map(([id]) => id as WindowId);

  return { wins, open, close, focus, openWins };
}

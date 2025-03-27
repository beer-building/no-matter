// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { browser } from "$app/environment";
import "../colors.css";
import "../common.css";

// patch fetch to use the Tauri fetch without cors
if (browser) {
  const ogFetch = window.fetch;
  window.fetch = (...props) => {
    if ((props[0] as any)?.startsWith("ipc")) {
      return ogFetch(...props);
    }
    return tauriFetch(...props);
  };
}

export const prerender = false;
export const ssr = false;

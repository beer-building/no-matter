// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
export const prerender = true;
export const ssr = false;
import { browser } from "$app/environment";
import "../colors.css";
import "../common.css";

if (browser) {
  const ogFetch = window.fetch;
  window.fetch = (...props) => {
    console.log(...props);
    if (props[0]?.startsWith("ipc")) {
      return ogFetch(...props);
    }
    return tauriFetch(...props);
  };
}

// patch fetch to use the Tauri fetch without cors
// globalThis.fetch = fetch;

import { useSyncExternalStore } from 'react';

// A small history router. The site has two kinds of page, home and /work/:id,
// so it only tracks the path. Hash links on the same page stay native.
// Scroll positions are handled by the app, so the browser mustn't restore them.
const listeners = new Set();
let last = 'load';

window.history.scrollRestoration = 'manual';
window.addEventListener('popstate', () => {
  last = 'pop';
  listeners.forEach((fn) => fn());
});

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname);
}

// How the current page was reached: 'load', 'push' or 'pop' (back and forward).
export function lastNav() {
  return last;
}

export function navigate(to) {
  // Remember where this page was scrolled to, so Back can return there.
  window.history.replaceState({ ...window.history.state, y: window.scrollY }, '');
  window.history.pushState({}, '', to);
  last = 'push';
  listeners.forEach((fn) => fn());
}

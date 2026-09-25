// Shared, mutable state read by the WebGL loop every frame.
// Written from scroll handlers and effects, never during render.
export const cosmos = {
  fall: 0,
  dist: 26,
  incl: 0.2,
  fov: 1.75,
  roll: 0.18,
  bh: [0, 0],
  // The camera before any scroll, where the lighter mode takes its still frame.
  rest: { dist: 26, incl: 0.2, fov: 1.75, bh: [0, 0] },
};

export const DIST_END = 1.3;

export function distForFall(fall, start) {
  return start + (DIST_END - start) * Math.pow(fall, 1.5);
}

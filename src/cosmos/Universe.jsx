import { useEffect, useRef } from 'react';
import { VERT, FRAG } from './shader';
import { cosmos } from './store';
import { worlds } from './data';
import { PALETTE } from './themes';

const COLORS = ['diskHot', 'diskMid', 'diskCool', 'glow', 'neb1', 'neb2', 'neb3', 'beam'];
const UNIFORMS = ['uRes', 'uTime', 'uDist', 'uFall', 'uIncl', 'uFov', 'uRoll', 'uIntro', 'uLensE', 'uScroll',
  'uMouse', 'uCursor', 'uBH', 'uW', 'uPulsar', 'uP', 'uPA', 'uPC', 'uPass', 'uStill', 'uRest',
  'uDiskHot', 'uDiskMid', 'uDiskCool', 'uGlow', 'uNeb1', 'uNeb2', 'uNeb3', 'uBeam'];
const MAX_PIXELS = 4.2e6;
const MIN_SCALE = 0.55; // lowest render resolution, in device pixels per CSS pixel
const PLANETS = 6; // the length of uP, uPA and uPC in shader.js
const FLIGHT = 1100; // ms for a planet to fly to its slot on a new page

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
// Frame-rate independent smoothing: `rate` is the fraction covered per 60 fps frame.
const ease = (rate, dt) => 1 - Math.pow(1 - rate, dt / 16.667);
const inOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(2 - 2 * k, 3) / 2);
const uniformName = (key) => `u${key[0].toUpperCase()}${key.slice(1)}`;

// Converts an element's box to shader uv space: origin at screen centre, y up, units of screen height.
function slotToUv(el, W, H) {
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  return [(x - W / 2) / H, (H / 2 - y) / H, (Math.min(r.width, r.height) / 2) / H];
}

export function Universe() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const root = document.documentElement;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    const fail = () => { root.classList.add('no-gl'); };
    if (!gl) { fail(); return undefined; }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { fail(); return undefined; }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      fail();
      return undefined;
    }
    root.classList.remove('no-gl');
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = {};
    UNIFORMS.forEach((n) => { u[n] = gl.getUniformLocation(prog, n); });
    COLORS.forEach((k) => gl.uniform3fv(u[uniformName(k)], PALETTE[k]));

    // Each world's planet keeps its look; only its place on screen changes.
    const looks = worlds.slice(0, PLANETS);
    const pa = new Float32Array(PLANETS * 4);
    const pc = new Float32Array(PLANETS * 4);
    looks.forEach(({ planet: p }, i) => {
      pa.set([...p.axis, p.style], i * 4);
      pc.set([...p.atm, p.rings], i * 4);
    });
    gl.uniform4fv(u.uPA, pa);
    gl.uniform4fv(u.uPC, pc);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    // Render at up to 1.5 device pixels per CSS pixel, per scene. A scene that
    // can't hold the frame rate steps its own resolution down; lighter scenes keep theirs.
    const maxScale = Math.min(window.devicePixelRatio || 1, 1.5);
    const sceneScale = [maxScale, maxScale, maxScale, maxScale];
    let scale = maxScale;
    let W = 0;
    let H = 0;
    // Lighter mode, for devices that can't trace the black hole live even at the
    // lowest resolution: it is rendered once, from where the page starts, into a
    // texture, and the fall zooms into that still. Everything else stays live.
    // ?still in the URL turns it on, to preview it.
    let still = false;
    let stillReady = false;
    let stillFor = '';
    let tex = null;
    let fbo = null;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const s = Math.min(scale, Math.sqrt(MAX_PIXELS / (W * H)));
      canvas.width = Math.max(2, Math.round(W * s));
      canvas.height = Math.max(2, Math.round(H * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const goStill = () => {
      still = true;
      root.dataset.blackhole = 'still';
      // Drawing from the still is cheap, so it can go back to a sharp resolution.
      scale = Math.min(maxScale, 1.25);
      sceneScale[0] = scale;
      resize();
    };
    const capture = (t) => {
      if (!tex) { tex = gl.createTexture(); fbo = gl.createFramebuffer(); }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null); // not bound for sampling while it is drawn into
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
        const r = cosmos.rest;
        gl.uniform1f(u.uPass, 1);
        gl.uniform2f(u.uRes, canvas.width, canvas.height);
        gl.uniform1f(u.uTime, t);
        gl.uniform1f(u.uDist, r.dist);
        gl.uniform1f(u.uFall, 0);
        gl.uniform1f(u.uIncl, r.incl);
        gl.uniform1f(u.uFov, r.fov);
        gl.uniform1f(u.uRoll, cosmos.roll);
        gl.uniform1f(u.uIntro, 1);
        gl.uniform2f(u.uMouse, 0, 0);
        gl.uniform2f(u.uBH, r.bh[0], r.bh[1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.uniform1f(u.uPass, 0);
        gl.uniform4f(u.uRest, r.bh[0], r.bh[1], r.dist, r.fov);
        stillReady = true;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      stillFor = `${W}x${H}`;
    };
    if (new URLSearchParams(window.location.search).has('still')) goStill();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, cx: 0, cy: 0.9, tcx: 0, tcy: 0.9, lens: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / W) * 2 - 1;
      mouse.ty = -((e.clientY / H) * 2 - 1);
      mouse.tcx = (e.clientX - W / 2) / H;
      mouse.tcy = (H / 2 - e.clientY) / H;
      mouse.lens = 1;
    };
    const onLeave = () => { mouse.lens = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);

    // Where each planet is drawn: pos = [x, y, radius] in uv units, a = opacity,
    // el = the slot it sits in, fly = its flight to a new slot, if one is under way.
    const planets = looks.map((w) => ({ id: w.id, ring: w.planet.rings > 0, pos: null, a: 0, el: null, fly: null }));
    const pv = new Float32Array(PLANETS * 4);
    let lensE = 0;
    let dominant = 0;
    let warm = 8;
    let times = [];
    let last = performance.now();
    const start = last;
    let raf = 0;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const rawDt = now - last;
      last = now;
      const dt = Math.min(100, rawDt);
      const t = reduce ? 40 : (now - start) / 1000;
      const intro = reduce ? 1 : Math.min(1, t / 2.2);

      const w = [0, 0, 0, 0];
      document.querySelectorAll('[data-scene]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const vis = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)) / H;
        const i = Number(el.dataset.scene);
        w[i] = Math.max(w[i], vis);
      });
      if (w[0] + w[1] + w[2] + w[3] < 0.001) w[0] = 1;

      // Per-scene resolution. Every 12 frames, a scene whose median frame is slower
      // than ~45 fps jumps straight to the resolution that should hold 60 (the cost
      // follows the pixel count). If the black hole would need less than MIN_SCALE,
      // it switches to the still. Hidden tabs and the frames just after a change
      // don't count, and the median ignores one-off hiccups.
      const dom = w.indexOf(Math.max(...w));
      if (dom !== dominant) {
        dominant = dom;
        warm = 8;
        times = [];
        if (sceneScale[dom] !== scale) { scale = sceneScale[dom]; resize(); }
      }
      if (!reduce && !document.hidden && rawDt < 1000 && !(still && dominant === 0)) {
        if (warm > 0) {
          warm -= 1;
        } else {
          times.push(rawDt);
          if (times.length === 12) {
            const median = times.sort((a, b) => a - b)[6];
            times = [];
            if (median > 22) {
              const want = scale * Math.sqrt(18 / median);
              if (want < MIN_SCALE && dominant === 0) goStill();
              else if (scale > MIN_SCALE) {
                scale = Math.max(MIN_SCALE, want);
                sceneScale[dominant] = scale;
                resize();
              }
              warm = 8;
            }
          }
        }
      }
      if (still && w[0] > 0.002 && stillFor !== `${W}x${H}`) capture(t);

      mouse.x = lerp(mouse.x, mouse.tx, ease(0.04, dt));
      mouse.y = lerp(mouse.y, mouse.ty, ease(0.04, dt));
      mouse.cx = lerp(mouse.cx, mouse.tcx, ease(0.18, dt));
      mouse.cy = lerp(mouse.cy, mouse.tcy, ease(0.18, dt));
      lensE = lerp(lensE, finePointer && !reduce ? mouse.lens * 0.0011 : 0, ease(0.08, dt));

      // Each planet sits in the [data-planet] slot with its id and tracks it exactly
      // while you scroll. When that slot is replaced (a new page), the planet flies
      // from where it was to the new one; with no slot it shrinks away and fades.
      const slots = new Map();
      document.querySelectorAll('[data-planet]').forEach((el) => {
        if (!slots.has(el.dataset.planet)) slots.set(el.dataset.planet, el);
      });
      planets.forEach((p, i) => {
        const el = slots.get(p.id);
        const target = el ? slotToUv(el, W, H) : null;
        if (target && target[2] > 0) {
          // A ringed planet is drawn smaller so its rings fit inside the slot.
          target[2] *= p.ring ? 0.46 : 0.82;
          if (el !== p.el) {
            p.fly = p.pos && p.a > 0.05 && !reduce ? { from: p.pos, t0: now } : null;
            p.el = el;
          }
          if (p.fly) {
            const k = Math.min(1, (now - p.fly.t0) / FLIGHT);
            p.pos = lerp3(p.fly.from, target, inOut(k));
            if (k === 1) p.fly = null;
          } else {
            p.pos = target;
          }
          p.a = lerp(p.a, 1, ease(0.12, dt));
        } else {
          p.el = null;
          p.fly = null;
          p.a = lerp(p.a, 0, ease(0.2, dt));
          if (p.pos) p.pos = [p.pos[0], p.pos[1], p.pos[2] * Math.pow(0.97, dt / 16.667)];
        }
        if (p.pos) pv.set([p.pos[0], p.pos[1], p.pos[2], p.a > 0.003 ? p.a : 0], i * 4);
      });
      const qSlot = document.querySelector('[data-pulsar-slot]');
      const pu = qSlot ? slotToUv(qSlot, W, H) : [0.3, 0, 0.1];

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, t);
      gl.uniform1f(u.uDist, cosmos.dist);
      gl.uniform1f(u.uFall, cosmos.fall);
      gl.uniform1f(u.uIncl, cosmos.incl);
      gl.uniform1f(u.uFov, cosmos.fov);
      gl.uniform1f(u.uRoll, cosmos.roll);
      gl.uniform1f(u.uIntro, intro * intro * (3 - 2 * intro));
      gl.uniform1f(u.uLensE, lensE);
      gl.uniform1f(u.uScroll, window.scrollY / H);
      gl.uniform2f(u.uMouse, mouse.x, mouse.y);
      gl.uniform2f(u.uCursor, mouse.cx, mouse.cy);
      gl.uniform2f(u.uBH, cosmos.bh[0], cosmos.bh[1]);
      gl.uniform4f(u.uW, w[0], w[1], w[2], w[3]);
      gl.uniform4fv(u.uP, pv);
      gl.uniform1f(u.uStill, stillReady ? 1 : 0);
      gl.uniform3f(u.uPulsar, pu[0], pu[1], pu[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
      gl.deleteFramebuffer(fbo);
      delete root.dataset.blackhole;
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} className="universe" aria-hidden="true" />;
}

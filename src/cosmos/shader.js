export const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Scenes, blended by uW: x = black hole, y = nebula, z = planet sky, w = pulsar.
// Planets are drawn on top, wherever the page puts a [data-planet] slot.
// Black hole: photons integrated along Schwarzschild geodesics (units of r_s = 1)
// around a Keplerian accretion disk, with an analytic photon ring and a soft glow.
export const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime, uDist, uFall, uIncl, uFov, uRoll, uIntro, uLensE, uScroll;
uniform vec2 uMouse, uCursor, uBH;
uniform vec4 uW;
uniform vec3 uPulsar;
// Up to four planets, drawn over every scene: centre xy, radius, opacity;
// spin axis + style; atmosphere tint + rings.
uniform vec4 uP[4], uPA[4], uPC[4];
uniform vec3 uDiskHot, uDiskMid, uDiskCool, uGlow, uNeb1, uNeb2, uNeb3, uBeam;
// Lighter mode: uPass = 1 renders only the black hole, tone-mapped, into a texture;
// uStill = 1 then draws the black hole from that still. uRest is the camera it was
// taken from: hole centre xy, distance, focal length.
uniform float uPass, uStill;
uniform vec4 uRest;
uniform sampler2D uStillTex;

const float BC = 2.5980762; // critical impact parameter, 3*sqrt(3)/2 r_s

float hash13(vec3 p){
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float noise(vec3 p){
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash13(i);
  float b = hash13(i + vec3(1.0, 0.0, 0.0));
  float c = hash13(i + vec3(0.0, 1.0, 0.0));
  float d = hash13(i + vec3(1.0, 1.0, 0.0));
  float e = hash13(i + vec3(0.0, 0.0, 1.0));
  float g = hash13(i + vec3(1.0, 0.0, 1.0));
  float h = hash13(i + vec3(0.0, 1.0, 1.0));
  float k = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(a, b, f.x), mix(c, d, f.x), f.y), mix(mix(e, g, f.x), mix(h, k, f.x), f.y), f.z);
}

float fbm(vec3 p, float oct){
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 7; i++){
    if (float(i) >= oct) break;
    s += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}

vec3 rotAxis(vec3 v, vec3 k, float a){
  float c = cos(a);
  float s = sin(a);
  return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
}

// Stars are drawn at a fixed size in pixels (pa = angle of one pixel), so they stay
// pin-sharp at any render resolution.
vec3 starfield(vec3 d, float pa){
  vec3 col = vec3(0.0);
  for (int L = 0; L < 3; L++){
    float fl = float(L);
    float sc = 60.0 + fl * 80.0;
    vec3 p = d * sc;
    vec3 id = floor(p);
    vec3 f = fract(p) - 0.5;
    float h = hash13(id + fl * 13.1);
    if (h > 0.955){
      vec3 o = vec3(hash13(id + 1.1), hash13(id + 2.3), hash13(id + 3.7)) - 0.5;
      float dd = length(f - o * 0.5) / sc;
      float b = (h - 0.955) / 0.045;
      float sz = pa * (0.95 + b * 1.1);
      float core = exp(-dd * dd / (sz * sz));
      float halo = exp(-dd / (pa * (2.0 + 3.5 * b))) * 0.1 * b;
      vec3 tint = mix(vec3(1.0, 0.82, 0.64), vec3(0.68, 0.8, 1.0), hash13(id + 7.7));
      col += tint * (core + halo) * (0.35 + b) * (1.4 - fl * 0.3);
    }
  }
  return col;
}

vec3 deepSky(vec3 d){
  float n = fbm(d * 2.4 + vec3(3.0, 1.0, 7.0), 4.0);
  vec3 c = uNeb1 * pow(n, 2.4) * 0.9;
  c += uBeam * 0.06 * pow(fbm(d * 4.8 + vec3(9.0), 2.0), 2.0);
  return c;
}

// ---------- black hole ----------

// The disk texture is two rigidly rotating layers: the inner one turns faster than
// the outer, so the spin reads clearly and the pattern never winds up into rings.
// A gentle spiral gives the eye something to follow round the orbit.
float diskTex(float r, float a){
  float t = clamp((r - 2.6) / 11.0, 0.0, 1.0);
  float ai = a - uTime * 0.8;
  float ao = a - uTime * 0.32;
  float si = ai + 1.6 * log(r);
  float so = ao + 1.6 * log(r);
  float inner = fbm(vec3(vec2(cos(si), sin(si)) * 3.2, r * 2.4), 4.0);
  float outer = fbm(vec3(vec2(cos(so), sin(so)) * 2.4 + 5.0, r * 1.1), 4.0);
  float streak = fbm(vec3(vec2(cos(ai), sin(ai)) * 1.2, r * 7.0), 2.0);
  return mix(inner, outer, smoothstep(0.1, 0.7, t)) + streak * streak * 0.5;
}

vec4 disk(vec3 cp, vec3 rd, float cr, int k){
  float t = clamp((cr - 2.6) / 11.0, 0.0, 1.0);
  float f = diskTex(cr, atan(cp.z, cp.x));
  float dens = (0.16 + 1.5 * f * f) * smoothstep(0.0, 0.035, t) * (1.0 - smoothstep(0.45, 1.0, t));

  vec3 c = mix(uDiskHot, uDiskMid, smoothstep(0.0, 0.3, t));
  c = mix(c, uDiskCool, smoothstep(0.3, 1.0, t));
  c *= 1.9 * pow(3.0 / cr, 0.9);
  // A hint of Doppler beaming. Interstellar removed it for clarity; a little keeps it honest.
  vec3 v = normalize(vec3(-cp.z, 0.0, cp.x)) * sqrt(0.5 / cr);
  float beta = length(v);
  float D = sqrt(1.0 - beta * beta) / (1.0 + dot(v, rd));
  c *= mix(1.0, pow(D, 3.0), 0.35);
  c *= sqrt(max(1.0 - 1.0 / cr, 0.0));
  if (k > 0) c *= 0.85;
  return vec4(c, clamp(dens * 0.85, 0.0, 1.0));
}

vec3 blackhole(vec2 uvScreen){
  vec2 uv0 = uvScreen - uBH;
  // Camera roll puts the disk on a slight diagonal.
  float cro = cos(uRoll);
  float sro = sin(uRoll);
  vec2 uv = vec2(cro * uv0.x + sro * uv0.y, -sro * uv0.x + cro * uv0.y);
  float incl = uIncl + uMouse.y * 0.035;
  float az = uMouse.x * 0.14;
  vec3 ro = uDist * vec3(sin(az) * cos(incl), sin(incl), -cos(az) * cos(incl));
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 vel = normalize(fw * uFov + uv.x * rt + uv.y * up);
  vec3 pos = ro;
  vec3 hv = cross(pos, vel);
  float h2 = dot(hv, hv);
  float b = sqrt(h2);
  float pa = 1.0 / (uRes.y * uFov);
  float bpx = max(uDist * pa * 1.5, 0.003);
  // Exact bending near the hole; distant light is bent less than GR says, otherwise
  // from this range the whole frame sits inside the Einstein radius and stars smear.
  float bend = mix(1.0, 0.12, smoothstep(4.0, 11.0, b));

  vec3 col = vec3(0.0);
  float alpha = 0.0;
  float captured = 0.0;
  float glow = 0.0;
  int crossings = 0;
  for (int i = 0; i < 130; i++){
    float r = length(pos);
    if (r < 1.0){ captured = 1.0; break; }
    if (r > 45.0 && dot(pos, vel) > 0.0) break;
    float dt = clamp(0.07 * r, 0.015, 3.0);
    vel += -1.5 * h2 * bend * pos / pow(r, 5.0) * dt;
    vec3 np = pos + vel * dt;
    // Soft emission hugging the disk plane: a volumetric stand-in for bloom.
    float rxz = length(pos.xz);
    glow += dt * exp(-abs(pos.y) * 3.5) * smoothstep(2.3, 3.4, rxz) * (1.0 - smoothstep(6.0, 16.0, rxz)) / (rxz * rxz);
    if (pos.y * np.y < 0.0){
      // Direct and first lensed images only; higher orders are sub-pixel slivers
      // that alias, so the analytic photon ring below stands in for them.
      if (crossings < 2){
        vec3 cp = mix(pos, np, pos.y / (pos.y - np.y));
        float cr = length(cp.xz);
        if (cr > 2.6 && cr < 13.6){
          vec4 dc = disk(cp, normalize(vel), cr, crossings);
          float a = dc.a * uIntro;
          col += (1.0 - alpha) * dc.rgb * a;
          alpha += (1.0 - alpha) * a;
        }
      }
      crossings++;
    }
    pos = np;
    if (alpha > 0.985) break;
  }

  // Photon ring, just outside the shadow edge; width follows the pixel footprint.
  float ringW = max(bpx * 1.3, 0.01);
  float ring = exp(-pow((b - BC * 1.006) / ringW, 2.0));
  vec3 ringCol = mix(uDiskHot, uDiskMid, 0.35) * ring * 1.3 * uIntro;
  // Anti-aliased shadow edge from the impact parameter.
  float esc = uDist > 3.0 ? smoothstep(BC - bpx, BC + bpx, b) : 1.0 - captured;
  vec3 dOut = normalize(vel);
  vec3 bg = (starfield(dOut, pa) + deepSky(dOut)) * uIntro;
  col += (1.0 - alpha) * (bg * esc + ringCol);
  col += uGlow * glow * 1.2 * uIntro * (1.0 - 0.6 * alpha);
  return col * (1.0 - smoothstep(0.86, 0.99, uFall));
}

// Falling in zooms into the still as fast as the hole grows on screen for the live
// camera (focal length over distance), centred where the live camera puts it,
// then fades to black like the live version.
vec3 blackholeStill(vec2 uv){
  float z = (uFov / uRest.w) * (uRest.z / uDist);
  vec2 p = uRest.xy + (uv - uBH) / z;
  vec3 c = texture2D(uStillTex, vec2(p.x * uRes.y / uRes.x + 0.5, p.y + 0.5)).rgb;
  c = -log(max(1.0 - c, 0.004)) / 1.25; // undo the tone map applied at capture
  return c * uIntro * (1.0 - smoothstep(0.86, 0.99, uFall));
}

vec3 viewDir(vec2 uv, float spin){
  vec3 d = normalize(vec3(uv, 1.3));
  return vec3(d.x * cos(spin) + d.z * sin(spin), d.y, -d.x * sin(spin) + d.z * cos(spin));
}

vec3 nebulaScene(vec2 uv){
  float pa = 1.0 / (uRes.y * 1.3);
  vec3 d = viewDir(uv, uTime * 0.006 + uScroll * 0.35);
  vec3 p = d * 1.6 + vec3(0.0, uScroll * 0.4, uTime * 0.012);
  float w = fbm(p * 1.2, 4.0);
  float n = fbm(p * 1.8 + w * 1.7, 5.0);
  float n2 = fbm(p * 3.4 + vec3(5.2, 1.3, 2.8) + w, 4.0);
  vec3 c = uNeb1 * 0.08;
  c = mix(c, uNeb1, smoothstep(0.36, 0.78, n));
  c = mix(c, uNeb2, smoothstep(0.6, 0.92, n) * 0.75);
  c += uNeb3 * pow(smoothstep(0.68, 1.0, n * n2 * 1.9), 2.0) * 0.65;
  c += uBeam * smoothstep(0.55, 0.9, n2) * 0.22;
  c *= mix(1.0, 0.22, smoothstep(0.5, 0.8, fbm(p * 4.1 + vec3(9.1), 3.0)));
  c += starfield(d, pa);
  return c;
}

// ---------- planets: 0 = Mars, 1 = Jupiter, 2 = Uranus, 3 = Neptune ----------

float bandMask(float y, float a, float b){
  return smoothstep(a - 0.012, a + 0.012, y) * (1.0 - smoothstep(b - 0.012, b + 0.012, y));
}

vec3 marsSurface(vec3 m, float lat){
  float big = fbm(m * 1.35 + vec3(2.3, 7.1, 1.7), 5.0);
  float mid = fbm(m * 4.2 + vec3(9.0), 4.0);
  float fine = fbm(m * 16.0 + vec3(3.0), 3.0);
  float south = 1.0 - smoothstep(-0.5, 0.3, lat);
  vec3 c = mix(vec3(0.8, 0.43, 0.22), vec3(0.93, 0.62, 0.38), smoothstep(0.52, 0.7, big));
  // Dark albedo regions (Syrtis Major, the southern maria), mostly in the south.
  float maria = 1.0 - smoothstep(0.34, 0.46, big - 0.1 * south + 0.12 * (mid - 0.5));
  c = mix(c, vec3(0.44, 0.27, 0.18), maria * 0.8);
  c *= 0.86 + 0.28 * mid;
  c *= 0.92 + 0.16 * fine;
  float frost = 0.03 * fbm(m * 9.0, 2.0);
  float cap = max(smoothstep(0.87, 0.91, lat + frost), smoothstep(0.92, 0.95, -lat + frost));
  return mix(c, vec3(0.96, 0.95, 0.93), cap);
}

vec3 jupiterSurface(vec3 m, vec3 n, float lat, vec3 axis){
  float warp = fbm(m * 3.0 + vec3(uTime * 0.01, 0.0, 0.0), 4.0) - 0.5;
  float y = lat + warp * 0.035;
  vec3 belt = vec3(0.66, 0.47, 0.34);
  vec3 c = vec3(0.92, 0.87, 0.78);
  c = mix(c, vec3(0.93, 0.82, 0.66), 1.0 - smoothstep(0.07, 0.12, abs(y)));
  c = mix(c, vec3(0.54, 0.36, 0.27), bandMask(y, 0.11, 0.3));
  c = mix(c, belt, bandMask(y, -0.33, -0.11));
  c = mix(c, belt * 1.06, bandMask(y, 0.41, 0.5));
  c = mix(c, belt * 1.1, bandMask(y, -0.53, -0.44));
  c = mix(c, belt * 1.12, bandMask(y, 0.6, 0.66));
  c = mix(c, vec3(0.6, 0.58, 0.56), smoothstep(0.66, 0.84, abs(y)));
  c *= 0.88 + 0.24 * fbm(vec3(m.x * 1.4, y * 85.0, m.z * 1.4), 3.0);
  // Festoons: blue-grey plumes trailing off the north belt's equatorward edge.
  float fest = bandMask(y, 0.07, 0.12) * smoothstep(0.55, 0.75, fbm(vec3(m.x * 6.0, y * 30.0, m.z * 6.0), 3.0));
  c = mix(c, vec3(0.42, 0.44, 0.5), fest * 0.6);
  // The Great Red Spot, 22 degrees south. It drifts against the belts in reality too,
  // so it is kept on the visible face, wandering slowly in longitude.
  vec3 s = rotAxis(normalize(vec3(-0.22, -0.37, 0.9)), axis, 0.25 * sin(uTime * 0.05));
  vec3 east = normalize(cross(axis, s));
  vec3 north = cross(s, east);
  vec3 dv = n - s;
  vec2 e = vec2(dot(dv, east) / 0.2, dot(dv, north) / 0.1);
  float dd = length(e);
  float spot = 1.0 - smoothstep(0.8, 1.05, dd);
  vec3 grs = mix(vec3(0.78, 0.42, 0.29), vec3(0.93, 0.78, 0.62), smoothstep(0.55, 0.95, dd));
  grs *= 0.92 + 0.12 * sin(dd * 18.0 - atan(e.y, e.x) * 2.0 - uTime * 0.4);
  return mix(c, grs, spot);
}

vec3 uranusSurface(vec3 m, float lat){
  float soft = fbm(m * 2.0, 3.0);
  vec3 c = vec3(0.56, 0.86, 0.92) * (0.97 + 0.05 * sin(lat * 12.0 + soft * 1.2));
  // The pole turned towards the Sun is brighter.
  return mix(c, vec3(0.8, 0.96, 0.98), smoothstep(0.5, 0.92, lat) * 0.6);
}

vec3 neptuneSurface(vec3 m, vec3 n, float lat, vec3 axis){
  float warp = fbm(m * 2.4 + vec3(0.0, 0.0, uTime * 0.015), 3.0) - 0.5;
  float y = lat + warp * 0.06;
  vec3 c = vec3(0.26, 0.46, 0.86) * (0.94 + 0.08 * sin(y * 10.0 + warp * 3.0));
  // A darker band around the south polar region, and a paler equator.
  c = mix(c, vec3(0.17, 0.3, 0.68), bandMask(y, -0.78, -0.55) * 0.7);
  c = mix(c, vec3(0.34, 0.56, 0.92), (1.0 - smoothstep(0.0, 0.2, abs(y))) * 0.3);
  // Bright methane-ice cirrus, stretched out by the fastest winds in the solar system.
  float streak = fbm(vec3(m.x * 2.5, y * 36.0, m.z * 2.5), 3.0);
  float belts = bandMask(y, 0.2, 0.36) + bandMask(y, -0.46, -0.3) * 0.7;
  c = mix(c, vec3(0.9, 0.95, 1.0), smoothstep(0.6, 0.78, streak) * belts * 0.85);
  // A dark storm near 20 degrees south with a bright companion cloud, kept on the
  // visible face like Jupiter's Great Red Spot.
  vec3 s = rotAxis(normalize(vec3(0.3, -0.34, 0.89)), axis, 0.2 * sin(uTime * 0.04));
  vec3 east = normalize(cross(axis, s));
  vec3 north = cross(s, east);
  vec3 dv = n - s;
  vec2 e = vec2(dot(dv, east) / 0.16, dot(dv, north) / 0.085);
  c = mix(c, vec3(0.08, 0.14, 0.38), (1.0 - smoothstep(0.65, 1.0, length(e))) * 0.9);
  float comp = 1.0 - smoothstep(0.2, 0.55, length((e - vec2(-0.1, -1.25)) * vec2(0.55, 1.6)));
  return mix(c, vec3(0.95, 0.97, 1.0), comp * 0.85);
}

// A narrow ring, energy-conserving when it is thinner than a pixel.
float thinRing(float rho, float r0, float w, float fp){
  float ww = max(w, fp);
  return exp(-pow((rho - r0) / ww, 2.0)) * (w / ww);
}

float uranusRings(float rho, float fp){
  float d = (thinRing(rho, 1.64, 0.004, fp) + thinRing(rho, 1.68, 0.004, fp) + thinRing(rho, 1.72, 0.004, fp)) * 0.3;
  d += (thinRing(rho, 1.84, 0.005, fp) + thinRing(rho, 1.87, 0.005, fp)) * 0.4;
  d += thinRing(rho, 1.95, 0.006, fp) * 0.45;
  d += thinRing(rho, 2.0, 0.013, fp) * 0.9; // the epsilon ring
  return d;
}

vec3 planetSky(vec2 uv){
  float pa = 1.0 / (uRes.y * 1.3);
  vec3 d = viewDir(uv, uTime * 0.004 + uScroll * 0.2);
  return starfield(d, pa) * 0.9 + deepSky(d) * 0.8;
}

// Draws one planet over whatever is behind it. P = centre xy, radius, opacity;
// A = spin axis, style; C = atmosphere tint, rings.
vec3 planet(vec3 bg, vec2 uv, vec4 P, vec4 A, vec4 C){
  float R = max(P.z, 1e-4);
  vec2 q = (uv - P.xy) / R;
  float r2 = dot(q, q);
  float reach = C.w > 0.01 ? 2.1 : 1.7;
  if (r2 > reach * reach) return bg;
  float rr = sqrt(r2);
  float px = 1.0 / (uRes.y * R);
  vec3 L = normalize(vec3(-0.62, 0.42, 0.66));
  vec3 axis = normalize(A.xyz);
  float gas = step(0.5, A.w);
  vec3 col = bg;

  float side = 0.3 + 0.7 * smoothstep(-0.5, 0.9, dot(q / max(rr, 1e-4), normalize(L.xy)));
  col += C.rgb * (exp(-max(rr - 1.0, 0.0) * 18.0) * 0.45 + exp(-max(rr - 1.0, 0.0) * 5.0) * 0.05) * side;

  // Rings in the equatorial plane, intersected in 3D (orthographic view along -z).
  float ringA = 0.0;
  vec3 ringC = vec3(0.0);
  float zr = -1000.0;
  if (C.w > 0.01 && abs(axis.z) > 0.02){
    zr = -(q.x * axis.x + q.y * axis.y) / axis.z;
    float rho = length(vec3(q, zr));
    float fp = px * 1.5 / max(abs(axis.z), 0.25);
    ringC = vec3(0.78, 0.8, 0.82) * (0.55 + 0.45 * abs(dot(axis, L)));
    ringA = clamp(uranusRings(rho, fp), 0.0, 1.0) * C.w * 0.85;
  }

  // Planet body with an anti-aliased limb.
  float cov = 1.0 - smoothstep(1.0 - px * 1.2, 1.0 + px * 1.2, rr);
  vec3 pc = vec3(0.0);
  float nz = sqrt(max(1.0 - r2, 0.0));
  if (rr < 1.0 + 2.0 * px){
    vec3 n = normalize(vec3(q, nz + 1e-4));
    vec3 m = rotAxis(n, axis, -uTime * 0.012);
    float lat = dot(n, axis);
    float ndl = dot(n, L);
    vec3 alb;
    if (A.w < 0.5) alb = marsSurface(m, lat);
    else if (A.w < 1.5) alb = jupiterSurface(m, n, lat, axis);
    else if (A.w < 2.5) alb = uranusSurface(m, lat);
    else alb = neptuneSurface(m, n, lat, axis);

    float diff = max(ndl, 0.0);
    float term = smoothstep(-0.1, 0.25, ndl);
    // Rocky Mars barely darkens at the limb; the gas and ice giants do strongly.
    float limb = mix(0.92 + 0.08 * nz, 0.4 + 0.6 * pow(nz, 0.5), gas);
    vec3 lit = alb * (0.04 + 1.1 * diff) * term * limb + alb * 0.01;
    float rim = pow(1.0 - nz, 3.0);
    lit += C.rgb * rim * (0.1 + 0.9 * smoothstep(-0.25, 0.7, ndl)) * mix(0.35, 0.8, gas);
    pc = lit;
  }

  if (zr > nz){
    col = mix(col, pc, cov);
    col = mix(col, ringC, ringA);
  } else {
    col = mix(col, ringC, ringA);
    col = mix(col, pc, cov);
  }
  return mix(bg, col, P.w);
}

vec3 pulsarScene(vec2 uv){
  float pa = 1.0 / (uRes.y * 1.3);
  vec3 d = viewDir(uv, uTime * 0.005 + uScroll * 0.2);
  vec3 col = starfield(d, pa) * 0.85 + uNeb1 * 0.5 * fbm(d * 2.2 + vec3(7.0), 4.0);
  vec2 p = uv - uPulsar.xy;
  float r = length(p);
  float ang = uTime * 1.05 + 0.3 * sin(uTime * 0.37);
  vec2 b = vec2(cos(ang), sin(ang));
  float along = dot(p, b);
  float perp = abs(p.x * b.y - p.y * b.x);
  float width = 0.004 + abs(along) * 0.15;
  col += uBeam * exp(-perp / width * 1.5) * exp(-abs(along) * 0.8) * 1.4;
  col += mix(uBeam, vec3(1.0), 0.5) * min(0.0022 / (r * r + 0.0005), 4.5);
  col += uBeam * exp(-abs(length(p * vec2(1.0, 2.6)) - 0.07) * 150.0) * 0.4;
  for (int k = 0; k < 3; k++){
    float ph = fract(uTime * 0.26 + float(k) / 3.0);
    col += uBeam * exp(-abs(r - ph * 1.5) * 85.0) * (1.0 - ph) * 0.25;
  }
  return col;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  if (uPass > 0.5){
    gl_FragColor = vec4(1.0 - exp(-blackhole(uv) * 1.25), 1.0);
    return;
  }
  vec2 dl = uv - uCursor;
  uv -= dl * (uLensE / (dot(dl, dl) + 0.00035));

  vec3 col = vec3(0.0);
  float tw = 0.0;
  // Past the horizon the black hole is faded to black; skip tracing its rays.
  if (uW.x > 0.002){
    if (uFall < 0.99){
      if (uStill > 0.5) col += uW.x * blackholeStill(uv);
      else col += uW.x * blackhole(uv);
    }
    tw += uW.x;
  }
  if (uW.y > 0.002){ col += uW.y * nebulaScene(uv); tw += uW.y; }
  if (uW.z > 0.002){ col += uW.z * planetSky(uv); tw += uW.z; }
  if (uW.w > 0.002){ col += uW.w * pulsarScene(uv); tw += uW.w; }
  col /= max(tw, 0.001);
  for (int i = 0; i < 4; i++){
    if (uP[i].w > 0.002) col = planet(col, uv, uP[i], uPA[i], uPC[i]);
  }

  col = 1.0 - exp(-col * 1.25);
  vec2 vq = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - dot(vq, vq) * 0.55;
  col += (hash13(vec3(gl_FragCoord.xy, floor(uTime * 24.0))) - 0.5) * 0.012;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

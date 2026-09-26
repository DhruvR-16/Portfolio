export const EMAIL = 'dhruvramani006@gmail.com';
export const GITHUB = 'https://github.com/DhruvR-16';
export const LINKEDIN = 'https://www.linkedin.com/in/dhruv-ramani1/';
export const RESUME = '/Dhruv_Ramani_Resume.pdf';

// Each project is a world, rendered as a real planet and listed in order of distance
// from the Sun. `planet` drives the shader: style 0 = Mars, 1 = Jupiter, 2 = Uranus,
// 3 = Neptune; axis = spin axis in view space (x right, y up, z towards you);
// atm = atmosphere tint; rings 0 → 1. `steps` is how it works, [title, text].
export const worlds = [
  {
    id: 'mavis',
    name: 'Mavis',
    kind: 'Computer vision',
    years: '2025 — 2026',
    tagline: 'A lifting coach that watches your form through a webcam and never uploads a single frame.',
    blurb: 'A lifting coach that watches your form through a webcam and never uploads a frame.',
    headline: { value: '61% → 5%', label: 'presses flagged as faulty, before and after tuning' },
    labels: ['The problem', 'What I did'],
    problem: 'The first version flagged 61% of perfectly normal shoulder presses as faulty. A coach that cries wolf gets ignored.',
    fix: 'I recorded 128 real reps and set every tolerance from measured distributions instead of textbook angles.',
    stats: [
      { value: 33, label: 'body landmarks per frame' },
      { value: 128, label: 'real reps measured' },
      { value: 0, label: 'frames leave your device' },
    ],
    stack: ['Python', 'MediaPipe', 'OpenCV', 'React', 'TypeScript'],
    steps: [
      ['Track', 'MediaPipe Pose finds 33 body landmarks in every webcam frame, in the browser or in a desktop app.'],
      ['Measure', 'Joint angles, tempo, left–right asymmetry, and elbow drift measured against your own shoulder, for every rep.'],
      ['Judge', 'A state machine counts reps and scores each one out of 100. A fault has to hold for four frames before it counts.'],
      ['Coach', 'Voice cues, a skeleton that turns red on a fault, and a session history that stays on your device.'],
    ],
    outcome: {
      label: 'What changed',
      text: 'Every tolerance now comes from the 128 recorded reps. On the same footage, flagged presses fell from 61% to 5% and flagged curls from 46% to 10%, and a test still checks that clearly bad form gets caught.',
    },
    links: [{ label: 'View code', href: 'https://github.com/DhruvR-16/Mavis' }],
    planet: { style: 0, axis: [0.3, 0.94, 0.16], atm: [0.95, 0.66, 0.46], rings: 0 },
    planetName: 'Mars',
    planetNote: 'Iron-oxide dust over basalt, 25.2° axial tilt',
    au: '1.52 AU',
  },
  {
    id: 'exoplanet',
    name: 'Exoplanet Hunter',
    kind: 'Astrophysics × ML',
    years: '2026',
    tagline: 'Searches NASA TESS starlight for transiting planets, from raw flux to a vetted, calibrated verdict.',
    blurb: 'Hunts for transiting planets in NASA TESS starlight, from raw flux to a vetted verdict.',
    headline: { value: '0.957 → 0.72', label: 'ROC-AUC, moving from Kepler to TESS' },
    labels: ['The problem', 'What I did'],
    problem: 'Trained on Kepler, my classifier scored 0.957 ROC-AUC. Pointed at a different telescope, TESS, it fell to 0.72.',
    fix: 'I measured where the drop came from, found the decision threshold mattered more than the model, and published the study.',
    stats: [
      { value: 0.957, decimals: 3, label: 'ROC-AUC on held-out Kepler stars' },
      { value: 0.72, decimals: 2, label: 'ROC-AUC on TESS' },
      { value: 5.66, decimals: 2, suffix: ' d', label: 'TOI-270 c, recovered' },
    ],
    stack: ['Python', 'Lightkurve', 'wotan', 'Transit Least Squares', 'XGBoost'],
    steps: [
      ['Fetch', 'Light curves from NASA’s MAST archive, stitched across sectors, with a fallback to full-frame images when a star has none.'],
      ['Search', 'A wotan filter strips out the star’s own variability, then Transit Least Squares looks for periodic dips using the star’s catalogue radius and mass.'],
      ['Vet', 'Physics checks reject impostors: odd/even depths, transit duration, implied stellar density and a search for a secondary eclipse.'],
      ['Classify', 'A calibrated random-forest and XGBoost ensemble gives a planet probability, with a plain-English reason for every verdict.'],
    ],
    outcome: {
      label: 'Blind tests',
      text: 'On stars it had never seen, the pipeline recovered π Mensae c at 6.2670 days (true period 6.2679) and TOI-270 c at 5.6604 days. It also found the confirmed planet around Ross 176, a star the project had listed as a no-transit control.',
    },
    paper: 'kepler-tess',
    links: [
      { label: 'View code', href: 'https://github.com/DhruvR-16/exoplanet_detection' },
      { label: 'Read preprint', href: 'https://doi.org/10.5281/zenodo.22132135' },
    ],
    planet: { style: 1, axis: [-0.05, 0.997, 0.05], atm: [0.95, 0.84, 0.68], rings: 0 },
    planetName: 'Jupiter',
    planetNote: 'Gas giant, with the Great Red Spot at 22° S',
    au: '5.20 AU',
  },
  {
    id: 'spiralstate',
    name: 'SpiralState',
    kind: 'LLM reasoning × Interpretability',
    years: '2026',
    credit: 'Co-authored with Om Chimurkar',
    tagline: 'Does an anxious or angry prompt make a reasoning model think longer without thinking better? A pre-registered study of emotion and inference-time compute.',
    blurb: 'Does an anxious prompt make a reasoning model think longer, without thinking better?',
    headline: { value: '13 × 60', label: 'emotional framings × problems' },
    labels: ['The question', 'What we built'],
    problem: 'Reasoning models decide for themselves how long to think. Whether the emotional tone of a prompt changes that effort, and with it the cost of serving the model, is not well understood.',
    fix: 'Thirteen affective conditions placed on the valence × arousal circumplex, the same 60 problems under every one of them, and a harness that records reasoning tokens, latency and memory while reading and steering the model’s internal activations.',
    stats: [
      { value: 13, label: 'affective conditions, fixed before any run' },
      { value: 4140, label: 'queries in the dataset' },
      { value: 4, label: 'pre-registered, falsifiable hypotheses' },
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face', 'Activation steering', 'Linear probes'],
    steps: [
      ['Stimuli', 'Thirteen framings placed on the valence × arousal circumplex, built into a 4,140-query dataset with manipulation checks and difficulty calibration.'],
      ['Harness', 'Runs the model on every query and records reasoning tokens, latency and memory alongside correctness.'],
      ['Internals', 'Captures activations, finds contrastive steering directions, trains linear probes and steers the model along them.'],
      ['Analysis', 'Clusters each condition’s behavioural signature and tests the pre-registered hypotheses.'],
    ],
    paper: 'spiralstate',
    links: [
      { label: 'View code', href: 'https://github.com/Omc12/SpiralState' },
      { label: 'Read the paper', href: '#paper', internal: true },
    ],
    planet: { style: 2, axis: [0.72, 0.12, 0.68], atm: [0.55, 0.85, 0.95], rings: 1 },
    planetName: 'Uranus',
    planetNote: 'Ice giant that rolls on its side, 97.8° axial tilt',
    au: '19.2 AU',
  },
];

// The 13 SpiralState conditions, with the valence/arousal coordinates fixed in
// phase1/conditions.yaml before any data collection.
export const circumplex = [
  { id: 'fear', v: -0.8, a: 0.8, role: 'confirmatory', lx: -10, ly: -4, anchor: 'end' },
  { id: 'anger', v: -0.8, a: 0.7, role: 'confirmatory', lx: -10, ly: 8, anchor: 'end' },
  { id: 'anxiety', v: -0.7, a: 0.6, role: 'exploratory', lx: -10, ly: 14, anchor: 'end' },
  { id: 'frustration', v: -0.6, a: 0.5, role: 'exploratory', lx: 10, ly: 16, anchor: 'start' },
  { id: 'excitement', v: 0.7, a: 0.8, role: 'confirmatory', lx: 10, ly: 4, anchor: 'start' },
  { id: 'joy', v: 0.8, a: 0.6, role: 'confirmatory', lx: 10, ly: 5, anchor: 'start' },
  { id: 'disappointment', v: -0.6, a: -0.4, role: 'confirmatory', lx: -10, ly: 4, anchor: 'end' },
  { id: 'sadness', v: -0.7, a: -0.6, role: 'confirmatory', lx: -10, ly: 5, anchor: 'end' },
  { id: 'contentment', v: 0.7, a: -0.5, role: 'confirmatory', lx: 10, ly: 4, anchor: 'start' },
  { id: 'calmness', v: 0.5, a: -0.7, role: 'confirmatory', lx: 10, ly: 5, anchor: 'start' },
  { id: 'neutral × 2', v: 0, a: 0, role: 'control', lx: 0, ly: 20, anchor: 'middle' },
];

export const papers = [
  {
    id: 'spiralstate',
    title: 'SpiralState: Emotional State and Reasoning Effort in Language Models',
    authors: 'Om Chimurkar, Dhruv Ramani',
    affiliation: 'Newton School of Technology, Rishihood University',
    summary:
      'Does the emotional framing of a prompt change how much a reasoning model thinks, even when the answer stays the same? SpiralState poses the same 60 math and logic problems under 13 affective framings and measures reasoning tokens, latency and memory alongside correctness. It then reads the model’s internal activations to ask whether the emotions it responds to cluster the way human ones do on the valence × arousal circumplex.',
    hypotheses: [
      ['H1', 'Affective conditions produce stable clusters of behaviour, which may or may not match the human circumplex.'],
      ['H2', 'Steering a model along a cluster’s direction shifts its reasoning, even on a neutral prompt.'],
      ['H3', 'Different clusters fail differently: excess verification versus stopping too early.'],
      ['H4', 'Three published fixes for over-thinking move activations along the same direction.'],
    ],
    links: [{ label: 'View code', href: 'https://github.com/Omc12/SpiralState' }],
    bibtex: `@misc{chimurkar2026spiralstate,
  title        = {SpiralState: Emotional State and Reasoning Effort in Language Models},
  author       = {Chimurkar, Om and Ramani, Dhruv},
  howpublished = {\\url{https://github.com/Omc12/SpiralState}},
  year         = {2026}
}`,
  },
  {
    id: 'kepler-tess',
    status: 'Preprint · Zenodo',
    date: '28 July 2026',
    title: 'How Well Does a Kepler-Trained Transit Classifier Transfer to TESS?',
    authors: 'Dhruv Ramani',
    finding: 'The operating point matters more than the model.',
    summary:
      'A calibrated ensemble that reaches 0.96 ROC-AUC on Kepler falls to 0.72 on TESS. Lowering the decision threshold from 0.5 to 0.117 substantially improves detection, and physics-anchored self-training with no TESS labels performs about as well as the original model.',
    doi: '10.5281/zenodo.22132135',
    links: [{ label: 'Read the preprint', href: 'https://doi.org/10.5281/zenodo.22132135' }],
    stats: [
      { v: 0.957, d: 3, l: 'ROC-AUC on held-out Kepler stars' },
      { v: 0.72, d: 2, l: 'ROC-AUC after moving to TESS' },
      { v: 0.117, d: 3, l: 'the decision threshold that recovered it' },
    ],
    bibtex: `@misc{ramani2026kepler,
  author    = {Ramani, Dhruv},
  title     = {How Well Does a Kepler-Trained Transit Classifier Transfer to TESS?},
  year      = {2026},
  month     = jul,
  publisher = {Zenodo},
  note      = {Preprint},
  doi       = {10.5281/zenodo.22132135}
}`,
  },
];

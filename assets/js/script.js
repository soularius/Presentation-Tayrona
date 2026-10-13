/* ══════════════════════════════════════════════════════════════
   TAYRONA NATIONAL NATURAL PARK
   A touristic-place poster told by four tour guides: Yined, Majo,
   Dari and Dani. Each section pairs the spoken lines with a photo
   and a drawing that fills in as the guide talks.
   ══════════════════════════════════════════════════════════════ */

// ── DOM ───────────────────────────────────────────────────────
const sceneWrap = document.querySelector('.scene-wrap');
const bgLayers  = [...document.querySelectorAll('.bg-layer')];

const hero  = document.getElementById('hero');
const outro = document.getElementById('outro');

const badge      = document.getElementById('badge');
const badgeNum   = document.getElementById('badgeNum');
const badgeTitle = document.getElementById('badgeTitle');

const photoCard    = document.getElementById('photoCard');
const photoImg     = document.getElementById('photoImg');
const photoCaption = document.getElementById('photoCaption');

const poster   = document.getElementById('poster');
const graphics = [...document.querySelectorAll('.graphic')];

const dialogue       = document.getElementById('dialogue');
const dialogueAvatar = document.getElementById('dialogueAvatar');
const dialogueName   = document.getElementById('dialogueName');
const dialogueText   = document.getElementById('dialogueText');

const startBtn      = document.getElementById('startBtn');
const againBtn      = document.getElementById('againBtn');
const nextBtn       = document.getElementById('nextBtn');
const backBtn       = document.getElementById('backBtn');
const menuBtn       = document.getElementById('menuBtn');
const musicBtn      = document.getElementById('musicBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const timerEl       = document.getElementById('timer');
const timerToggle   = document.getElementById('timerToggle');

const sceneMenu       = document.getElementById('sceneMenu');
const closeMenuBtn    = document.getElementById('closeMenuBtn');
const creditsBtn      = document.getElementById('creditsBtn');
const creditsOverlay  = document.getElementById('creditsOverlay');
const closeCreditsBtn = document.getElementById('closeCreditsBtn');

// ── Speakers ──────────────────────────────────────────────────
// Each guide reads their own lines out loud, so each one has a colour
// (defined in the stylesheet) that tints the avatar ring, the name and
// the top edge of the dialogue bar.
const SPEAKERS = {
  yined: { name: 'Yined', face: 'assets/img/personajes/yined-face.jpg', color: 'var(--c-yined)' },
  majo:  { name: 'Majo',  face: 'assets/img/personajes/majo-face.jpg',  color: 'var(--c-majo)' },
  dari:  { name: 'Dari',  face: 'assets/img/personajes/dari-face.jpg',  color: 'var(--c-dari)' },
  dani:  { name: 'Dani',  face: 'assets/img/personajes/dani-face.jpg',  color: 'var(--c-dani)' },
};

// ── Scenes ────────────────────────────────────────────────────
//
//   kind     'home' | 'story' | 'end'
//   bg       { src, pos } — full-screen photo from assets/img/tairona,
//            pos is the CSS background-position, i.e. which part of a
//            vertical photo stays in view on a wide screen
//   photo    { src, caption } — the polaroid with the whole photo
//   graphic  which <section data-graphic> of the poster to show
//   nav      label of the Next button that leads INTO this scene
//   lines    { who, text, step, bg?, photo? } — step drives the
//            graphic; bg / photo override the scene's for that line
//
const SCENES = [
  {
    kind: 'home',
    bg: { src: 'cabo-san-juan-palmeras', pos: '50% 55%' },
  },

  {
    kind: 'story',
    num: 'Part 1',
    title: 'Why Tayrona?',
    nav: 'Why? ▸',
    graphic: 'why',
    bg: { src: 'cabo-san-juan-montanas', pos: '50% 55%' },
    photo: { src: 'costa-sierra', caption: 'Where the jungle meets the sea' },
    lines: [
      { who: 'yined', step: 0,
        text: "I chose Tayrona National Natural Park because it is one of Colombia's most stunning natural treasures," },
      { who: 'yined', step: 1,
        text: 'where the lush green jungle meets the crystal-clear waters of the Caribbean Sea and the majestic Sierra Nevada de Santa Marta mountains.' },
    ],
  },

  {
    kind: 'story',
    num: 'Part 2',
    title: 'Where is it?',
    nav: 'Where? ▸',
    graphic: 'where',
    bg: { src: 'cabo-san-juan-mirador-dron', pos: '50% 50%' },
    photo: { src: 'mirador-cabanas', caption: 'The Caribbean coast' },
    lines: [
      { who: 'majo', step: 0,
        text: 'It is located on the Caribbean coast of Colombia,' },
      { who: 'majo', step: 1,
        text: 'in the department of Magdalena, about 34 kilometers from the city of Santa Marta.' },
    ],
  },

  {
    kind: 'story',
    num: 'Part 3',
    title: 'How to get there?',
    nav: 'How? ▸',
    graphic: 'how',
    bg: { src: 'sendero-palmeras', pos: '50% 60%' },
    photo: { src: 'entrada-parque', caption: 'The park entrance' },
    lines: [
      { who: 'dari', step: 0,
        text: 'You can take a bus or taxi from Santa Marta to the park entrances (such as El Zaino or Calabazo).' },
      { who: 'dari', step: 1,
        photo: { src: 'selva-pasarela', caption: 'Hiking through the forest' },
        text: 'From the entrance, you can hike through the tropical forest or take a short boat ride from Taganga or Cabo San Juan.' },
    ],
  },

  {
    kind: 'story',
    num: 'Part 4',
    title: 'Things to do',
    nav: 'Things to do ▸',
    graphic: 'todo',
    lines: [
      { who: 'dani', step: 0,
        bg: { src: 'sendero-palmeras-sol', pos: '50% 60%' },
        photo: { src: 'tunel-ramas', caption: 'Tropical trails' },
        text: 'You can hike through tropical trails,' },
      { who: 'dani', step: 1,
        bg: { src: 'cabo-san-juan-banistas', pos: '50% 62%' },
        photo: { src: 'collage-playas', caption: 'Beautiful beaches' },
        text: 'swim in beautiful beaches like Cabo San Juan, La Piscina or Playa Cristal,' },
      { who: 'dani', step: 2,
        bg: { src: 'capuchino-cara-blanca', pos: '50% 40%' },
        photo: { src: 'mono', caption: 'Hello, little monkey!' },
        text: 'observe exotic wildlife such as monkeys and colorful birds,' },
      { who: 'dani', step: 3,
        bg: { src: 'arrecife-rayos-sol', pos: '50% 62%' },   // before: 'arrecife-coral' (real Tayrona dive photo)
        photo: { src: 'rocas-mar', caption: 'Crystal-clear water' },
        text: 'and snorkel or scuba dive.' },
    ],
  },

  {
    kind: 'story',
    num: 'Part 5',
    title: 'Recommendations',
    nav: 'Recommendations ▸',
    graphic: 'tips',
    lines: [
      { who: 'yined', step: 0,
        bg: { src: 'palmeras-recorrida', pos: '50% 60%' },
        photo: { src: 'atardecer-sendero', caption: 'Ready to walk!' },
        text: 'Wear comfortable hiking shoes, light clothing, and a swimsuit.' },
      { who: 'majo', step: 1,
        bg: { src: 'playa-turquesa', pos: '50% 55%' },
        photo: { src: 'atardecer-arbustos', caption: 'The Caribbean sun is strong' },
        text: 'Bring biodegradable sunscreen, insect repellent, and a hat.' },
      { who: 'dari', step: 2,
        bg: { src: 'laguna-costera', pos: '50% 50%' },
        photo: { src: 'laguna', caption: 'Stay fresh' },
        text: 'Stay hydrated and carry enough drinking water.' },
      { who: 'dani', step: 3,
        bg: { src: 'selva-costera', pos: '50% 50%' },
        photo: { src: 'playa-cielo-azul', caption: 'Keep it this clean' },
        text: 'Respect nature and keep the park clean (do not leave trash behind).' },
    ],
  },

  {
    kind: 'end',
    nav: 'The End ▸',
    bg: { src: 'amanecer-palmera', pos: '50% 55%' },
  },
];

const imgSrc = (name) => `assets/img/tairona/${name}.jpg`;

// ── State ─────────────────────────────────────────────────────
const state = { scene: 0, line: 0 };

// ── Backdrop ──────────────────────────────────────────────────
// Two layers swap places: the incoming photo is decoded first, so the
// cross-fade never shows half a picture.
let bgFront = 0;
let bgKey   = '';
let bgToken = 0;

function setBackground(bg) {
  if (!bg) return;
  const key = `${bg.src}|${bg.pos}`;
  if (key === bgKey) return;
  bgKey = key;

  const token = ++bgToken;
  const url   = imgSrc(bg.src);
  const probe = new Image();
  probe.src = url;

  const swap = () => {
    if (token !== bgToken) return;           // a newer change won the race
    const incoming = bgLayers[1 - bgFront];
    const outgoing = bgLayers[bgFront];
    incoming.style.backgroundImage    = `url("${url}")`;
    incoming.style.backgroundPosition = bg.pos || '50% 50%';
    // Restart the slow zoom on the new photo only; the old one keeps
    // drifting while it fades out, so nothing jumps.
    incoming.style.animation = 'none';
    void incoming.offsetWidth;
    incoming.style.animation = '';
    // The very first photo appears at once instead of fading in from
    // the empty backdrop.
    const first = !outgoing.classList.contains('is-active');
    if (first) incoming.style.transition = 'none';
    incoming.classList.add('is-active');
    outgoing.classList.remove('is-active');
    if (first) requestAnimationFrame(() => { incoming.style.transition = ''; });
    bgFront = 1 - bgFront;
  };

  if (probe.decode) probe.decode().then(swap, swap);
  else probe.onload = probe.onerror = swap;
}

// ── Polaroid ──────────────────────────────────────────────────
let photoKey   = '';
let photoTimer = null;

function setPhoto(photo) {
  clearTimeout(photoTimer);

  if (!photo) {
    photoKey = '';
    photoCard.classList.add('hidden');
    return;
  }
  if (photo.src === photoKey) {
    photoCard.classList.remove('hidden');
    return;
  }

  const firstShow = photoCard.classList.contains('hidden');
  photoKey = photo.src;

  const apply = () => {
    photoImg.src = imgSrc(photo.src);
    photoImg.alt = photo.caption || '';
    photoCaption.textContent = photo.caption || '';
    photoCard.classList.remove('is-swapping', 'hidden');
  };

  if (firstShow) { apply(); return; }
  photoCard.classList.add('is-swapping');
  photoTimer = setTimeout(apply, 260);
}

// ── Poster graphics ───────────────────────────────────────────
function setGraphic(name, step) {
  if (!name) {
    poster.classList.add('hidden');
    return;
  }
  poster.classList.remove('hidden');
  poster.dataset.show = name;

  graphics.forEach((g) => {
    const active = g.dataset.graphic === name;
    g.classList.toggle('is-active', active);
    if (!active) return;
    g.querySelectorAll('[data-step]').forEach((el) => {
      const s = Number(el.dataset.step);
      el.classList.toggle('is-done',    s < step);
      el.classList.toggle('is-current', s === step);
      el.classList.toggle('is-pending', s > step);
    });
  });
}

// ── Dialogue ──────────────────────────────────────────────────
let avatarTimer = null;

function currentLine() {
  const cfg = SCENES[state.scene];
  return (cfg && cfg.lines && cfg.lines[state.line]) || null;
}

// The whole line shows at once: the guides read it aloud, so it has to
// be there to read from the moment it appears.
function showLine() {
  const cfg  = SCENES[state.scene];
  const line = currentLine();
  if (!line) return;

  const speaker = SPEAKERS[line.who];
  dialogue.style.setProperty('--speaker', speaker.color);

  if (!dialogueAvatar.src.endsWith(speaker.face)) {
    clearTimeout(avatarTimer);
    dialogueAvatar.classList.add('swap');
    avatarTimer = setTimeout(() => {
      dialogueAvatar.src = speaker.face;
      dialogueAvatar.alt = speaker.name;
      dialogueAvatar.classList.remove('swap');
    }, 180);
  }
  dialogueName.textContent = speaker.name;
  dialogueText.textContent = line.text;

  dialogueText.classList.remove('is-fresh');
  void dialogueText.offsetWidth;
  dialogueText.classList.add('is-fresh');

  setBackground(line.bg || cfg.bg);
  setPhoto(line.photo || cfg.photo);
  setGraphic(cfg.graphic, line.step ?? state.line);
  updateNextLabel();
}

function updateNextLabel() {
  const cfg = SCENES[state.scene];
  if (state.line < cfg.lines.length - 1) {
    nextBtn.textContent = 'Next ▸';
    return;
  }
  const next = SCENES[state.scene + 1];
  nextBtn.textContent = next && next.nav ? next.nav : 'Next ▸';
}

function advance() {
  const cfg = SCENES[state.scene];
  if (cfg.kind !== 'story') {
    goToScene(cfg.kind === 'home' ? 1 : 0);
    return;
  }
  if (state.line < cfg.lines.length - 1) {
    state.line += 1;
    showLine();
    return;
  }
  goToScene(state.scene + 1);
}

// Back steps through the lines too, because within a section the
// photo and the graphic change from line to line.
function goBack() {
  const cfg = SCENES[state.scene];
  if (cfg.kind === 'story' && state.line > 0) {
    state.line -= 1;
    showLine();
    return;
  }
  if (state.scene === 0) return;
  const prev = SCENES[state.scene - 1];
  goToScene(state.scene - 1, prev.lines ? prev.lines.length - 1 : 0);
}

// ── Scene switching ───────────────────────────────────────────
function show(el, visible) {
  el.classList.toggle('hidden', !visible);
}

function goToScene(id, line = 0) {
  const cfg = SCENES[id];
  if (!cfg) return;

  sceneMenu.classList.add('hidden');
  state.scene = id;
  state.line  = Math.max(0, Math.min(line, cfg.lines ? cfg.lines.length - 1 : 0));

  const isStory = cfg.kind === 'story';
  sceneWrap.classList.toggle('is-home', cfg.kind === 'home');
  sceneWrap.classList.toggle('is-end',  cfg.kind === 'end');

  show(hero,     cfg.kind === 'home');
  show(outro,    cfg.kind === 'end');
  show(badge,    isStory);
  show(dialogue, isStory);
  show(backBtn,  id > 0);

  if (isStory) {
    badgeNum.textContent   = cfg.num;
    badgeTitle.textContent = cfg.title;
    showLine();
  } else {
    setBackground(cfg.bg);
    setPhoto(null);
    setGraphic(null);
  }

  if (id > 0) startTimer();
}

// ── Timer ─────────────────────────────────────────────────────
// The project asks for at least four minutes. The clock starts with the
// tour and turns green at 4:00; it stays hidden unless switched on.
const MIN_SECONDS = 4 * 60;
let timerStart = null;

function startTimer() {
  if (timerStart === null) timerStart = Date.now();
}

function renderTimer() {
  const secs = timerStart === null ? 0 : Math.floor((Date.now() - timerStart) / 1000);
  const m = Math.floor(secs / 60);
  const s = String(secs % 60).padStart(2, '0');
  timerEl.textContent = `⏱ ${m}:${s}`;
  timerEl.classList.toggle('is-over', secs >= MIN_SECONDS);
}

function toggleTimer() {
  const visible = timerEl.classList.toggle('hidden') === false;
  timerToggle.textContent = visible ? '⏱ Hide timer' : '⏱ Show timer';
}

setInterval(renderTimer, 500);

// ── Audio ─────────────────────────────────────────────────────
const bgMusic = new Audio('assets/music/sonid.mp3');
// Metadata only: the browser streams the rest once it actually plays,
// instead of racing the photos to buffer the whole track.
bgMusic.preload = 'metadata';
bgMusic.loop    = true;
bgMusic.volume  = 0.35;
bgMusic.muted   = true;
let musicStarted = false;

function updateMusicButton() {
  const isMuted = bgMusic.muted || !musicStarted;
  musicBtn.textContent = isMuted ? '🔇' : '🔊';
  musicBtn.setAttribute('aria-label', isMuted ? 'Muted audio' : 'Audio on');
  musicBtn.title = isMuted ? 'Muted audio' : 'Audio on';
  musicBtn.classList.toggle('is-muted', isMuted);
  musicBtn.classList.toggle('is-unmuted', !isMuted);
}

function toggleMusic() {
  if (!musicStarted) {
    musicStarted = true;
    bgMusic.play().catch(() => { musicStarted = false; updateMusicButton(); });
  }
  bgMusic.muted = !bgMusic.muted;
  if (bgMusic.paused) bgMusic.play().catch(() => {});
  updateMusicButton();
}

// ── Full screen ───────────────────────────────────────────────
// iPhones expose no full-screen API for ordinary elements, so there the
// button stays hidden rather than doing nothing.
const fullscreenSupported = !!(
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.documentElement.webkitRequestFullscreen
);

function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function updateFullscreenButton() {
  const on = !!fullscreenElement();
  fullscreenBtn.textContent = on ? '✖' : '⛶';
  fullscreenBtn.setAttribute('aria-label', on ? 'Exit full screen' : 'Enter full screen');
  fullscreenBtn.title = on ? 'Exit full screen' : 'Full screen';
}

function toggleFullscreen() {
  const root = document.documentElement;
  if (fullscreenElement()) {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exit) Promise.resolve(exit.call(document)).catch(() => {});
    return;
  }
  const request = root.requestFullscreen || root.webkitRequestFullscreen;
  if (request) Promise.resolve(request.call(root)).catch(() => {});
}

// ── Events ────────────────────────────────────────────────────
startBtn.addEventListener('click', () => goToScene(1));
againBtn.addEventListener('click', () => goToScene(0));
nextBtn.addEventListener('click', advance);
backBtn.addEventListener('click', goBack);
musicBtn.addEventListener('click', toggleMusic);
fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

timerEl.addEventListener('click', () => { timerStart = Date.now(); renderTimer(); });
timerToggle.addEventListener('click', toggleTimer);

menuBtn.addEventListener('click', () => sceneMenu.classList.remove('hidden'));
closeMenuBtn.addEventListener('click', () => sceneMenu.classList.add('hidden'));
sceneMenu.addEventListener('click', (e) => {
  if (e.target === sceneMenu) sceneMenu.classList.add('hidden');
});
document.querySelectorAll('.panel__item').forEach((btn) => {
  btn.addEventListener('click', () => goToScene(Number(btn.dataset.target)));
});

creditsBtn.addEventListener('click', () => creditsOverlay.classList.remove('hidden'));
closeCreditsBtn.addEventListener('click', () => creditsOverlay.classList.add('hidden'));
creditsOverlay.addEventListener('click', (e) => {
  if (e.target === creditsOverlay) creditsOverlay.classList.add('hidden');
});

// Keyboard: space / Enter / → advance · ← back · F full screen · T timer
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sceneMenu.classList.add('hidden');
    creditsOverlay.classList.add('hidden');
    return;
  }
  if (!sceneMenu.classList.contains('hidden') || !creditsOverlay.classList.contains('hidden')) return;

  if (e.key === 'f' || e.key === 'F') { toggleFullscreen(); return; }
  if (e.key === 't' || e.key === 'T') { toggleTimer(); return; }
  if (e.key === 'ArrowLeft') { goBack(); return; }
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
    // Let a focused button handle its own Enter / Space
    if (e.target instanceof HTMLButtonElement && e.key !== 'ArrowRight') return;
    e.preventDefault();
    advance();
  }
});

// ── Init ──────────────────────────────────────────────────────
// Deep link for presenting or rehearsing: index.html?scene=4&line=2
// opens on "Things to do" with the third line on screen.
function init() {
  const q = new URLSearchParams(window.location.search);
  const sceneId = Number(q.get('scene'));
  const line    = Number(q.get('line')) || 0;

  updateMusicButton();
  if (fullscreenSupported) {
    fullscreenBtn.classList.remove('hidden');
    updateFullscreenButton();
  }

  goToScene(SCENES[sceneId] ? sceneId : 0, line);
  timerStart = null;   // a deep link is not the start of the talk
  renderTimer();

  // Warm every photo during idle time so later scenes switch instantly.
  const warm = () => {
    const all = new Set();
    SCENES.forEach((s) => {
      if (s.bg) all.add(s.bg.src);
      if (s.photo) all.add(s.photo.src);
      (s.lines || []).forEach((l) => {
        if (l.bg) all.add(l.bg.src);
        if (l.photo) all.add(l.photo.src);
      });
    });
    all.forEach((name) => { const im = new Image(); im.src = imgSrc(name); });
  };
  if (window.requestIdleCallback) requestIdleCallback(warm, { timeout: 2000 });
  else setTimeout(warm, 800);
}

init();

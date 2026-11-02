/* =========================================================
   EMMET MASTER PRO — app.js
   Motor Emmet + práctica + playground + aprendizaje + stats
   ========================================================= */

/* ---------- Estado ---------- */
const state = {
  currentChallenge: 0,
  completed: new Set(),
  correctCount: 0,
  attempts: 0,
  streak: 0,
  bestStreak: 0,
  hintUsed: false,
  noHintWins: 0,
  fastestWin: Infinity,
  startTime: null,
  timerInterval: null,
  categoryProgress: {},
  xp: 0,
  combo: 0,
  mistakes: [],
  unlockedAchievements: new Set(),
  playgroundUses: 0,
  topicsRead: new Set(),
  totalTime: 0,
  theme: 'dark',
  soundOn: true
};

const STORAGE_KEY = 'emmet-master-pro-v2';

/* ---------- Persistencia ---------- */
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!s) return;
    state.completed = new Set(s.completed || []);
    state.correctCount = s.correctCount || 0;
    state.attempts = s.attempts || 0;
    state.streak = s.streak || 0;
    state.bestStreak = s.bestStreak || 0;
    state.noHintWins = s.noHintWins || 0;
    state.fastestWin = s.fastestWin || Infinity;
    state.xp = s.xp || 0;
    state.mistakes = s.mistakes || [];
    state.unlockedAchievements = new Set(s.unlockedAchievements || []);
    state.playgroundUses = s.playgroundUses || 0;
    state.topicsRead = new Set(s.topicsRead || []);
    state.totalTime = s.totalTime || 0;
    state.theme = s.theme || 'dark';
    state.soundOn = s.soundOn !== false;
  } catch {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    completed: [...state.completed],
    correctCount: state.correctCount,
    attempts: state.attempts,
    streak: state.streak,
    bestStreak: state.bestStreak,
    noHintWins: state.noHintWins,
    fastestWin: state.fastestWin === Infinity ? null : state.fastestWin,
    xp: state.xp,
    mistakes: state.mistakes.slice(-20),
    unlockedAchievements: [...state.unlockedAchievements],
    playgroundUses: state.playgroundUses,
    topicsRead: [...state.topicsRead],
    totalTime: state.totalTime,
    theme: state.theme,
    soundOn: state.soundOn
  }));
}

/* ---------- Utilidades ---------- */
function escapeHtml(s) {
  if (typeof s !== 'string') return String(s || '');
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function beep(freq = 800, dur = 80, type = 'sine') {
  if (!state.soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur / 1000);
  } catch {}
}

function openModal(title, bodyHTML, buttons = []) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  const footer = document.getElementById('modal-footer');
  footer.innerHTML = '';
  buttons.forEach(b => {
    const btn = document.createElement('button');
    btn.className = `btn ${b.cls || 'ghost'}`;
    btn.textContent = b.label;
    btn.onclick = () => { overlay.hidden = true; b.onClick && b.onClick(); };
    footer.appendChild(btn);
  });
  overlay.hidden = false;
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').hidden = true;
});

/* =========================================================
   MOTOR EMMET (parseo HTML + CSS + DOCTYPE)
   ========================================================= */

const VOID_TAGS = new Set(['br','img','link','meta','input','hr','area','base','col','embed','param','source','track','wbr']);

const IMPLICIT_IN = {
  'ul':'li','ol':'li','dl':'dt','table':'tr','tr':'td','select':'option','optgroup':'option',
  'colgroup':'col','map':'area','picture':'source','em':'span','strong':'span','blockquote':'p','a':'span'
};

const HTML_ABBR = {
  'a':{tag:'a',attrs:{href:''}}, 'a:link':{tag:'a',attrs:{href:'http://'}}, 'a:mail':{tag:'a',attrs:{href:'mailto:'}},
  'abbr':{tag:'abbr',attrs:{title:''}}, 'br':{tag:'br',attrs:{},void:true},
  'link':{tag:'link',attrs:{rel:'stylesheet',href:''},void:true},
  'link:css':{tag:'link',attrs:{rel:'stylesheet',href:'style.css'},void:true},
  'link:print':{tag:'link',attrs:{rel:'stylesheet',href:'print.css',media:'print'},void:true},
  'link:favicon':{tag:'link',attrs:{rel:'shortcut icon',type:'image/x-icon',href:'favicon.ico'},void:true},
  'meta':{tag:'meta',attrs:{},void:true},
  'meta:vp':{tag:'meta',attrs:{name:'viewport',content:'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'},void:true},
  'meta:utf':{tag:'meta',attrs:{'http-equiv':'Content-Type',content:'text/html;charset=UTF-8'},void:true},
  'img':{tag:'img',attrs:{src:'',alt:''},void:true},
  'script':{tag:'script',attrs:{}}, 'script:src':{tag:'script',attrs:{src:''}},
  'style':{tag:'style',attrs:{}},
  'form':{tag:'form',attrs:{action:''}}, 'form:post':{tag:'form',attrs:{action:'',method:'post'}}, 'form:get':{tag:'form',attrs:{action:'',method:'get'}},
  'label':{tag:'label',attrs:{for:''}},
  'input':{tag:'input',attrs:{type:'text'},void:true},
  'input:text':{tag:'input',attrs:{type:'text',name:'',id:''},void:true},
  'input:email':{tag:'input',attrs:{type:'email',name:'',id:''},void:true},
  'input:password':{tag:'input',attrs:{type:'password',name:'',id:''},void:true},
  'input:checkbox':{tag:'input',attrs:{type:'checkbox',name:'',id:''},void:true},
  'input:radio':{tag:'input',attrs:{type:'radio',name:'',id:''},void:true},
  'input:submit':{tag:'input',attrs:{type:'submit',value:''},void:true},
  'select':{tag:'select',attrs:{name:'',id:''}}, 'option':{tag:'option',attrs:{value:''}},
  'textarea':{tag:'textarea',attrs:{name:'',id:'',cols:'30',rows:'10'}},
  'button':{tag:'button',attrs:{}}, 'button:submit':{tag:'button',attrs:{type:'submit'}}, 'button:reset':{tag:'button',attrs:{type:'reset'}}
};

const DOCTYPE_MAP = {
  '!': '<!DOCTYPE html>',
  'html:5': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Document</title>\n</head>\n<body>\n</body>\n</html>',
  'html:4t': '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
  'html:4s': '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
  'html:xt': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
  'html:xs': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
};

const CSS_MAP = {
  'pos:a':'position: absolute;','pos:r':'position: relative;','pos:f':'position: fixed;',
  'd:f':'display: flex;','d:ib':'display: inline-block;','d:n':'display: none;',
  'fl:l':'float: left;','fl:r':'float: right;','cl:b':'clear: both;',
  'm:a':'margin: auto;','p:0':'padding: 0;','w:100':'width: 100px;','h:a':'height: auto;',
  'maw':'max-width: ;','mih':'min-height: ;',
  'bgc':'background-color: #fff;','bgi':'background-image: url();','bgr:n':'background-repeat: no-repeat;',
  'bgp':'background-position: 0 0;','bgsz:cv':'background-size: cover;',
  'fz':'font-size: ;','fw:b':'font-weight: bold;','fs:i':'font-style: italic;','ff':'font-family: ;',
  'lh':'line-height: ;','lts':'letter-spacing: ;','ta:c':'text-align: center;',
  'td:u':'text-decoration: underline;','tt:u':'text-transform: uppercase;','tov:e':'text-overflow: ellipsis;',
  'c':'color: #000;','c:r':'color: rgb(0, 0, 0);','c:ra':'color: rgba(0, 0, 0, .5);','op':'opacity: ;',
  'trs':'transition: prop time;','bxz:bb':'box-sizing: border-box;',
  'bxsh':'box-shadow: inset hoff voff blur color;','bd+':'border: 1px solid #000;','bd:n':'border: none;',
  'bdrs':'border-radius: ;','bdc':'border-color: #000;','bds:s':'border-style: solid;','bdw':'border-width: ;',
  'fx':'flex: ;','jc:c':'justify-content: center;','jc:sb':'justify-content: space-between;',
  'ai:c':'align-items: center;','as:c':'align-self: center;',
  'anim':'animation: name duration ...;','animdel':'animation-delay: time;',
  'animdur':'animation-duration: 0s;','animtf:l':'animation-timing-function: linear;',
  'trf':'transform: ;','trfr':'transform: rotate(angle);','trf:sc':'transform: scale(x, y);'
};

/* Parseo de atributos [a=1 b="x y"] */
function parseAttrs(str, tag) {
  const attrs = {};
  if (tag === 'a' && !str.includes('=') && !str.includes('"') && !str.includes("'")) {
    attrs.href = str.trim(); return attrs;
  }
  const re = /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s\]]+)))?/g;
  let m;
  while ((m = re.exec(str))) attrs[m[1]] = m[2] ?? m[3] ?? m[4] ?? '';
  return attrs;
}

/* Parseo de una unidad tag#id.class[attrs]{texto} */
function parseUnit(raw, parentTag) {
  let text = null;
  const tMatch = raw.match(/\{([^}]*)\}/);
  if (tMatch) { text = tMatch[1]; raw = raw.slice(0, tMatch.index) + raw.slice(tMatch.index + tMatch[0].length); }

  const rawBaseTag = raw.split(/[.#[]/)[0];
  const attrs = {};
  raw = raw.replace(/\[([^\]]*)\]/g, (_, inner) => { Object.assign(attrs, parseAttrs(inner, rawBaseTag)); return ''; });

  const idM = raw.match(/#([\w-]+)/);
  if (idM) { attrs.id = idM[1]; raw = raw.replace(idM[0], ''); }

  const classes = [];
  raw = raw.replace(/\.([\w-]+)/g, (_, c) => { classes.push(c); return ''; });
  if (classes.length) attrs.class = classes.join(' ');

  let tag = raw.trim();
  if (!tag) tag = IMPLICIT_IN[parentTag] || (text !== null ? 'span' : 'div');
  else if (HTML_ABBR[tag]) {
    const abbr = HTML_ABBR[tag];
    Object.assign(attrs, { ...abbr.attrs, ...attrs });
    tag = abbr.tag;
  }
  return { tag, attrs, text, void: VOID_TAGS.has(tag), children: [] };
}

function renderAttrs(attrs) {
  const keys = Object.keys(attrs);
  if (!keys.length) return '';
  return ' ' + keys.map(k => `${k}="${attrs[k]}"`).join(' ');
}

function applyIndex(str, idx) {
  return String(str)
    .replace(/\$(\$+)/g, (_, extra) => String(idx).padStart(extra.length + 1, '0'))
    .replace(/\$/g, idx);
}

function renderNode(node, depth = 0, index = null) {
  const pad = '  '.repeat(depth);
  const attrs = { ...node.attrs };
  let text = node.text;
  if (index !== null) {
    Object.keys(attrs).forEach(k => attrs[k] = applyIndex(attrs[k], index));
    if (text) text = applyIndex(text, index);
  }
  const open = `<${node.tag}${renderAttrs(attrs)}${node.void ? ' />' : '>'}`;
  if (node.void) return pad + open;
  if (text !== null && text !== undefined) return `${pad}${open}${text}</${node.tag}>`;
  return `${pad}${open}</${node.tag}>`;
}

function renderTree(parent, depth = 0) {
  let out = '';
  (parent.children || []).forEach(child => {
    if (child.group) { out += renderTree(child, depth); return; }
    const idx = child._index ?? null;
    if (child.children && child.children.length) {
      const attrs = { ...child.attrs };
      if (idx !== null) Object.keys(attrs).forEach(k => attrs[k] = applyIndex(attrs[k], idx));
      out += '  '.repeat(depth) + `<${child.tag}${renderAttrs(attrs)}>\n`;
      if (child.text) out += '  '.repeat(depth + 1) + applyIndex(child.text, idx ?? 0) + '\n';
      out += renderTree(child, depth + 1);
      out += '  '.repeat(depth) + `</${child.tag}>\n`;
    } else {
      out += renderNode(child, depth, idx) + '\n';
    }
  });
  return out;
}

function tokenize(str) {
  const tokens = [];
  let cur = '', depth = 0, inQuote = null;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inQuote) { cur += ch; if (ch === inQuote) inQuote = null; continue; }
    if (ch === '"' || ch === "'") { inQuote = ch; cur += ch; continue; }
    if ('({['.includes(ch)) depth++;
    if (')}]'.includes(ch)) depth--;
    if (depth === 0 && '>+^'.includes(ch)) {
      if (cur.trim()) tokens.push({ type: 'unit', val: cur.trim() });
      tokens.push({ type: 'op', val: ch });
      cur = ''; continue;
    }
    cur += ch;
  }
  if (cur.trim()) tokens.push({ type: 'unit', val: cur.trim() });
  return tokens;
}

function buildTree(tokens, rootNode) {
  let currentParents = [rootNode], lastCreated = [], stack = [];
  tokens.forEach(tok => {
    if (tok.type === 'op') {
      if (tok.val === '>') { stack.push(currentParents); currentParents = lastCreated.length ? lastCreated : currentParents; }
      else if (tok.val === '^') { currentParents = stack.length ? stack.pop() : [rootNode]; }
      return;
    }
    let raw = tok.val.trim(), times = 1;
    const m = raw.match(/\*(\d+)$/);
    if (m && raw.endsWith(m[0])) { times = parseInt(m[1], 10); raw = raw.slice(0, m.index).trim(); }

    const created = [];

    if (raw.startsWith('(') && raw.endsWith(')')) {
      const inner = raw.slice(1, -1);
      const innerTokens = tokenize(inner);
      currentParents.forEach(p => {
        for (let i = 0; i < times; i++) {
          const g = { tag: '__group__', attrs: {}, children: [], group: true };
          if (times > 1) g._index = i + 1;
          buildTree(innerTokens, g);
          p.children.push(g);
          created.push(g);
        }
      });
      lastCreated = created;
      return;
    }

    currentParents.forEach(parent => {
      const parentTag = parent.tag === 'root' || parent.group ? 'div' : parent.tag;
      for (let i = 0; i < times; i++) {
        const node = parseUnit(raw, parentTag);
        if (times > 1 && /\$/.test(raw)) node._index = i + 1;
        parent.children.push(node);
        created.push(node);
      }
    });
    lastCreated = created;
  });
}

function emmetToHTML(abbr) {
  if (!abbr || !abbr.trim()) return '';
  const tokens = tokenize(abbr.trim());
  if (!tokens.length) return '';
  const root = { tag: 'root', children: [] };
  buildTree(tokens, root);
  return renderTree(root).trimEnd().split('\n').filter(l => l.trim()).join('\n');
}

function expandEmmet(input, category = '') {
  if (!input || !input.trim()) return '';
  const t = input.trim();
  if (DOCTYPE_MAP[t]) return DOCTYPE_MAP[t];
  if (CSS_MAP[t]) return CSS_MAP[t];
  if (category === 'CSS' || /^[a-z]+:[0-9a-z%#-]+$/i.test(t)) {
    const m = t.match(/^([a-z]+):([0-9a-z%#-]+)$/i);
    if (m) {
      const props = { w:'width',h:'height',m:'margin',p:'padding',fz:'font-size',lh:'line-height',op:'opacity',pos:'position',d:'display',fl:'float',jc:'justify-content',ai:'align-items',tt:'text-transform' };
      if (props[m[1]]) return `${props[m[1]]}: ${/^\d+$/.test(m[2]) && m[2] !== '0' ? m[2] + 'px' : m[2]};`;
    }
  }
  return emmetToHTML(t);
}

/* =========================================================
   DETECCIÓN DE SINTAXIS
   ========================================================= */
function detectSyntax(abbr) {
  if (!abbr) return [];
  const s = new Set();
  if (/>/.test(abbr)) s.add('child');
  if (/\+/.test(abbr)) s.add('sibling');
  if (/\^/.test(abbr)) s.add('climb-up');
  if (/\(.+\)/.test(abbr)) s.add('grouping');
  if (/\*\d+/.test(abbr)) s.add('multiplication');
  if (/\$/.test(abbr)) s.add('naming');
  if (/#[\w-]+/.test(abbr)) s.add('id-class');
  if (/\.[\w-]+/.test(abbr)) s.add('id-class');
  if (/\[[^\]]+\]/.test(abbr)) s.add('attributes');
  if (/\{[^}]+\}/.test(abbr)) s.add('text');
  if (/^\s*[.#]/.test(abbr)) s.add('implicit');
  if (/^!$|^html:\w+$/.test(abbr)) s.add('doctype');
  if (/^[a-z]+:[0-9a-z%#-]+$/i.test(abbr) || CSS_MAP[abbr]) s.add('css-abbrev');
  if (HTML_ABBR[abbr]) s.add('abbreviation');
  if (VOID_TAGS.has(abbr.split(/[.#[]/)[0])) s.add('void');
  return [...s];
}

/* =========================================================
   ROUTER DE PESTAÑAS
   ========================================================= */
function activateTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${name}`));
  if (name === 'stats') renderStats();
  if (name === 'cheatsheet') renderCheatsheet();
  if (name === 'learn') renderLearnSidebar();
}

document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

/* =========================================================
   PRÁCTICA
   ========================================================= */
function buildCategoryProgress() {
  state.categoryProgress = {};
  CHALLENGES.forEach((c, i) => {
    if (!state.categoryProgress[c.category]) state.categoryProgress[c.category] = { total: 0, done: 0 };
    state.categoryProgress[c.category].total++;
    if (state.completed.has(i)) state.categoryProgress[c.category].done++;
  });
}

function loadChallenge(idx) {
  if (!CHALLENGES.length) return;
  idx = ((idx % CHALLENGES.length) + CHALLENGES.length) % CHALLENGES.length;
  state.currentChallenge = idx;
  const ch = CHALLENGES[idx];

  document.getElementById('category-badge').textContent = ch.category;
  document.getElementById('level-pill').textContent = `Nivel ${Math.floor(idx / 10) + 1}`;
  document.getElementById('difficulty-pill').textContent = ch.difficulty || 'fácil';
  document.getElementById('difficulty-pill').className = `difficulty-pill ${ch.difficulty || 'fácil'}`;
  document.getElementById('streak-indicator').textContent = `🔥 ${state.streak}`;
  document.getElementById('challenge-title').textContent = `Reto ${idx + 1}: ${ch.category}`;
  document.getElementById('challenge-desc').textContent = 'Escribe la abreviatura Emmet que produce este HTML.';
  document.getElementById('target-html').innerHTML = `<code>${escapeHtml(ch.html)}</code>`;

  const lvlPct = ((idx % 10) / 10) * 100;
  document.getElementById('level-progress-fill').style.width = lvlPct + '%';
  document.getElementById('level-progress-text').textContent = `Reto ${(idx % 10) + 1} de 10 del nivel ${Math.floor(idx / 10) + 1}`;

  // Explicación de sintaxis
  const synBox = document.getElementById('syntax-explanation');
  const synChips = document.getElementById('syntax-chips');
  const synTip = document.getElementById('syntax-tip');
  if (ch.syntaxUsed && ch.syntaxUsed.length) {
    synBox.hidden = false;
    synChips.innerHTML = ch.syntaxUsed.map(s => `<span class="syntax-chip">${s}</span>`).join('');
    synTip.textContent = ch.explanation || ch.hint || '';
  } else {
    synBox.hidden = true;
  }

  // Reset input
  const input = document.getElementById('emmet-input');
  input.value = '';
  input.classList.remove('correct', 'incorrect');
  input.focus();

  document.getElementById('hint-box').hidden = true;
  document.getElementById('hint-text').textContent = '';
  document.getElementById('user-html').innerHTML = '';
  document.getElementById('render-box').hidden = true;
  document.getElementById('render-preview').innerHTML = '';
  document.getElementById('comparison-box').hidden = true;
  setStatus('', '');
  document.getElementById('input-hints').innerHTML = '';
  document.getElementById('preview-validity').textContent = '';
  document.getElementById('preview-validity').className = 'preview-validity';
  state.hintUsed = false;

  resetTimer();
  startTimer();
  updateProgressBar();
}

function startTimer() {
  state.startTime = Date.now();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    const s = Math.floor((Date.now() - state.startTime) / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${mm}:${ss}`;
  }, 250);
}

function resetTimer() {
  clearInterval(state.timerInterval);
  document.getElementById('timer').textContent = '00:00';
}

function setStatus(msg, cls) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status' + (cls ? ' ' + cls : '');
}

function normalizeHTML(html) {
  if (!html) return '';
  return html.replace(/\r\n/g, '\n').replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><').replace(/\s*\/>/g, ' />').trim().toLowerCase();
}

function updateLivePreview(val) {
  const ch = CHALLENGES[state.currentChallenge];
  const out = val ? expandEmmet(val, ch?.category) : '';
  document.getElementById('user-html').innerHTML = out ? `<code>${escapeHtml(out)}</code>` : '';

  // Chips de sintaxis detectada
  const detected = detectSyntax(val);
  document.getElementById('input-hints').innerHTML = detected.map(s => `<span class="input-hint">${s}</span>`).join('');

  // Validez en vivo
  const validity = document.getElementById('preview-validity');
  if (!val) { validity.textContent = ''; validity.className = 'preview-validity'; return; }
  const ok = normalizeHTML(out) === normalizeHTML(ch.html);
  validity.textContent = ok ? '✓ válido' : '· distinto';
  validity.className = 'preview-validity ' + (ok ? 'ok' : 'ko');
}

function checkAnswer() {
  const input = document.getElementById('emmet-input');
  const val = input.value.trim();
  if (!val) return;
  state.attempts++;
  const ch = CHALLENGES[state.currentChallenge];
  const expectedAbbr = ch.input.trim().toLowerCase().replace(/\s+/g, '');
  const givenAbbr = val.toLowerCase().replace(/\s+/g, '');
  let userOutput = '';
  try { userOutput = expandEmmet(val, ch.category); } catch {}

  const isExact = expectedAbbr === givenAbbr;
  const isOutput = normalizeHTML(userOutput) === normalizeHTML(ch.html);
  const isCorrect = isExact || isOutput;

  if (isCorrect) {
    input.classList.add('correct');
    input.classList.remove('incorrect');
    setStatus('✅ ¡Correcto!', 'success');
    beep(880, 80);
    state.combo++;
    document.getElementById('combo-display').hidden = state.combo < 2;
    document.getElementById('combo-count').textContent = state.combo;

    if (!state.completed.has(state.currentChallenge)) {
      state.completed.add(state.currentChallenge);
      state.correctCount++;
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      state.xp += 10 + (state.hintUsed ? 0 : 5) + state.combo * 2;
      if (!state.hintUsed) state.noHintWins++;
      const elapsed = (Date.now() - state.startTime) / 1000;
      if (elapsed < state.fastestWin) state.fastestWin = elapsed;
      saveState(); buildCategoryProgress(); updateProgressBar();
      checkAchievements();
    }
    setTimeout(() => loadChallenge(state.currentChallenge + 1), 900);
  } else {
    input.classList.add('incorrect');
    input.classList.remove('correct');
    state.streak = 0;
    state.combo = 0;
    document.getElementById('combo-display').hidden = true;
    setStatus('❌ No coincide. Revisa la pista o inténtalo de nuevo.', 'error');
    beep(220, 120, 'square');

    // Registrar error
    state.mistakes.push({ input: val, expected: ch.input, category: ch.category, ts: Date.now() });
    if (state.mistakes.length > 50) state.mistakes = state.mistakes.slice(-50);
    saveState();

    // Comparación
    document.getElementById('comparison-box').hidden = false;
    document.getElementById('compare-expected').innerHTML = `<code>${escapeHtml(ch.html)}</code>`;
    document.getElementById('compare-actual').innerHTML = `<code>${escapeHtml(userOutput || '(vacío)')}</code>`;
  }

  // Render preview
  if (userOutput) {
    document.getElementById('render-box').hidden = false;
    document.getElementById('render-preview').innerHTML = userOutput;
  }
  updateProgressBar();
  renderStats();
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!state.unlockedAchievements.has(a.id) && a.condition(state)) {
      state.unlockedAchievements.add(a.id);
      showAchievementToast(a);
      beep(1200, 150, 'sine');
    }
  });
  saveState();
}

function showAchievementToast(a) {
  const t = document.getElementById('achievement-toast');
  document.getElementById('achievement-title').textContent = a.title;
  document.getElementById('achievement-desc').textContent = a.desc;
  t.hidden = false;
  setTimeout(() => t.hidden = true, 3500);
}

function updateProgressBar() {
  const total = CHALLENGES.length;
  const done = state.completed.size;
  const pct = total ? (done / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('global-progress-fill').style.width = pct + '%';
  document.getElementById('progress-count').textContent = done;
  document.getElementById('progress-total').textContent = total;
  const acc = state.attempts ? Math.round((state.correctCount / state.attempts) * 100) : 100;
  document.getElementById('accuracy-live').textContent = acc + '%';
  document.getElementById('xp-value').textContent = state.xp;
}

/* =========================================================
   ESTADÍSTICAS
   ========================================================= */
function renderStats() {
  document.getElementById('stat-completed').textContent = state.completed.size;
  document.getElementById('stat-accuracy').textContent =
    state.attempts ? Math.round((state.correctCount / state.attempts) * 100) + '%' : '0%';
  document.getElementById('stat-streak').textContent = state.streak;
  document.getElementById('stat-best').textContent = state.bestStreak;
  document.getElementById('stat-time').textContent = Math.round(state.totalTime / 60000) + 'm';
  document.getElementById('stat-xp').textContent = state.xp;

  buildCategoryProgress();
  const container = document.getElementById('category-progress');
  container.innerHTML = '';
  Object.entries(state.categoryProgress).forEach(([cat, { total, done }]) => {
    const pct = total ? Math.round((done / total) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'cat-row';
    row.innerHTML = `<span>${cat}</span><div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%"></div></div><span style="min-width:60px;text-align:right;color:var(--text-dim)">${done}/${total}</span>`;
    container.appendChild(row);
  });

  // Logros
  const ag = document.getElementById('achievements-grid');
  ag.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = state.unlockedAchievements.has(a.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `<div class="a-icon">${unlocked ? a.icon : '🔒'}</div><div class="a-title">${a.title}</div><div class="a-desc">${a.desc}</div>`;
    ag.appendChild(card);
  });

  // Errores
  const ml = document.getElementById('mistakes-list');
  ml.innerHTML = '';
  if (!state.mistakes.length) {
    ml.innerHTML = '<p class="empty-state">Aún no hay errores registrados. ¡Sigue practicando!</p>';
  } else {
    state.mistakes.slice(-8).reverse().forEach(m => {
      const div = document.createElement('div');
      div.className = 'mistake-item';
      div.innerHTML = `<div class="m-row"><span class="m-label">Tú:</span><code>${escapeHtml(m.input)}</code></div><div class="m-row"><span class="m-label">Correcto:</span><code>${escapeHtml(m.expected)}</code></div>`;
      ml.appendChild(div);
    });
  }
}

/* =========================================================
   CHEATSHEET
   ========================================================= */
let cheatFilter = 'all';

function renderCheatsheet(filter = '') {
  const container = document.getElementById('cheatsheet-container');
  const f = filter.trim().toLowerCase();
  container.innerHTML = '';
  Object.entries(CHEATSHEET).forEach(([cat, items]) => {
    const filtered = items.filter(it => !f || it.k.toLowerCase().includes(f) || it.v.toLowerCase().includes(f) || it.d.toLowerCase().includes(f));
    if (!filtered.length) return;
    const box = document.createElement('div');
    box.className = 'cheat-category';
    box.innerHTML = `<h3>${cat}</h3>`;
    filtered.forEach(it => {
      const row = document.createElement('div');
      row.className = 'cheat-item';
      row.innerHTML = `<span class="k">${escapeHtml(it.k)}</span><span class="v">${escapeHtml(it.v)}</span><span class="d">${escapeHtml(it.d)}</span>`;
      row.title = 'Clic para probar en el playground';
      row.onclick = () => {
        document.getElementById('pg-input').value = it.k;
        activateTab('playground');
        updatePlayground();
      };
      box.appendChild(row);
    });
    container.appendChild(box);
  });
}

document.getElementById('cheat-search').addEventListener('input', e => renderCheatsheet(e.target.value));

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    cheatFilter = chip.dataset.filter;
    renderCheatsheet(document.getElementById('cheat-search').value);
  });
});

/* =========================================================
   APRENDER
   ========================================================= */
function renderLearnSidebar() {
  document.querySelectorAll('.learn-nav-item').forEach(item => {
    item.onclick = () => {
      document.querySelectorAll('.learn-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderLearnTopic(item.dataset.topic);
    };
  });
}

function renderLearnTopic(topicKey) {
  const t = LEARN_TOPICS[topicKey];
  const content = document.getElementById('learn-content');
  if (!t) return;
  state.topicsRead.add(topicKey); saveState(); checkAchievements();

  let html = `<div class="learn-topic">
    <div class="learn-topic-category">${t.category}</div>
    <h2>${t.title}</h2>
    <p class="learn-topic-what">${t.what}</p>
    <div class="learn-topic-syntax">${escapeHtml(t.syntax)}</div>
    <h3>Ejemplos</h3>`;
  t.examples.forEach((ex, i) => {
    html += `<div class="learn-example">
      <div class="learn-example-header">
        <span class="learn-example-input">${escapeHtml(ex.input)}</span>
        <button class="learn-try" data-emmet="${escapeHtml(ex.input)}">Probar →</button>
      </div>
      <div class="learn-example-output">${escapeHtml(ex.output)}</div>
      <div class="learn-example-note">${ex.note}</div>
    </div>`;
  });
  html += `<h3>Consejos</h3><ul class="learn-tips">${t.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  if (t.practice && t.practice.length) {
    html += `<h3>Practica</h3><div class="learn-practice-chips">${t.practice.map(p => `<button class="learn-practice-chip" data-emmet="${escapeHtml(p)}">${escapeHtml(p)}</button>`).join('')}</div>`;
  }
  html += `</div>`;
  content.innerHTML = html;

  content.querySelectorAll('.learn-try, .learn-practice-chip').forEach(btn => {
    btn.onclick = () => {
      document.getElementById('pg-input').value = btn.dataset.emmet;
      activateTab('playground');
      updatePlayground();
    };
  });
}

/* =========================================================
   PLAYGROUND
   ========================================================= */
let pgDebounce;
function updatePlayground() {
  const val = document.getElementById('pg-input').value;
  const out = val ? expandEmmet(val) : '';
  document.getElementById('pg-output').innerHTML = out ? `<code>${escapeHtml(out)}</code>` : '<code>El resultado aparecerá aquí...</code>';

  // Render
  const renderBox = document.getElementById('pg-render-box');
  if (document.getElementById('pg-render').checked && out) {
    document.getElementById('pg-render-preview').innerHTML = out;
    renderBox.style.display = '';
  } else {
    renderBox.style.display = 'none';
  }

  // Sintaxis
  const synBox = document.getElementById('pg-syntax-detected');
  if (document.getElementById('pg-syntax').checked && val) {
    const detected = detectSyntax(val);
    synBox.innerHTML = detected.length
      ? `<div class="pg-syntax-list">${detected.map(s => `<span class="syntax-chip">${s}</span>`).join('')}</div>`
      : '<p class="pg-syntax-empty">No se detectó sintaxis especial</p>';
  } else {
    synBox.innerHTML = '<p class="pg-syntax-empty">Escribe una abreviatura para ver la sintaxis detectada</p>';
  }
  state.playgroundUses++;
  if (state.playgroundUses % 5 === 0) { saveState(); checkAchievements(); }
}

document.getElementById('pg-input').addEventListener('input', () => {
  clearTimeout(pgDebounce);
  pgDebounce = setTimeout(updatePlayground, 150);
});

document.querySelectorAll('.example-chip').forEach(chip => {
  chip.onclick = () => {
    document.getElementById('pg-input').value = chip.dataset.emmet;
    updatePlayground();
  };
});

document.getElementById('pg-clear').onclick = () => {
  document.getElementById('pg-input').value = '';
  updatePlayground();
};

document.getElementById('pg-copy').onclick = () => {
  const out = document.getElementById('pg-output').innerText;
  navigator.clipboard.writeText(out);
  document.getElementById('pg-copy').textContent = '✓';
  setTimeout(() => document.getElementById('pg-copy').textContent = '📋', 1200);
};

['pg-format', 'pg-render', 'pg-syntax'].forEach(id => {
  document.getElementById(id).addEventListener('change', updatePlayground);
});

/* =========================================================
   EVENTOS PRÁCTICA
   ========================================================= */
document.getElementById('btn-check').addEventListener('click', checkAnswer);
document.getElementById('emmet-input').addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
document.getElementById('emmet-input').addEventListener('input', e => updateLivePreview(e.target.value));

document.getElementById('btn-hint').addEventListener('click', () => {
  const ch = CHALLENGES[state.currentChallenge];
  document.getElementById('hint-box').hidden = false;
  document.getElementById('hint-text').textContent = ch.hint;
  state.hintUsed = true;
});

document.getElementById('btn-skip').addEventListener('click', () => loadChallenge(state.currentChallenge + 1));

document.getElementById('btn-clear').addEventListener('click', () => {
  document.getElementById('emmet-input').value = '';
  document.getElementById('user-html').innerHTML = '';
  document.getElementById('emmet-input').classList.remove('correct', 'incorrect');
  setStatus('', '');
  document.getElementById('input-hints').innerHTML = '';
  document.getElementById('preview-validity').textContent = '';
  document.getElementById('emmet-input').focus();
});

document.getElementById('btn-reveal').addEventListener('click', () => {
  const ch = CHALLENGES[state.currentChallenge];
  openModal('💡 Solución', `<p>La abreviatura correcta es:</p><pre style="background:var(--bg-base);padding:0.8rem;border-radius:6px;margin-top:0.6rem;font-family:var(--font-mono);color:#ffa657">${escapeHtml(ch.input)}</code></pre><p style="margin-top:0.8rem">${ch.hint}</p>`, [{ label: 'Cerrar', cls: 'primary' }]);
});

document.getElementById('btn-explain').addEventListener('click', () => {
  const ch = CHALLENGES[state.currentChallenge];
  const used = (ch.syntaxUsed || []).map(s => `<span class="syntax-chip">${s}</span>`).join(' ');
  openModal('🧠 Explicación', `<p><strong>${ch.category}</strong></p><p style="margin-top:0.6rem">${ch.explanation || ch.hint}</p><div style="margin-top:0.8rem">${used}</div>`, [{ label: 'Cerrar', cls: 'primary' }]);
});

document.getElementById('btn-copy-target').addEventListener('click', () => {
  const ch = CHALLENGES[state.currentChallenge];
  navigator.clipboard.writeText(ch.html);
  const b = document.getElementById('btn-copy-target');
  b.textContent = '✓'; setTimeout(() => b.textContent = '📋', 1200);
});

document.getElementById('btn-format').addEventListener('click', () => {
  updateLivePreview(document.getElementById('emmet-input').value);
});

document.getElementById('btn-undo').addEventListener('click', () => {
  const i = document.getElementById('emmet-input');
  i.value = ''; updateLivePreview(''); i.focus();
});

/* =========================================================
   TEMA Y SONIDO
   ========================================================= */
document.getElementById('btn-theme').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('light-theme', state.theme === 'light');
  document.getElementById('btn-theme').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  saveState();
});

document.getElementById('btn-sound').addEventListener('click', () => {
  state.soundOn = !state.soundOn;
  document.getElementById('btn-sound').textContent = state.soundOn ? '🔊' : '🔇';
  saveState();
});

/* =========================================================
   RESET / EXPORT / IMPORT
   ========================================================= */
document.getElementById('btn-reset').addEventListener('click', () => {
  openModal('🔄 Reiniciar progreso', '<p>¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.</p>', [
    { label: 'Cancelar', cls: 'ghost' },
    { label: 'Reiniciar', cls: 'danger', onClick: () => {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }}
  ]);
});

document.getElementById('btn-export').addEventListener('click', () => {
  const data = JSON.stringify({ ...state, completed: [...state.completed], unlockedAchievements: [...state.unlockedAchievements], topicsRead: [...state.topicsRead] }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `emmet-master-progress-${Date.now()}.json`;
  a.click();
});

document.getElementById('btn-import').addEventListener('click', () => {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'application/json';
  inp.onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        location.reload();
      } catch { alert('Archivo inválido'); }
    };
    r.readAsText(f);
  };
  inp.click();
});

/* =========================================================
   ARRANQUE
   ========================================================= */
function init() {
  loadState();
  document.body.classList.toggle('light-theme', state.theme === 'light');
  document.getElementById('btn-theme').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  document.getElementById('btn-sound').textContent = state.soundOn ? '🔊' : '🔇';
  buildCategoryProgress();
  renderCheatsheet();
  renderLearnSidebar();
  updateProgressBar();
  renderStats();
  loadChallenge(0);
  updatePlayground();
}

document.addEventListener('DOMContentLoaded', init);
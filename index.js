// Orbe : Un jeu de rythme à la souris : des orbes apparaissent sur le terrain, un cercle se resserre sur chacun ; clique au moment où il le touche, suis les glissières et fais tourner les toupies. Les 200 morceaux de Rythme, ou ta propre musique.
// Jeu NeoDex en pixel art dessiné à la main (police bitmap, cadres et boutons en pixels). Il tourne dans le bac à sable de NeoDex.
const HTML = `<div class="appWrap wide">
  <div class="agHead"><span class="label">Orbe</span><span class="hint">Souris pour viser · clic ou W / X pour frapper · garder appuyé sur les glissières · espace : jouer · P : pause</span></div>
  <div class="gMain"><div class="gameBox"><canvas id="gc" width="320" height="240"></canvas><button class="btn rhFs" id="rhFs">PLEIN ÉCRAN</button></div>
    <div class="gSide">
      <div class="sysCard"><b>RECORDS</b><div class="gStats" id="gStats"></div></div>
      <div class="row"><button class="btn main" id="gNew">NOUVELLE PARTIE</button></div>
      <div class="row"><button class="btn" id="rhTabSongs">CHANSONS</button><button class="btn" id="rhTabMine">MES MUSIQUES</button></div>
      <div class="sysCard rhImport" id="rhImport" style="display:none"><div class="row"><button class="btn main" id="rhFileBtn">IMPORTER UN FICHIER AUDIO</button><input type="file" id="rhFile" accept="audio/*,.mp3,.m4a,.ogg,.opus,.wav,.flac,.webm" hidden></div><div class="row"><select class="f" id="rhMuList"></select><button class="btn" id="rhMuBtn">CRÉER LE NIVEAU</button></div><div class="row"><label>Difficulté <select class="f" id="rhStars"><option value="1">1 ★</option><option value="2">2 ★</option><option value="3" selected>3 ★</option><option value="4">4 ★</option><option value="5">5 ★</option><option value="6">6 ★</option><option value="7">7 ★</option><option value="8">8 ★</option><option value="9">9 ★</option><option value="10">10 ★</option></select></label></div><span class="hint" id="rhImpMsg">Un fichier ou une musique de NeoMusic : le jeu trouve son tempo et ses temps forts et en fait un niveau.</span></div>
      <div id="rhSongs"></div>
      <div class="sysCard rhOpts"><label>Volume <input type="range" id="rhVol" min="0" max="100" value="70"></label><label>Son des clics <select class="f gSel" id="rhClick"><option value="0" selected>Doux</option><option value="1">Clap</option><option value="2">Bois</option><option value="3">Grosse caisse</option><option value="4">Cristal</option><option value="5">Pop</option><option value="6">Charleston</option><option value="7">Caisse claire</option><option value="8">Pluck</option><option value="9">Tok</option><option value="-1">Aucun</option></select></label><label title="La vitesse du curseur en partie (la souris est capturée, sans l'accélération de Windows)">Sensibilité <input type="range" id="obSens" min="0.3" max="3" step="0.05" value="1"> <span id="obSensV">1.00×</span></label><label>Décalage <input type="number" class="f" id="rhOffset" min="-300" max="300" step="5" value="0" style="width:80px" title="Réglé tout seul après chaque partie"> ms</label></div>
      <div class="hint">Un cercle se resserre sur chaque orbe : vise-le avec la souris et clique (ou W / X) quand le cercle touche l'orbe. Touche-les dans l'ordre de leurs numéros.</div><div class="hint">Glissière : touche son orbe, puis garde le bouton enfoncé et suis la boule jusqu'au bout (et au retour). Toupie : garde appuyé et fais tourner la souris autour du centre avant que l'anneau se referme.</div><div class="hint">La difficulté de chaque niveau est calculée sur ses notes : de 1★ à 10★.</div>
    </div></div>
</div>`;
const CSS = `.gMain{display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap}
.gameBox{display:grid;place-items:center;padding:10px;background:#05010b;flex:2;min-width:320px;position:relative}
.gameBox canvas{width:100%;image-rendering:pixelated;cursor:var(--cp,pointer);touch-action:none}
.gSide{display:flex;flex-direction:column;gap:14px;flex:1;min-width:250px;max-width:420px}
.gSide .sysCard{display:flex;flex-direction:column}
.gStats{display:grid;grid-template-columns:1fr auto;gap:4px 14px}
.gStats b{text-align:right}
.gameBox canvas{max-width:800px;aspect-ratio:320/240}
.rhFs{position:absolute;top:14px;right:14px;opacity:.85}
.gameBox:fullscreen{padding:0;background:#05010b}
.gameBox:fullscreen .rhFs{display:none}
.gameBox:fullscreen canvas{width:auto;height:100vh;max-width:none}
#rhSongs{display:flex;flex-direction:column;gap:10px;max-height:520px;overflow-y:auto;padding:2px 6px 2px 2px}
.rhSong{position:relative;gap:6px}
.rhSong.on{outline:3px solid var(--acc,#3fe0ff)}
.rhSong .btn{height:30px;font-size:13px;padding:0 8px}
.rhSong .row{flex-wrap:wrap;gap:6px}
.rhDel{all:unset;position:absolute;top:8px;right:10px;cursor:var(--cp,pointer);opacity:.7;font-size:16px}
.rhImport #rhMuList{flex:1;min-width:0}
.rhOpts{flex-direction:row!important;flex-wrap:wrap;gap:16px;align-items:center}
.rhOpts label{display:flex;align-items:center;gap:8px}
.gSide{max-width:460px}`;
/* ---------- l'habillage pixel art, dessiné à la main : police bitmap (accents compris), cadres, boutons, icônes ----------
   Tout est en pixels pleins, agrandis par 2 sans lissage : aucun dégradé, aucune ombre floue. */
const PXK = (() => {
  // chaque lettre : ses lignes, de haut en bas, à partir de la ligne 2 de la case (0-1 : accents des majuscules, 9-10 : jambages)
  const S = {
    A: '.###. #...# #...# ##### #...# #...# #...#', B: '####. #...# #...# ####. #...# #...# ####.', C: '.###. #...# #.... #.... #.... #...# .###.',
    D: '####. #...# #...# #...# #...# #...# ####.', E: '##### #.... #.... ####. #.... #.... #####', F: '##### #.... #.... ####. #.... #.... #....',
    G: '.###. #...# #.... #.### #...# #...# .####', H: '#...# #...# #...# ##### #...# #...# #...#', I: '### .#. .#. .#. .#. .#. ###',
    J: '..### ...#. ...#. ...#. #..#. #..#. .##..', K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#', L: '#.... #.... #.... #.... #.... #.... #####',
    M: '#...# ##.## #.#.# #.#.# #...# #...# #...#', N: '#...# ##..# #.#.# #..## #...# #...# #...#', O: '.###. #...# #...# #...# #...# #...# .###.',
    P: '####. #...# #...# ####. #.... #.... #....', Q: '.###. #...# #...# #...# #.#.# #..#. .##.#', R: '####. #...# #...# ####. #.#.. #..#. #...#',
    S: '.#### #.... #.... .###. ....# ....# ####.', T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..', U: '#...# #...# #...# #...# #...# #...# .###.',
    V: '#...# #...# #...# #...# #...# .#.#. ..#..', W: '#...# #...# #...# #.#.# #.#.# ##.## #...#', X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
    Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..', Z: '##### ....# ...#. ..#.. .#... #.... #####',
    a: '..... ..... .###. ....# .#### #...# .####', b: '#.... #.... ####. #...# #...# #...# ####.', c: '..... ..... .###. #.... #.... #.... .###.',
    d: '....# ....# .#### #...# #...# #...# .####', e: '..... ..... .###. #...# ##### #.... .###.', f: '..## .#.. #### .#.. .#.. .#.. .#..',
    g: '..... ..... .#### #...# #...# #...# .#### ....# .###.', h: '#.... #.... ####. #...# #...# #...# #...#', i: '.#. ... ##. .#. .#. .#. ###',
    'ı': '... ... ##. .#. .#. .#. ###', j: '...# .... ..## ...# ...# ...# ...# #..# .##.', k: '#... #... #..# #.#. ##.. #.#. #..#',
    l: '##. .#. .#. .#. .#. .#. ###', m: '..... ..... ##.#. #.#.# #.#.# #.#.# #...#', n: '..... ..... ####. #...# #...# #...# #...#',
    o: '..... ..... .###. #...# #...# #...# .###.', p: '..... ..... ####. #...# #...# #...# ####. #.... #....', q: '..... ..... .#### #...# #...# #...# .#### ....# ....#',
    r: '.... .... #.## ##.. #... #... #...', s: '..... ..... .#### #.... .###. ....# ####.', t: '.#.. .#.. #### .#.. .#.. .#.. ..##',
    u: '..... ..... #...# #...# #...# #..## .##.#', v: '..... ..... #...# #...# #...# .#.#. ..#..', w: '..... ..... #...# #...# #.#.# #.#.# .#.#.',
    x: '..... ..... #...# .#.#. ..#.. .#.#. #...#', y: '..... ..... #...# #...# #...# #...# .#### ....# .###.', z: '..... ..... ##### ...#. ..#.. .#... #####',
    0: '.###. #...# #..## #.#.# ##..# #...# .###.', 1: '..#.. .##.. ..#.. ..#.. ..#.. ..#.. .###.', 2: '.###. #...# ....# ...#. ..#.. .#... #####',
    3: '####. ....# ....# .###. ....# ....# ####.', 4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.', 5: '##### #.... ####. ....# ....# #...# .###.',
    6: '.###. #.... #.... ####. #...# #...# .###.', 7: '##### ....# ...#. ..#.. .#... .#... .#...', 8: '.###. #...# #...# .###. #...# #...# .###.',
    9: '.###. #...# #...# .#### ....# ....# .###.',
    '.': '. . . . . . #', ',': '.. .. .. .. .. .# .# #.', ':': '. . # . . . #', ';': '.. .. .# .. .. .# .# #.', '!': '# # # # # . #',
    '?': '.###. #...# ....# ...#. ..#.. ..... ..#..', "'": '# # . . . . .', '"': '#.# #.# ... ... ... ... ...', '-': '... ... ... ### ... ... ...',
    '+': '..... ..#.. ..#.. ##### ..#.. ..#.. .....', '/': '....# ...#. ...#. ..#.. .#... .#... #....', '(': '.# #. #. #. #. #. .#', ')': '#. .# .# .# .# .# #.',
    '%': '##..# ##.#. ...#. ..#.. .#... .#.## #..##', '·': '. . . # . . .', '×': '..... ..... #...# .#.#. ..#.. .#.#. #...#',
    '<': '...# ..#. .#.. #... .#.. ..#. ...#', '>': '#... .#.. ..#. ...# ..#. .#.. #...', '=': '.... .... #### .... #### .... ....',
    '_': '..... ..... ..... ..... ..... ..... #####', '#': '.#.#. .#.#. ##### .#.#. ##### .#.#. .#.#.', '&': '.##.. #..#. #.#.. .#... #.#.# #..#. .##.#',
    '…': '..... ..... ..... ..... ..... ..... #.#.#', '«': '..... ..#.# .#.#. #.#.. .#.#. ..#.# .....', '»': '..... #.#.. .#.#. ..#.# .#.#. #.#.. .....',
    '◀': '...# ..## .### #### .### ..## ...#', '▶': '#... ##.. ###. #### ###. ##.. #...', '→': '..... ..#.. ...#. ##### ...#. ..#.. .....',
    '←': '..... ..#.. .#... ##### .#... ..#.. .....', '↑': '..#.. .###. #.#.# ..#.. ..#.. ..#.. ..#..', '↓': '..#.. ..#.. ..#.. ..#.. #.#.# .###. ..#..',
    '*': '..... #.#.# .###. ##### .###. #.#.# .....', '[': '## #. #. #. #. #. ##', ']': '## .# .# .# .# .# ##', '|': '# # # # # # #',
    '@': '.###. #...# #.### #.#.# #.### #.... .###.', '€': '..### .#... ####. .#... ####. .#... ..###', '$': '..#.. .#### #.#.. .###. ..#.# ####. ..#..',
    '°': '.#. #.# .#. ... ... ... ...', '~': '..... ..... .#..# #.##. ..... ..... .....', '♪': '..##. ..#.# ..#.. ..#.. .##.. ###.. .#...',
  };
  const ACC = { a: ['..#', '.#.'], g: ['#..', '.#.'], c: ['.#.', '#.#'], d: ['...', '#.#'], t: ['.#.#', '#.#.'], z: ['.#.', '##.'] };  // aigu, grave, circonflexe, tréma, tilde, cédille
  const COMP = { é: 'ea', è: 'eg', ê: 'ec', ë: 'ed', á: 'aa', à: 'ag', â: 'ac', ä: 'ad', í: 'ıa', ì: 'ıg', î: 'ıc', ï: 'ıd', ó: 'oa', ò: 'og', ô: 'oc', ö: 'od',
    ú: 'ua', ù: 'ug', û: 'uc', ü: 'ud', ÿ: 'yd', ñ: 'nt', ç: 'cz', É: 'Ea', È: 'Eg', Ê: 'Ec', Ë: 'Ed', Á: 'Aa', À: 'Ag', Â: 'Ac', Ä: 'Ad', Í: 'Ia', Î: 'Ic', Ï: 'Id',
    Ó: 'Oa', Ô: 'Oc', Ö: 'Od', Ú: 'Ua', Ù: 'Ug', Û: 'Uc', Ü: 'Ud', Ñ: 'Nt', Ç: 'Cz' };
  const SUB = { 'œ': 'oe', 'Œ': 'OE', '’': "'", '‘': "'", '“': '"', '”': '"', '–': '-', '—': '-', ' ': ' ', ' ': ' ', '•': '·', '✓': 'v', 'ᐸ': '<', 'ᐳ': '>', '＜': '<', '＞': '>', '｜': '|', '／': '/', '！': '!', '？': '?', '（': '(', '）': ')', '：': ':', '　': ' ' };  // ᐸ ᐳ : les < > des titres YouTube
  const H = 11, glyphs = new Map(); let raster;
  function glyph(ch) {
    let g = glyphs.get(ch); if (g) return g;
    const px = [], add = (rows, ox, oy) => rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) if (r[x] === '#') px.push([ox + x, oy + y]); });
    const c = COMP[ch], src = S[c ? c[0] : ch]; let w = 3;
    if (src) {
      const rows = src.split(' '); w = Math.max(...rows.map(r => r.length)); add(rows, 0, 2);
      if (c) { const a = ACC[c[1]]; add(a, Math.floor((w - a[0].length) / 2), c[1] === 'z' ? 9 : /[A-Z]/.test(c[0]) ? 0 : 1); }
    } else if (ch !== ' ') {  // japonais, emoji… : la lettre du système, réduite à des pixels nets (sans lissage) sur la même hauteur que la police
      const q = (raster ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true })), RW = 16;
      q.canvas.width = RW; q.canvas.height = H; q.font = '11px "MS Gothic", "Yu Gothic UI", Meiryo, "Segoe UI Symbol", sans-serif'; q.fillStyle = '#000'; q.fillText(ch, 0, 10);
      const d = q.getImageData(0, 0, RW, H).data; let mx = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < RW; x++) if (d[(y * RW + x) * 4 + 3] > 110) { px.push([x, y]); mx = Math.max(mx, x + 1); }
      w = mx || 3;
      if (!px.length) { w = 5; add(['#####', '#...#', '#...#', '#...#', '#...#', '#...#', '#####'], 0, 2); }  // vraiment inconnue : une petite case
    }
    g = { w, px }; glyphs.set(ch, g); return g;
  }
  function layout(text) {
    let x = 0; const items = [];
    for (const ch of String(text)) for (const c of SUB[ch] ?? ch) { const g = glyph(c); items.push([g, x]); x += g.w + 1; }
    return { w: Math.max(0, x - 1), items };
  }
  function draw(g, text, x, y, color, s = 1) {  // (x, y) : coin haut gauche de la case
    const L = layout(text); g.fillStyle = color;
    for (const [gl, ox] of L.items) for (const [px, py] of gl.px) g.fillRect(x + (ox + px) * s, y + py * s, s, s);
    return L.w * s;
  }
  const bmp = new Map();
  function sprite(text, color, s = 1) {  // le texte tout prêt, gardé pour les images suivantes du jeu
    const k = text + '|' + color + '|' + s; let c = bmp.get(k); if (c) return c;
    c = document.createElement('canvas'); c.width = Math.max(1, layout(text).w * s); c.height = H * s; draw(c.getContext('2d'), text, 0, 0, color, s);
    if (bmp.size > 400) bmp.delete(bmp.keys().next().value);
    bmp.set(k, c); return c;
  }
  // comme fillText : (x, y) sur la ligne de base, aligné à gauche, au centre ou à droite
  function fill(g, text, x, y, color, s = 1, align = 'left') {
    const c = sprite(String(text), color, s), dx = align === 'center' ? -c.width / 2 : align === 'right' ? -c.width : 0;
    g.drawImage(c, Math.round(x + dx), Math.round(y - 9 * s));
  }
  const scale = size => Math.max(1, Math.round((size || 8) / 8));
  function art(rows, pal, s = 1) {  // un dessin en lignes de caractères, chaque caractère une couleur de la palette (« . » : transparent)
    const c = document.createElement('canvas'); c.width = Math.max(...rows.map(r => r.length)) * s; c.height = rows.length * s;
    const g = c.getContext('2d');
    rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) { const col = pal[r[x]]; if (col) { g.fillStyle = col; g.fillRect(x * s, y * s, s, s); } } });
    return c;
  }
  return { H, layout, draw, sprite, fill, scale, art };
})();

// les pièces de l'interface, pixel par pixel (K : contour, les autres lettres : la palette du jeu)
const PX_PANEL = ['..KKKKKKKKKKKK..', '.KAAAAAAAAAAAAK.', 'KALAAAAAAAAAALSK', 'KAAKKKKKKKKKKSSK', 'KAAKHHHHHHHHKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK',
  'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKKKKKKKKKKSSK', 'KALSSSSSSSSSSLSK', '.KSSSSSSSSSSSSK.', '..KKKKKKKKKKKK..'];
const PX_CARD = ['.KKKKKKKKKK.', 'KFFFFFFFFFFK', 'KFHHHHHHHHFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFSSSSSSSSFK', 'KFFFFFFFFFFK', '.KKKKKKKKKK.'];
const PX_BTN = ['.KKKKKKKKKK.', 'KWWWWWWWWWWK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK', 'KDDDDDDDDDDK', '.KKKKKKKKKK.'];
const PX_BTN_DOWN = ['............', '............', '.KKKKKKKKKK.', 'KBBBBBBBBBBK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.'];
const PX_TRACK = ['.KKKKKKKKKK.', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KHHHHHHHHHHK', '.KKKKKKKKKK.'];
const PX_KNOB = ['.KKKKK.', 'KWWWWWK', 'KWAAABK', 'KWAAABK', 'KKKKKKK', 'KWAAABK', 'KWAAABK', 'KBBBBBK', 'KDDDDDK', '.KKKKK.'];
const PX_RAIL = ['KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDHHDDK'];
const PX_ICONS = {
  play: ['kk......', 'kakk....', 'kaaakk..', 'kaaaaakk', 'kaaaaaak', 'kaaaaakk', 'kaaakk..', 'kakk....', 'kk......'],
  full: ['www...www', 'w.......w', 'w.......w', '.........', '....a....', '.........', 'w.......w', 'w.......w', 'www...www'],
  note: ['...aaaaaa', '...aaaaaa', '...a....a', '...a....a', '...a....a', '.aaa..aaa', 'aaaa.aaaa', 'aaaa.aaaa', '.aa...aa.'],
  star: ['....g....', '....g....', '...ggg...', 'ggggwgggg', '.ggwwwgg.', '..ggggg..', '..oo.oo..', '.oo...oo.', '.o.....o.'],
  crown: ['g...g...g', 'gg.ggg.gg', 'ggggggggg', 'grgggggrg', 'ggggggggg', 'ooooooooo'],
  folder: ['oooo.....', 'oggoooooo', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ooooooooo'],
  vol: ['....w....', '...ww..b.', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', '...ww..b.', '....w....'],
  clock: ['..wwwww..', '.w.....w.', 'w...a...w', 'w...a...w', 'w...aaa.w', 'w.......w', 'w.......w', '.w.....w.', '..wwwww..'],
  cursor: ['....a....', '..aaaaa..', '.a..a..a.', '.a.....a.', 'aaa.w.aaa', '.a.....a.', '.a..a..a.', '..aaaaa..', '....a....'],
  plus: ['...b...', '...b...', '...b...', 'bbbbbbb', '...b...', '...b...', '...b...'],
  down: ['wwwwwww', '.wwwww.', '..www..', '...w...'],
};

/* habille la page du jeu : root = son conteneur, T = sa palette, icons = [motif du texte, icône] pour les boutons et libellés */
function pxSkin(root, { T, icons = [], emblem, title }) {
  root.classList.add('pxk'); const s = 2, url = c => c.toDataURL();
  const btnPal = (M, W, B, D) => ({ K: T.k, W, M, B, D });
  const BN = btnPal(T.btn, T.btnHi, T.btnLo, T.k2), BH = btnPal(T.btnHov, T.btnHovHi, T.btnLo, T.k2);
  const BA = btnPal(T.acc, T.accL, T.accS, T.accD), BAH = btnPal(T.accL, '#ffffff', T.acc, T.accD);
  const img = { panel: PXK.art(PX_PANEL, { K: T.k, A: T.acc, S: T.accS, L: T.rivet, H: T.hl, D: T.fill }, s),
    card: PXK.art(PX_CARD, { K: T.k, F: T.line, H: T.hl, D: T.fill, S: T.k2 }, s), cardOn: PXK.art(PX_CARD, { K: T.k, F: T.acc, H: T.accS, D: T.fillOn, S: T.accD }, s),
    btn: PXK.art(PX_BTN, BN, s), btnH: PXK.art(PX_BTN, BH, s), btnD: PXK.art(PX_BTN_DOWN, BH, s),
    main: PXK.art(PX_BTN, BA, s), mainH: PXK.art(PX_BTN, BAH, s), mainD: PXK.art(PX_BTN_DOWN, BA, s),
    track: PXK.art(PX_TRACK, { K: T.k, D: T.k2, H: T.line }, s), knob: PXK.art(PX_KNOB, { K: T.k, W: T.accL, A: T.acc, B: T.accS, D: T.accD }, s),
    rail: PXK.art(PX_RAIL, { K: T.k, D: T.k2, H: T.line }, s), tile: PXK.art(T.tile, { x: T.bgDot, ':': T.bgDot2, '+': T.spark, '*': T.spark2 }, s) };
  const u = Object.fromEntries(Object.entries(img).map(([k, c]) => [k, url(c)]));
  const nine = (k, sl) => `border-style:solid;border-width:${sl * s}px;border-image:url(${u[k]}) ${sl * s} fill / ${sl * s}px stretch`;
  const IP = { k: T.k, w: T.text, a: T.acc, b: T.acc2, g: T.gold, o: T.orange, r: T.red, n: T.green, N: T.green2, m: T.muted, s: T.accS };
  const iconUrl = new Map(), icon = name => {
    let v = iconUrl.get(name); if (!v) { const c = PXK.art(PX_ICONS[name] || emblem, IP, s); v = { u: url(c), w: c.width, h: c.height }; iconUrl.set(name, v); }
    const b = document.createElement('b'); b.className = 'pxI'; b.setAttribute('aria-hidden', 'true'); b.style.cssText = `width:${v.w}px;height:${v.h}px;background-image:url(${v.u})`; return b;
  };
  const R = '.pxk.pxk';
  const css = document.createElement('style');
  css.textContent = `html,html body{background:${T.bg} url(${u.tile}) 0 0/${img.tile.width}px ${img.tile.height}px repeat!important}
::-webkit-scrollbar{width:16px;height:16px} ::-webkit-scrollbar-track{background:url(${u.rail}) 0 0/16px 8px repeat-y} ::-webkit-scrollbar-thumb{${nine('main', 4)}} ::-webkit-scrollbar-corner{background:none}
${R}{color:${T.text}}
${R} .px{box-shadow:none;background:none}
${R} .agHead{gap:18px;margin:0}
${R} .agHead .label{display:flex;align-items:center;gap:12px}
${R} .btn,${R} .tab{${nine('btn', 4)};height:auto;min-height:0;padding:0 6px 4px;margin:0;color:${T.text};font:12px/1 monospace;display:inline-flex;align-items:center;gap:6px;filter:none;text-shadow:none;letter-spacing:0;cursor:var(--cp,pointer)}
${R} .btn:hover,${R} .tab:hover{border-image-source:url(${u.btnH})}
${R} .btn:active,${R} .tab:active{border-image-source:url(${u.btnD});padding:4px 6px 0}
${R} .btn.main,${R} .tab.on{border-image-source:url(${u.main});color:${T.k}}
${R} .btn.main:hover,${R} .tab.on:hover{border-image-source:url(${u.mainH})}
${R} .btn.main:active,${R} .tab.on:active{border-image-source:url(${u.mainD})}
${R} .btn:focus-visible,${R} .tab:focus-visible{outline:2px dashed ${T.acc2};outline-offset:2px}
${R} .btn .pxV,${R} .tab .pxV{white-space:nowrap}
${R} .sysCard{${nine('card', 4)};padding:4px 6px;gap:8px;background:none}
${R} .sysCard.on{border-image-source:url(${u.cardOn})}
${R} .sysCard.on>b{color:${T.acc}}
${R} .sysCard>b{color:${T.text}}
${R} .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
${R} .gameBox,${R} .thBox{${nine('panel', 5)};box-shadow:none;background:none;padding:2px;gap:8px;grid-template-rows:auto auto}
${R} .gameBox canvas,${R} .thBox canvas{display:block;background:#05010b}
${R} .gameBox:fullscreen,${R} .thBox:fullscreen{border:0;padding:0;background:#000}
${R} .rhFs{position:static;opacity:1;justify-self:end;margin:0 6px 6px 0}
${R} .rhTabs{gap:8px;flex-wrap:wrap}
${R} .hint{color:${T.muted};line-height:24px}
${R} label{color:${T.muted};display:inline-flex;align-items:center;gap:8px}
${R} .rhDel{color:${T.red};top:6px;right:8px}
${R} input[type=range]{-webkit-appearance:none;appearance:none;background:none;height:20px;width:150px}
${R} input[type=range]::-webkit-slider-runnable-track{height:12px;${nine('track', 2)}}
${R} input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:20px;border:0;background:url(${u.knob}) 0 0/100% 100%;margin-top:-8px;cursor:var(--cp,pointer)}
${R} .pxSel{justify-content:space-between;gap:10px;max-width:100%;overflow:hidden}
${R} .rhImport .pxSel{flex:1;min-width:0}
.pxMenu{position:fixed;z-index:50;${nine('card', 4)};padding:2px;max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;color:${T.text}}
.pxMenu button{all:unset;padding:3px 8px;cursor:var(--cp,pointer);white-space:nowrap}
.pxMenu button:hover,.pxMenu button:focus-visible,.pxMenu button.on{background:${T.btnHov};color:${T.text}}
.pxMenu button.on{color:${T.acc}}
.pxT{position:relative;white-space:normal;font:12px/1 monospace;letter-spacing:0;text-transform:none}
.pxT i{display:inline-block;vertical-align:middle;background:currentColor;-webkit-mask:var(--m) 0 0/100% 100% no-repeat;mask:var(--m) 0 0/100% 100% no-repeat;image-rendering:pixelated}
.pxI{display:inline-block;vertical-align:middle;background:0 0/100% 100% no-repeat;image-rendering:pixelated;margin-right:6px}
.pxV>.pxI+.pxI{margin-left:-4px}
.pxSr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`;
  document.head.append(css);
  // un mot = une image (en masque : sa couleur suit celle du texte), une règle par mot pour ne pas répéter l'image
  const words = new Map(), sheet = document.head.appendChild(document.createElement('style')).sheet;
  const word = w => {
    let k = words.get(w);
    if (!k) { const c = PXK.sprite(w, '#fff', s); k = 'pw' + words.size; words.set(w, k); sheet.insertRule(`.${k}{--m:url(${c.toDataURL()});width:${c.width}px;height:${c.height}px}`, sheet.cssRules.length); }
    const i = document.createElement('i'); i.className = k; return i;
  };
  function render(vis, text, lead) {
    const parts = [], ic = lead && icons.find(([re]) => re.test(text.trim()));
    if (ic) parts.push(icon(ic[1]));
    for (const m of text.matchAll(/(★+)|(\s+)|([^\s★]+)/g)) {
      if (m[1]) for (const _ of m[1]) parts.push(icon('star'));
      else if (m[2]) parts.push(document.createTextNode(' '));
      else parts.push(word(m[3]));
    }
    vis.replaceChildren(...parts);
  }
  const lead = node => node.parentElement?.matches('button,label,.tab,.btn') && !node.previousSibling;
  function pixText(node) {  // le texte reste dans la page (lecteur d'écran, copier) ; on voit ses lettres en pixels
    const wrap = document.createElement('span'), sr = document.createElement('span'), vis = document.createElement('span');
    wrap.className = 'pxT'; sr.className = 'pxSr'; vis.className = 'pxV'; vis.setAttribute('aria-hidden', 'true');
    const first = lead(node); node.replaceWith(wrap); sr.append(node); wrap.append(sr, vis); render(vis, node.data, first);
  }
  function pxSelect(sel) {  // une liste déroulante en pixels ; la vraie reste cachée et garde sa valeur et ses événements
    sel.dataset.px = '1'; sel.style.display = 'none';
    const b = document.createElement('button'), lab = document.createElement('span'); b.type = 'button'; b.className = 'btn pxSel'; b.append(lab, icon('down')); sel.after(b);
    const sync = () => { const t = sel.selectedOptions[0]?.textContent || '—'; if (lab.dataset.t !== t) { lab.dataset.t = t; lab.textContent = t; } };
    const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', { configurable: true, get() { return d.get.call(this); }, set(v) { d.set.call(this, v); sync(); } });
    new MutationObserver(sync).observe(sel, { childList: true, subtree: true, characterData: true, attributes: true });
    sel.addEventListener('change', sync);
    b.onclick = () => {
      document.querySelector('.pxMenu')?.remove();
      const m = document.createElement('div'), r = b.getBoundingClientRect(); m.className = 'pxMenu'; m.setAttribute('role', 'listbox');
      for (const o of sel.options) {
        const it = document.createElement('button'); it.type = 'button'; it.textContent = o.textContent; it.className = o.selected ? 'on' : ''; it.setAttribute('role', 'option');
        it.onclick = () => { sel.value = o.value; sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); close(); b.focus(); };
        m.append(it);
      }
      root.append(m);
      const below = innerHeight - r.bottom; m.style.minWidth = r.width + 'px'; m.style.left = Math.min(r.left, innerWidth - m.offsetWidth - 4) + 'px';
      m.style.top = (below > m.offsetHeight + 8 || below > r.top ? r.bottom + 2 : r.top - m.offsetHeight - 2) + 'px';
      const close = () => { m.remove(); removeEventListener('pointerdown', out, true); removeEventListener('keydown', key, true); removeEventListener('blur', close); };
      const out = e => { if (!m.contains(e.target) && e.target !== b && !b.contains(e.target)) close(); };
      const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); b.focus(); } };
      addEventListener('pointerdown', out, true); addEventListener('keydown', key, true); addEventListener('blur', close);
      (m.querySelector('.on') || m.firstChild)?.focus();
    };
    sync();
  }
  const SKIP = 'select,option,textarea,script,style,canvas,.pxT,[data-pxskip]';
  let queued = false;
  function pass() {
    queued = false;
    root.querySelectorAll('select.gSel:not([data-px])').forEach(pxSelect);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), todo = [];
    for (let n; (n = w.nextNode());) if (n.data.trim() && n.parentElement && !n.parentElement.closest(SKIP)) todo.push(n);
    todo.forEach(pixText);
  }
  new MutationObserver(ms => {
    for (const m of ms) if (m.type === 'characterData') { const wrap = m.target.parentNode?.closest?.('.pxT'); if (wrap) render(wrap.lastChild, m.target.data, false); }
    if (!queued) { queued = true; queueMicrotask(pass); }
  }).observe(root, { childList: true, subtree: true, characterData: true });
  // le titre : grosses lettres à contour, trois tons, et l'emblème du jeu
  const lab = root.querySelector('.agHead .label');
  if (lab) {
    const L = PXK.layout(title), c = document.createElement('canvas'), g = c.getContext('2d'), on = [];
    c.width = L.w + 3; c.height = PXK.H + 3;
    for (const [gl, ox] of L.items) for (const [x, y] of gl.px) on.push([ox + x + 1, y + 1]);
    g.fillStyle = T.k; for (const [x, y] of on) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [2, 2], [1, 2], [2, 1]]) g.fillRect(x + dx, y + dy, 1, 1);
    for (const [x, y] of on) { g.fillStyle = y <= 5 ? T.accL : y <= 7 ? T.acc : T.accS; g.fillRect(x, y, 1, 1); }
    const big = document.createElement('canvas'), z = 4; big.width = c.width * z; big.height = c.height * z;
    const bg = big.getContext('2d'); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, big.width, big.height);
    const t = document.createElement('b'); t.className = 'pxI'; t.style.cssText = `width:${big.width}px;height:${big.height}px;background-image:url(${big.toDataURL()})`;
    const e = PXK.art(emblem, IP, 3), em = document.createElement('b'); em.className = 'pxI'; em.style.cssText = `width:${e.width}px;height:${e.height}px;background-image:url(${e.toDataURL()})`;
    const sr = document.createElement('span'); sr.className = 'pxSr'; sr.textContent = lab.textContent;
    lab.dataset.pxskip = '1'; lab.replaceChildren(em, t, sr);
  }
  pass();
}

export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, toast, sfx } = host;
  const folder = ctx.folder;
  // « neo.musicXxx » va au côté système de NeoMusic (son main.js), comme dans Rythme
  const MU_ID = 'neodex.music', MU_EV = { onMusicHotkey: 'music:hotkey', onMusicProgress: 'music:progress' };
  const neo = new Proxy({}, { get: (_, k) => { const n = ctx.neo;
    if (typeof k !== 'string') return n[k];
    if (MU_EV[k]) return cb => n.onPluginMain(e => { if (e.id === MU_ID && e.name === MU_EV[k]) cb(e.data); });
    const m = /^music([A-Z]\w*)$/.exec(k);
    return m ? (...a) => n.pluginMain(MU_ID, 'music:' + m[1][0].toLowerCase() + m[1].slice(1), ...a) : n[k];
  } });
  host.addStyle(CSS);
  view.innerHTML = HTML;
  pxSkin(view.querySelector('.appWrap'), { title: "ORBE", T: {"k": "#0a0814", "k2": "#141024", "fill": "#1e1834", "fillOn": "#2a2246", "hl": "#362c58", "line": "#544680", "acc": "#3fe0ff", "accL": "#b0f4ff", "accS": "#1a9ac0", "accD": "#0a3a4a", "rivet": "#b0f4ff", "btn": "#362c58", "btnHi": "#6a5aa0", "btnLo": "#141024", "btnHov": "#463a70", "btnHovHi": "#8a7ac0", "text": "#f4f0ff", "muted": "#b8b0d8", "acc2": "#ffd84a", "gold": "#ffd84a", "orange": "#ffa030", "red": "#ff4a5a", "green": "#7ee07a", "green2": "#2f8a3a", "bg": "#0c0a18", "bgDot": "#1e1834", "bgDot2": "#141024", "spark": "#544680", "spark2": "#ffd84a", "tile": ["................", "...:............", "................", "..........+.....", "................", "................", ".....:..........", "................", "................", ".............:..", "................", "..+.............", "................", ".........:......", "................", "................"]},
  emblem: ["....kkkk....", "..kkwwwwkk..", ".kww....wwk.", ".kw.kkkk.wk.", "kw.kwaaak.wk", "kw.kaaaak.wk", "kw.kaaask.wk", "kw.kassk..wk", ".kw.kkkk.wk.", ".kww....wwk.", "..kkwwwwkk..", "....kkkk...."],
  icons: [[/^PLEIN/, "full"], [/^IMPORTER/, "folder"], [/^CRÉER/, "plus"], [/^CHANSONS/, "note"], [/^MES MUSIQUES/, "folder"], [/^NOUVELLE/, "play"], [/^RECORDS/, "crown"]] });
  const $ = id => view.querySelector('#' + id) || document.getElementById(id);
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const games = { best: {}, ...(await doc('games')) };
  let gamesTimer = null;
  const saveGames = () => { clearTimeout(gamesTimer); gamesTimer = setTimeout(() => { gamesTimer = null; folder.write('games', games).catch(() => {}); }, 500); };
  const best = (k, v) => { const b = games.best[k]; if (b == null || v > b) { games.best[k] = v; saveGames(); return true; } return false; };
  const gstore = (k, init) => (games[k] ??= init);
function gameLoop(st, appKey, update, draw) {
  cancelAnimationFrame(st.raf);
  const STEP = 1000 / 60; let acc = 0, last = performance.now();
  const frame = t => {
    if (!view.classList.contains('on')) { st.raf = 0; if (st.mode === 'play') st.mode = 'pause'; return; }  // leaving the tab pauses the game
    st.raf = requestAnimationFrame(frame);
    acc += Math.min(200, t - last); last = t;
    while (acc >= STEP) { if (st.mode === 'play') update(); st.tick++; acc -= STEP; }
    draw();
  };
  st.raf = requestAnimationFrame(frame);
}
function gameText(g, w, lines, y0) {  // lignes centrées en police pixel, sur une bande sombre
  g.fillStyle = 'rgba(11,3,28,.72)'; g.fillRect(0, y0 - 14, w, lines.length * 14 + 14);
  lines.forEach(([text, color, size], i) => PXK.fill(g, text, w / 2, y0 + i * 14, color, PXK.scale(size), 'center'));
}
const px = (g, color, x, y, w = 1, h = 1) => { g.fillStyle = color; g.fillRect(Math.round(x), Math.round(y), w, h); };
function sprite(g, rows, x, y, pal) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const c = pal[r[i]]; if (c) px(g, c, x + i, y + j); } }); }
const seeded = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const pxFont = (g, text, x, y, color, size = 8, align = 'left') => { const s = PXK.scale(size); PXK.fill(g, text, x + s, y + s, '#05010b', s, align); PXK.fill(g, text, x, y, color, s, align); };

const clock = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
// petits outils communs aux jeux : une toile pré-dessinée, la position du pointeur dans le canevas, un bip
const cnv = (w, h, fn) => { const c = el('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; fn(g); return c; };
const spr = (rows, pal) => cnv(Math.max(...rows.map(r => r.length)), rows.length, g => sprite(g, rows, 0, 0, pal));
const W = 320, H = 240, cv = $('gc'), g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
const cpos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
let actx = null;
const beep = (f, d = .1, type = 'square', slide = 0, vol = .08) => { try { actx ??= new AudioContext(); const o = actx.createOscillator(), gn = actx.createGain(), t = actx.currentTime; o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d); gn.gain.setValueAtTime(vol, t); gn.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d + .02); } catch {} };
const keyOk = e => view.classList.contains('on') && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName);
const showStats = rows => $('gStats').replaceChildren(...rows.flatMap(([a, b]) => [el('span', '', a), el('b', '', String(b))]));
const muId = t => t ? (t.url ? 'url:' + t.url : 'file:' + (t.file || '')) : '';  // la bibliothèque de NeoMusic, lue telle quelle
let mu = null;
const muLoad = () => neo.musicLoad().then(d => { mu = d; });

/* ---------- Rythme: chiptune songs composed by the game (same notes every time), notes to hit on 4 lanes at the beat ---------- */
const RH = {W: 240, H: 320, HIT: 284, LANES: 4, LW: 40, X0: 40, KEYS: [['d', 'ArrowLeft'], ['f', 'ArrowDown'], ['j', 'ArrowUp'], ['k', 'ArrowRight']], COLORS: ['#ff5ad9', '#7fe0ee', '#ffd07a', '#8ee8a0'],
  WIN: [[.045, 'PARFAIT', 300, '#ffd07a'], [.09, 'BIEN', 200, '#8ee8a0'], [.14, 'OK', 100, '#7fe0ee']]};
const RH_SCALES = {major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], phrygian: [0, 1, 3, 5, 7, 8, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10], lydian: [0, 2, 4, 6, 7, 9, 11], harmonic: [0, 2, 3, 5, 7, 8, 11]};
// the 6 first songs, then 34 more, then 60 more made from seeded choices (100 in all, none alike): names, tempo going up, scale, chords, groove (drums) and lead sound
const RH_SONGS = [
  {name: 'Lever de néon', bpm: 96, seed: 11, mode: 'major', prog: [0, 5, 3, 4], root: 48},
  {name: 'Course de pixels', bpm: 124, seed: 23, mode: 'minor', prog: [0, 5, 2, 6], root: 45},
  {name: 'Orbite basse', bpm: 110, seed: 37, mode: 'dorian', prog: [0, 3, 0, 4], root: 50},
  {name: 'Cœur 8 bits', bpm: 118, seed: 41, mode: 'major', prog: [0, 4, 5, 3], root: 47},
  {name: 'Tempête cosmique', bpm: 148, seed: 53, mode: 'minor', prog: [0, 6, 5, 4], root: 44},
  {name: 'Hyperpropulsion', bpm: 168, seed: 67, mode: 'minor', prog: [0, 2, 3, 4], root: 46},
  ...(() => {
    const A = ['Comète', 'Nébuleuse', 'Quasar', 'Aurore', 'Prisme', 'Satellite', 'Météore', 'Zénith', 'Galaxie', 'Cristal', 'Écho', 'Pulsar', 'Éclipse', 'Horizon', 'Supernova', 'Astéroïde', 'Lune', 'Signal'];
    const B = ['sauvage', 'nocturne', 'électrique', 'infinie', 'glacée', 'brûlante', 'secrète', 'rebelle', 'magnétique', 'sonique', 'céleste', 'perdue', 'dorée', 'fantôme', 'turbo', 'binaire', 'lointaine', 'chromée'];
    const progs = [[0, 5, 3, 4], [0, 3, 4, 4], [5, 3, 0, 4], [0, 4, 5, 3], [0, 6, 5, 6], [0, 2, 5, 4], [3, 4, 0, 0], [0, 5, 1, 4], [0, 1, 0, 6]];
    const modes = Object.keys(RH_SCALES), grooves = ['classic', 'four', 'break', 'half'], waves = ['square', 'sawtooth', 'triangle', 'square'];
    const r = seeded(2026), used = new Set(['Lever de néon']), out = [];
    for (let i = 0; i < 34; i++) {
      let name; do name = A[Math.floor(r() * A.length)] + ' ' + B[Math.floor(r() * B.length)]; while (used.has(name)); used.add(name);
      out.push({name, bpm: Math.round(90 + i * 3.1 + r() * 10), seed: 100 + i * 13, mode: modes[Math.floor(r() * modes.length)], prog: progs[Math.floor(r() * progs.length)],
        root: 43 + Math.floor(r() * 9), groove: grooves[Math.floor(r() * grooves.length)], wave: waves[Math.floor(r() * waves.length)]});
    }
    // 60 de plus : d'autres mots, des structures, des arpèges et des densités de mélodie différents (les 40 premières restent telles quelles)
    const A2 = ['Mirage', 'Vortex', 'Cyclone', 'Lagune', 'Volcan', 'Tonnerre', 'Mercure', 'Orion', 'Saturne', 'Titan', 'Andromède', 'Lyre', 'Phénix', 'Dragon', 'Corail', 'Cobalt', 'Ambre', 'Jade', 'Opale', 'Rubis', 'Zéphyr', 'Néon', 'Radar', 'Turbine', 'Laser'];
    const B2 = ['arctique', 'solaire', 'vertigineuse', 'cosmique', 'aveugle', 'sauvage', 'brisée', 'liquide', 'cybernétique', 'sacrée', 'éclatante', 'muette', 'enchantée', 'orbitale', 'abyssale', 'radieuse', 'furtive', 'cristalline', 'astrale', 'volante', 'pixelisée', 'ardente', 'polaire', 'stellaire', 'mécanique'];
    const arps = [[0, 2, 4, 7], [0, 4, 7, 4], [0, 7, 4, 2], [0, 2, 7, 4], [4, 2, 0, 2], [0, 4, 2, 7]], r2 = seeded(7331);
    for (let i = 0; i < 60; i++) {
      let name; do name = A2[Math.floor(r2() * A2.length)] + ' ' + B2[Math.floor(r2() * B2.length)]; while (used.has(name)); used.add(name);
      out.push({name, bpm: Math.round(86 + i * 1.65 + r2() * 6), seed: 1000 + i * 29, mode: modes[Math.floor(r2() * modes.length)], prog: progs[Math.floor(r2() * progs.length)],
        root: 41 + Math.floor(r2() * 12), groove: grooves[Math.floor(r2() * grooves.length)], wave: waves[Math.floor(r2() * waves.length)],
        form: i % 4, arp: arps[Math.floor(r2() * arps.length)], dens: Math.round((.8 + r2() * .45) * 100) / 100});
    }
    return out;
  })(),
  // 100 de plus, par styles : plus longs (2 min 30 à 5 min), avec un 2e motif, des reprises et un changement de ton vers la fin
  ...(() => {
    const RH_STYLES = [
      {n: 'Ballade', bpm: [64, 84], groove: 'ballad', wave: ['triangle', 'sine'], modes: ['minor', 'major', 'dorian'], dens: [.6, .8], sec: [240, 300]},
      {n: 'Marche', bpm: [100, 114], groove: 'march', wave: ['square'], modes: ['major', 'mixolydian', 'minor'], dens: [.9, 1.1], sec: [170, 220]},
      {n: 'Funk', bpm: [98, 116], groove: 'funk', wave: ['square', 'sawtooth'], modes: ['mixolydian', 'dorian'], dens: [1.1, 1.35], sec: [180, 230]},
      {n: 'Techno', bpm: [124, 136], groove: 'four', wave: ['sawtooth'], modes: ['minor', 'phrygian', 'harmonic'], dens: [.9, 1.2], sec: [200, 260]},
      {n: 'Jungle', bpm: [162, 176], groove: 'dnb', wave: ['sawtooth', 'square'], modes: ['minor', 'harmonic', 'phrygian'], dens: [1, 1.2], sec: [170, 210]},
      {n: 'Épopée', bpm: [112, 138], groove: 'half', wave: ['sawtooth', 'square'], modes: ['major', 'lydian', 'minor'], dens: [.85, 1.1], sec: [240, 320]},
      {n: 'Chill', bpm: [76, 92], groove: 'half', wave: ['triangle', 'sine'], modes: ['dorian', 'major', 'lydian'], dens: [.65, .85], sec: [210, 270]},
      {n: 'Arcade', bpm: [140, 158], groove: 'classic', wave: ['square'], modes: ['major', 'mixolydian'], dens: [1.15, 1.4], sec: [150, 200]},
      {n: 'Boss', bpm: [148, 168], groove: 'break', wave: ['sawtooth'], modes: ['phrygian', 'harmonic', 'minor'], dens: [1, 1.3], sec: [180, 240]},
      {n: 'Rêverie', bpm: [68, 88], groove: 'ballad', wave: ['sine', 'triangle'], modes: ['lydian', 'major', 'dorian'], dens: [.6, .8], sec: [240, 320]},
    ];
    const SUB = ['Chant', 'Danse', 'Souvenir', 'Voyage', 'Message', 'Secret', 'Voile', 'Sentier', 'Rivage', 'Palais', 'Jardin', 'Phare', 'Pont', 'Récit', 'Reflet', 'Serment', 'Sommet', 'Horizon', 'Refuge', 'Passage', 'Éveil', 'Souffle', 'Cortège', 'Veillée', 'Légende'];
    const SUF = ['de minuit', 'des cendres', 'du cristal', 'des étoiles', 'de la brume', 'du dernier soir', 'des vents', 'de l\'aube', 'du verre', 'des marées', 'de l\'orage', 'du désert', 'des lanternes', 'du grand nord', 'des ruines', 'de la forêt', 'des comètes', 'du silence', 'de l\'hiver', 'du volcan', 'des sables', 'de la lune', 'des géants', 'de l\'exil', 'du matin'];
    const progs = [[0, 5, 3, 4, 0, 5, 1, 4], [0, 3, 4, 0, 5, 3, 1, 4], [5, 3, 0, 4, 5, 3, 1, 4], [0, 6, 5, 4, 0, 6, 3, 4], [0, 2, 5, 3, 0, 2, 6, 4], [0, 5, 3, 4], [0, 4, 5, 3], [5, 3, 0, 4]];
    const arps = [[0, 2, 4, 7], [0, 4, 7, 4], [0, 7, 4, 2], [0, 2, 7, 4], [4, 2, 0, 2], [0, 4, 2, 7]], r3 = seeded(90210), used = new Set(), out = [];
    const pick = a => a[Math.floor(r3() * a.length)], between = ([a, b]) => a + r3() * (b - a);
    const longForm = bars => { const f = [['intro', 4]], cyc = [['A', 8], ['B', 8], ['A', 8], ['B', 8], ['pont', 8], ['A', 8], ['B', 8], ['B', 8]]; let n = 8, i = 0; while (n + cyc[i % 8][1] <= bars) { f.push(cyc[i % 8]); n += cyc[i % 8][1]; i++; } f.push(['outro', 4]); return {form: f, bars: n}; };
    for (let i = 0; i < 100; i++) {
      const S = RH_STYLES[i % 10], bpm = Math.round(between(S.bpm)), barSec = 240 / bpm, want = Math.round(between(S.sec) / barSec / 4) * 4, {form, bars} = longForm(want);
      let name; do name = pick(SUB) + ' ' + pick(SUF); while (used.has(name)); used.add(name);
      out.push({name, style: S.n, bpm, seed: 5000 + i * 31, mode: pick(S.modes), prog: pick(progs), root: 41 + Math.floor(r3() * 12), groove: S.groove, wave: pick(S.wave),
        form, long: true, arp: pick(arps), dens: Math.round(between(S.dens) * 100) / 100, mod: i % 3 === 1 ? Math.round(bars * .66 / 4) * 4 : 0, len: bars * 16 * 60 / bpm / 4});
    }
    return out;
  })(),
];
console.assert(RH_SONGS.length === 200 && new Set(RH_SONGS.map(s => s.name)).size === 200 && new Set(RH_SONGS.map(s => s.seed)).size === 200 && RH_SONGS.slice(100).every(s => s.len > 140 && s.len < 340), 'rythme : 200 chansons différentes, les 100 dernières de 2 min 30 à 5 min');
// la structure d'une chanson : [partie, nombre de mesures] (0 = celle des 40 premières)
const RH_FORMS = [
  [['intro', 4], ['A', 8], ['B', 8], ['A', 8], ['pont', 4], ['B', 8], ['A', 8], ['outro', 4]],
  [['intro', 4], ['A', 8], ['A', 8], ['B', 8], ['pont', 4], ['B', 8], ['B', 8], ['outro', 4]],
  [['intro', 2], ['A', 8], ['B', 8], ['pont', 4], ['A', 8], ['B', 8], ['outro', 2]],
  [['intro', 4], ['A', 8], ['B', 8], ['A', 8], ['pont', 8], ['B', 8], ['A', 8], ['B', 8], ['outro', 4]],
];
const RH_DIFFS = {facile: 'Facile', normal: 'Normal', difficile: 'Difficile', expert: 'Expert'};
const midiHz = m => 440 * 2 ** ((m - 69) / 12);
function rhCompose(song) {  // -> {events: sounds to play, lead: melody notes, len: seconds}
  const r = seeded(song.seed), sc = RH_SCALES[song.mode], step = 60 / song.bpm / 4, events = [], lead = [], groove = song.groove || 'classic';
  const deg = d => song.root + (song.mod && bar >= song.mod ? 2 : 0) + 12 * Math.floor(d / 7) + sc[((d % 7) + 7) % 7];  // song.mod : la mesure où le morceau monte d'un ton
  const SECTIONS = Array.isArray(song.form) ? song.form : RH_FORMS[song.form || 0];
  const motif = kind => {  // a 2-bar melody: onsets on the 16th grid, scale degrees
    const out = []; let d = 9 + Math.floor(r() * 3);
    for (let s = 0; s < 32; s++) {
      const strong = (s % 8 === 0 ? .95 : s % 4 === 0 ? .7 : s % 2 === 0 ? (kind === 'B' ? .55 : .4) : (kind === 'B' ? .22 : .1)) * (song.dens || 1);
      if (r() < strong) { d += [-2, -1, -1, 0, 1, 1, 2, 3, -3][Math.floor(r() * 9)]; d = Math.max(5, Math.min(16, d)); out.push({s, d}); }
    }
    out.forEach((n, i) => n.len = Math.min(8, (out[i + 1]?.s ?? 32) - n.s));
    return out;
  };
  const kickAt = (kind, s) => kind === 'pont' ? s === 0 : groove === 'ballad' ? s === 0 || (kind === 'B' && s === 10) : groove === 'march' ? s === 0 || s === 8 : groove === 'funk' ? [0, 3, 10].includes(s) || (kind === 'B' && [6, 13].includes(s)) : groove === 'dnb' ? s === 0 || s === 10 || (kind === 'B' && s === 7) : groove === 'four' ? s % 4 === 0 : groove === 'break' ? [0, 6, 10].includes(s) || (kind === 'B' && s === 14) : groove === 'half' ? s === 0 || (kind === 'B' && s === 11) : s % 8 === 0 || (kind === 'B' && s === 10);
  const snareAt = s => groove === 'half' || groove === 'ballad' ? s === 8 : groove === 'march' ? s === 4 || s === 12 || s === 14 : groove === 'funk' ? s === 4 || s === 12 || s === 15 : s === 4 || s === 12;
  const motifs = {A: motif('A'), B: motif('B')}; if (song.long) { motifs.A2 = motif('A'); motifs.B2 = motif('B'); }  // les morceaux longs alternent deux motifs
  const hatStep = groove === 'ballad' ? 4 : groove === 'dnb' ? 1 : 0, bassStep = groove === 'ballad' ? 4 : 2, seen = {};
  let bar = 0;
  for (const [kind, bars] of SECTIONS) {
    const si = seen[kind] = (seen[kind] ?? -1) + 1;
    for (let b = 0; b < bars; b++, bar++) {
      const t0 = bar * 16 * step, chord = song.prog[bar % song.prog.length], energy = kind === 'B' ? 1 : kind === 'A' ? .8 : .5;
      for (let s = 0; s < 16; s++) {
        const t = t0 + s * step;
        if (kickAt(kind, s)) events.push({t, k: 'kick', v: 1});
        if (kind !== 'intro' && kind !== 'outro' && kind !== 'pont' && snareAt(s)) events.push({t, k: 'snare', v: .8});
        if (s % (hatStep || (kind === 'B' ? 1 : 2)) === 0 && kind !== 'pont') events.push({t, k: 'hat', v: s % 4 === 2 ? .6 : .35});
        if (s % bassStep === 0 && kind !== 'intro') events.push({t, k: 'bass', f: midiHz(deg(chord) - 12 + (s % 4 === 2 ? 12 : 0)), d: step * 1.8, v: .55 * energy});
        if (kind === 'B' || kind === 'pont') events.push({t, k: 'arp', f: midiHz(deg(chord + (song.arp || [0, 2, 4, 7])[s % 4]) + 12), d: step * .9, v: .16});
      }
      if (kind === 'A' || kind === 'B') {
        const m = motifs[kind + (song.long && si % 2 ? '2' : '')], half = b % 2, varied = b >= 6;
        for (const n of m) if ((n.s >= 16) === !!half) {
          let d = n.d + (varied && half ? 1 : 0); if (b === bars - 1 && n === m.at(-1)) d = 7;  // phrases end on the tonic
          const t = t0 + (n.s - half * 16) * step, f = midiHz(deg(d));
          events.push({t, k: 'lead', f, d: n.len * step * .92, v: song.wave === 'sawtooth' ? .22 : .3, w: song.wave || 'square'});
          lead.push({t, step: bar * 16 + n.s - half * 16, len: n.len, d, kind, downbeat: n.s % 16 === 0});
        }
      }
    }
  }
  return {events: events.sort((a, b) => a.t - b.t), lead, len: bar * 16 * step, step};
}
function rhChart(c, diff) {  // the notes to hit, from the melody (plus the snare in hard, the kick too in expert)
  const grid = {facile: 4, normal: 2, difficile: 1, expert: 1}[diff], hold = {facile: 8, normal: 6, difficile: 4, expert: 4}[diff], notes = [];
  let last = -1, lastT = -9;
  for (const n of c.lead) {
    if (n.step % grid) continue;
    if (diff === 'facile' && n.t - lastT < c.step * 3.5) continue;
    let lane = ((n.d % 4) + 4) % 4;
    if (lane === last && n.t - lastT < c.step * 2.5) lane = (lane + 1) % 4;
    const len = n.len >= hold ? n.len * c.step * .85 : 0;
    notes.push({t: n.t, lane, len});
    if (diff !== 'facile' && n.downbeat && (diff === 'expert' ? n.kind !== 'pont' : n.kind === 'B' && (diff === 'difficile' || n.step % 32 === 0))) notes.push({t: n.t, lane: (lane + 2) % 4, len: 0});
    last = lane; lastT = n.t;
  }
  const extra = diff === 'expert' ? ['snare', 'kick'] : diff === 'difficile' ? ['snare'] : [];
  for (const e of c.events) if (extra.includes(e.k) && !notes.some(n => Math.abs(n.t - e.t) < c.step * (e.k === 'kick' ? 1.1 : 1.5))) notes.push({t: e.t, lane: last = (last + 1) % 4, len: 0});
  return notes.sort((a, b) => a.t - b.t).map(n => ({...n, judged: false, held: false}));
}

/* ---------- levels made from your own music: tempo, beat and onsets found in the sound, notes placed on the beat grid ---------- */
function rhFFT(re, im) {  // in place, length a power of 2
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
  for (let len = 2; len <= n; len <<= 1) {
    const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a), h = len >> 1;
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < h; k++) {
        const p = i + k, q = p + h, xr = re[q] * cr - im[q] * ci, xi = re[q] * ci + im[q] * cr;
        re[q] = re[p] - xr; im[q] = im[p] - xi; re[p] += xr; im[p] += xi;
        const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
      }
    }
  }
}
// -> {bpm, beat0 (s), beat (s), peaks: [{t, s, band}], rms, fps, len}. Spectral flux on ~11 kHz mono, 512-point frames every 11.6 ms
async function rhAnalyse(buf) {
  const Y = () => new Promise(r => setTimeout(r, 0));  // on rend la main à l'écran pendant l'analyse
  const k = Math.max(1, Math.round(buf.sampleRate / 11025)), sr = buf.sampleRate / k, chs = Array.from({length: buf.numberOfChannels}, (_, c) => buf.getChannelData(c));
  const n = Math.floor(buf.length / k), x = new Float32Array(n);
  for (let i = 0; i < n; i++) { if (i % 400000 === 399999) { rhBar(.6 + .3 * i / n); await Y(); } let s = 0; for (const ch of chs) for (let j = 0; j < k; j++) s += ch[i * k + j]; x[i] = s / (k * chs.length); }
  const N = 512, H = 128, fps = sr / H, F = Math.max(0, Math.floor((n - N) / H)), hz = sr / N;
  const edges = [30, 150, 500, 2000, 5000].map(f => Math.max(1, Math.min(N / 2, Math.round(f / hz))));
  const win = Float32Array.from({length: N}, (_, i) => .5 - .5 * Math.cos(2 * Math.PI * i / (N - 1)));
  const flux = new Float32Array(F), band = [0, 1, 2, 3].map(() => new Float32Array(F)), rms = new Float32Array(F), re = new Float32Array(N), im = new Float32Array(N);
  let prev = new Float32Array(N / 2), cur = new Float32Array(N / 2);
  for (let f = 0; f < F; f++) {
    if (f % 250 === 249) await Y();
    let e = 0;
    for (let i = 0; i < N; i++) { const v = x[f * H + i]; re[i] = v * win[i]; im[i] = 0; e += v * v; }
    rms[f] = Math.sqrt(e / N);
    rhFFT(re, im);
    for (let b = 0; b < N / 2; b++) cur[b] = Math.log1p(100 * Math.hypot(re[b], im[b]));
    for (let q = 0; q < 4; q++) { let s = 0; for (let b = edges[q]; b < edges[q + 1]; b++) { const d = cur[b] - prev[b]; if (d > 0) s += d; } band[q][f] = s / (edges[q + 1] - edges[q]); flux[f] += band[q][f]; }
    [prev, cur] = [cur, prev];
  }
  // onset envelope: flux above its local average (0.5 s), never negative
  const env = new Float32Array(F), half = Math.round(fps * .25);
  let acc = 0; for (let f = 0; f < Math.min(F, half); f++) acc += flux[f];
  for (let f = 0; f < F; f++) {
    if (f + half < F) acc += flux[f + half]; if (f - half - 1 >= 0) acc -= flux[f - half - 1];
    const cnt = Math.min(F, f + half + 1) - Math.max(0, f - half); env[f] = Math.max(0, flux[f] - acc / cnt);
  }
  // tempo: autocorrelation of the envelope over 70-180 BPM, nudged towards 120 (where most songs are counted)
  let bestL = 0, bestS = -1;
  const lmin = Math.floor(fps * 60 / 180), lmax = Math.ceil(fps * 60 / 70), ac = new Float32Array(lmax + 2);
  for (let L = lmin; L <= lmax + 1; L++) { let s = 0; for (let f = 0; f + L < F; f += 2) s += env[f] * env[f + L]; ac[L] = s; }
  for (let L = lmin + 1; L <= lmax; L++) { const w = Math.exp(-.5 * (Math.log2(fps * 60 / L / 120) / .8) ** 2), s = ac[L] * w; if (s > bestS) { bestS = s; bestL = L; } }
  const a0 = ac[bestL - 1], a1 = ac[bestL], a2 = ac[bestL + 1], shift = a0 - 2 * a1 + a2 ? .5 * (a0 - a2) / (a0 - 2 * a1 + a2) : 0;
  const P = bestL + Math.max(-.5, Math.min(.5, shift)), bpm = Math.round(fps * 60 / P * 10) / 10;
  // where the beats fall: the phase whose comb of beats collects the most onsets
  let ph = 0, phS = -1;
  for (let p = 0; p < P; p++) { let s = 0; for (let t = p; t < F; t += P) s += env[Math.round(t)] + .5 * (env[Math.round(t) + 1] || 0); if (s > phS) { phS = s; ph = p; } }
  // onsets: local maxima clearly above the surroundings (1 s window)
  const peaks = [], W1 = Math.round(fps * .5);
  for (let f = 3; f < F - 3; f++) {
    const v = env[f]; if (v <= 0 || v < env[f - 1] || v < env[f + 1] || v < env[f - 2] || v < env[f + 2] || v < env[f - 3] || v < env[f + 3]) continue;
    let m = 0, m2 = 0, c = 0; for (let j = Math.max(0, f - W1); j < Math.min(F, f + W1); j += 2) { m += env[j]; m2 += env[j] * env[j]; c++; }
    m /= c; const sd = Math.sqrt(Math.max(0, m2 / c - m * m));
    if (v > m + .6 * sd) { let bb = 0; for (let q = 1; q < 4; q++) if (band[q][f] * (1 + q * .15) > band[bb][f] * (1 + bb * .15)) bb = q; peaks.push({t: f / fps + N / 2 / sr, s: v, band: bb, f}); }
  }
  return {bpm, beat: 60 / bpm, beat0: ph / fps + N / 2 / sr, peaks, rms, fps, len: buf.duration};
}
const rhTier = d => { const n = /^S\d+$/.test(d) ? +d.slice(1) : 0; return n ? (n <= 2 ? 'facile' : n <= 4 ? 'normal' : n <= 7 ? 'difficile' : 'expert') : d; };
function rhChartImport(a, diff) {  // diff : facile…expert, ou « S5 » = niveau à 5 étoiles
  const S = /^S\d+$/.test(diff) ? +diff.slice(1) : 0, D = rhTier(diff);
  const sub = S ? (S <= 2 ? 1 : S <= 5 ? 2 : 4) : {facile: 1, normal: 2, difficile: 4, expert: 4}[diff], nps = S ? [1, 1.5, 2.1, 2.8, 3.5, 4.3, 5.1, 6, 7, 8][S - 1] : {facile: 1.1, normal: 2, difficile: 3.1, expert: 4.4}[diff], gap = S ? Math.max(.09, Math.min(.42, .5 - S * .04)) : {facile: .42, normal: .24, difficile: .14, expert: .1}[diff];
  const slot = a.beat / sub, cands = new Map();
  for (const p of a.peaks) {  // each onset snaps to the nearest slot of the grid, if it is close enough
    const j = Math.round((p.t - a.beat0) / slot), t = a.beat0 + j * slot;
    if (Math.abs(p.t - t) > slot * .4 || t < 1 || t > a.len - .6) continue;
    const s = p.s * (j % sub === 0 ? 1.3 : 1), o = cands.get(j);
    if (!o || s > o.s) cands.set(j, {j, t, s, band: p.band, f: p.f});
  }
  const sorted = [...cands.values()].sort((x, y) => y.s - x.s), want = Math.min(sorted.length, Math.round(nps * a.len)), picked = [];
  const taken = new Set(), cell = t => Math.floor(t / gap);
  for (const c of sorted) {
    if (picked.length >= want) break;
    const z = cell(c.t); let ok = true;
    for (const q of [z - 1, z, z + 1]) for (const o of taken.has(q) ? picked.filter(p => cell(p.t) === q) : []) if (Math.abs(o.t - c.t) < gap) ok = false;
    if (ok) { picked.push(c); taken.add(z); }
  }
  picked.sort((x, y) => x.t - y.t);
  const strong = [...picked].sort((x, y) => y.s - x.s)[Math.floor(picked.length * .12)]?.s ?? Infinity, notes = [];
  let last = -1, lastT = -9;
  picked.forEach((c, i) => {
    let lane = c.band;  // low sounds on the left, high ones on the right
    if (lane === last && c.t - lastT < .3) lane = (lane + (i % 2 ? 1 : 3)) % 4;
    const next = picked[i + 1]?.t ?? a.len, room = next - c.t, f2 = Math.round(c.f + a.fps * a.beat), held = a.rms[f2] >= a.rms[c.f] * .4;
    const need = D === 'facile' ? 1.4 : 1.1, len = (D !== 'expert' || room >= a.beat * 2) && room >= a.beat * need && (held || room >= a.beat * 1.8) ? Math.min(room - a.beat * .3, a.beat * 3) * .9 : 0;
    notes.push({t: c.t, lane, len});
    if (D === 'expert' && c.s >= strong) notes.push({t: c.t, lane: (lane + 2) % 4, len: 0});
    last = lane; lastT = c.t;
  });
  return notes.map(n => ({...n, judged: false, held: false}));
}
const rhImports = () => gstore('rhythmImports', []);
const rhAnalysed = new Map();  // id -> {a, buffer}, for this session (recomputed from the sound: same notes on every PC)
async function rhLoadImport(imp) {
  if (rhAnalysed.has(imp.id)) return rhAnalysed.get(imp.id);
  const has = imp.file && (await neo.musicExists([imp.file]))[imp.file];
  const src = has ? 'neoplugin://neodex.music/file/' + encodeURIComponent(imp.file) : imp.url ? 'neoplugin://neodex.music/stream/?u=' + encodeURIComponent(imp.url) : '';
  if (!src) throw new Error('le fichier de cette musique n\'est pas sur ce PC');
  rhAudio(); toast('Analyse de la musique…'); rhBar(.08);
  const raw = await neo.musicBuffer(src); rhBar(.35);
  const buffer = await rhCtx.decodeAudioData(raw); rhBar(.6);
  const a = await rhAnalyse(buffer), r = {a, buffer}; rhBar(.95);
  rhAnalysed.set(imp.id, r);
  if (imp.bpm !== a.bpm || !imp.len) { imp.bpm = a.bpm; imp.len = Math.round(a.len); saveGames(); }
  return r;
}
async function rhAddImport(imp) {
  const list = rhImports();
  const old = list.find(x => x.id === imp.id); if (old) old.stars = imp.stars; else list.push(imp);
  saveGames(); rhTab = 'mine'; rhList();
  $('rhImpMsg').textContent = 'Analyse de « ' + imp.name + ' »…';
  try { const {a} = await rhLoadImport(imp); $('rhImpMsg').textContent = '« ' + imp.name + ' » : ' + a.bpm + ' BPM, niveaux prêts.'; await rhSelect(imp.id, imp.stars ? 'S' + imp.stars : 'normal'); }
  catch (e) { $('rhImpMsg').textContent = 'Impossible de lire « ' + imp.name + ' » : ' + e.message; }
  rhList();
}

const RH_LEN = [];
let rh = null, rhCtx = null, rhNoise = null, rhOut = null, rhTab = 'songs';
// les sons de frappe : un clic à chaque note touchée (le son choisi dans les réglages) et un son « combo cassé » quand on perd un combo de 10 ou plus.
// Calculés une fois à l'ouverture du son (rien à préparer au moment de frapper) : une attaque, un corps, une petite réverbération en stéréo, tous à la même force entendue
let rhKit = null;
function rhKitMake() {
  const sr = rhCtx.sampleRate, P = 2 * Math.PI, E = Math.exp, S = Math.sin, rn = seeded(7), nz = () => rn() * 2 - 1;
  const bq = (type, f, q = .707) => {  // un filtre (passe-bas, passe-haut ou passe-bande), formules classiques des égaliseurs
    const w = P * Math.min(f, sr * .45) / sr, cw = Math.cos(w), al = Math.sin(w) / (2 * q), a0 = 1 + al, a1 = -2 * cw, a2 = 1 - al;
    const [b0, b1, b2] = type === 'lp' ? [(1 - cw) / 2, 1 - cw, (1 - cw) / 2] : type === 'hp' ? [(1 + cw) / 2, -(1 + cw), (1 + cw) / 2] : [al, 0, -al];
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    return x => { const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; };
  };
  const env = (t, a, d) => t < a ? t / a : E(-(t - a) / d);  // monte en a secondes, retombe en d
  const glide = (t, f0, f1, k) => P * (f1 * t + (f0 - f1) * (1 - E(-k * t)) / k);  // la phase d'une note qui glisse de f0 vers f1
  const tick = (f, q, d) => { const b = bq('bp', f, q); return t => b(nz()) * E(-t / d); };  // l'attaque : un souffle très court
  // une petite pièce (réverbération courte, un peu différente à gauche et à droite) : le son respire au lieu de claquer à sec
  const room = (x, wet) => {
    const out = [0, 1].map(ch => {
      const y = new Float32Array(x.length), combs = [29.7, 37.1, 41.1, 43.7].map(ms => ({b: new Float32Array(Math.round((ms + ch * 1.7) * sr / 1000)), i: 0, lp: 0}));
      const aps = [5.1, 1.7].map(ms => ({b: new Float32Array(Math.round((ms + ch * .4) * sr / 1000)), i: 0}));
      for (let n = 0; n < x.length; n++) {
        let s = 0; for (const c of combs) { const o = c.b[c.i]; c.lp += (o - c.lp) * .55; c.b[c.i] = x[n] + c.lp * .74; c.i = (c.i + 1) % c.b.length; s += o; }
        s /= 4; for (const a of aps) { const o = a.b[a.i], v = s + o * .6; a.b[a.i] = v; a.i = (a.i + 1) % a.b.length; s = o - v * .6; }
        y[n] = x[n] + s * wet;
      }
      return y;
    });
    return out;
  };
  const mk = (dur, wet, drive, f) => {
    const n = Math.ceil((dur + .3) * sr), x = new Float32Array(n), m = Math.ceil(dur * sr);
    for (let i = 0; i < m; i++) { const t = i / sr; x[i] = Math.tanh(f(t) * drive) / Math.tanh(drive) * Math.min(1, (m - i) / (sr * .004)); }  // un peu de saturation : plus chaud et plus rond
    const [L, R] = room(x, wet), b = rhCtx.createBuffer(2, n, sr);
    let pk = 0, e = 0; const body = Math.min(n, Math.round(sr * .03)); for (let i = 0; i < n; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); if (i < body) e += L[i] * L[i]; }
    const k = Math.min(.95 / (pk || 1), .24 / (Math.sqrt(e / body) || 1)), fade = Math.round(sr * .05);  // même force entendue pour tous
    for (let i = 0; i < n; i++) { const g = k * Math.min(1, (n - i) / fade); L[i] *= g; R[i] *= g; }
    b.getChannelData(0).set(L); b.getChannelData(1).set(R); return b;
  };
  const doux = tick(5200, .8, .0015), clap = bq('bp', 1250, 1.3), clapS = bq('hp', 6000), bois = tick(3200, 1, .0012), kick = tick(2600, .7, .0025);
  const hat = [bq('hp', 7200), bq('hp', 7200), bq('bp', 10000, .9)], sn = bq('bp', 3300, .8), sn2 = bq('hp', 7000), tok = tick(4200, 1.4, .0016);
  const pluck = [523.25, 783.99].map(f => { const b = new Float32Array(Math.round(sr / f)), lp = bq('lp', 3500); for (let i = 0; i < b.length; i++) b[i] = lp(nz()); return {b, i: 0}; });
  const brk = bq('lp', 1800), brkN = bq('bp', 1500, .9);
  return [
    mk(.09, .14, 1.4, t => S(glide(t, 1150, 640, 70)) * env(t, .0008, .045) + .22 * S(2 * glide(t, 1150, 640, 70)) * env(t, .0005, .018) + .5 * doux(t)),  // doux
    mk(.16, .24, 1.2, t => { const s = nz(), b = clap(s); return b * ([0, .009, .018].reduce((v, a) => v + (t >= a && t < a + .02 ? E(-(t - a) / .0035) : 0), 0) + (t > .022 ? .9 * E(-(t - .022) / .065) : 0)) + .15 * clapS(s) * E(-t / .03); }),  // clap
    mk(.12, .16, 1.3, t => S(P * 1150 * t) * E(-t / .035) + .55 * S(P * 2630 * t) * E(-t / .017) + .25 * S(P * 4180 * t) * E(-t / .008) + .5 * bois(t)),  // bois
    mk(.22, .07, 2.2, t => S(glide(t, 190, 52, 32)) * env(t, .001, .12) + .45 * kick(t)),  // grosse caisse
    mk(.45, .32, 1.1, t => S(P * 1760 * t + 3.2 * E(-t / .05) * S(P * 1760 * 3.01 * t)) * env(t, .001, .28) + .35 * S(P * 2637 * t) * E(-t / .18) + .2 * S(P * 3520 * t) * E(-t / .08)),  // cristal
    mk(.08, .12, 1.3, t => S(P * (950 * t - 690 * (1 - E(-90 * t)) / 90)) * env(t, .0012, .028)),  // pop
    mk(.09, .14, 1.5, t => { let v = 0; for (const f of [205.3, 304.4, 369.6, 522.7, 540, 800]) v += Math.sign(S(P * f * 1.7 * t)); return hat[2](hat[1](hat[0](v / 6))) * env(t, .0005, .038); }),  // charleston
    mk(.2, .22, 1.6, t => .8 * S(glide(t, 270, 185, 30)) * env(t, .001, .055) + sn(nz()) * env(t, .001, .1) + .4 * sn2(nz()) * E(-t / .05)),  // caisse claire
    mk(.5, .26, 1.2, t => { let v = 0; for (const [j, p] of pluck.entries()) { const o = p.b[p.i], nx = p.b[(p.i + 1) % p.b.length]; p.b[p.i] = (o + nx) * .5 * .997; p.i = (p.i + 1) % p.b.length; v += o * (j ? .45 : 1); } return v * env(t, .001, .22); }),  // pluck
    mk(.1, .15, 2, t => S(P * 1720 * t) * E(-t / .011) + .7 * S(P * 510 * t) * E(-t / .028) + .6 * tok(t)),  // tok
    mk(.7, .35, 1.3, t => (brk(.5 * S(glide(t, 520, 120, 4)) + .35 * S(glide(t, 523, 121, 4) * 1.5)) * 1.4 + .5 * brkN(nz()) * E(-t / .12)) * env(t, .006, .24)),  // combo cassé : un « whoomp » grave qui descend
  ];
}
function rhPlayKit(i, v) { if (!rhCtx || !rhOut) return; rhKit ??= rhKitMake(); const s = rhCtx.createBufferSource(), g = rhCtx.createGain(); s.buffer = rhKit[i]; g.gain.value = v; s.connect(g).connect(rhOut); s.start(); }
const rhClick = () => { const i = +$('rhClick').value; if (i >= 0) rhPlayKit(i, .45); };
function rhHook(o) {  // à chaque changement du combo (en partie) : un clic s'il monte, « combo cassé » s'il retombe à 0 depuis 10 ou plus
  if (Object.getOwnPropertyDescriptor(o, 'combo')?.set) return o;
  let c = o.combo || 0;
  Object.defineProperty(o, 'combo', {get: () => c, set: v => { if (o.mode === 'play') { if (v > c) rhClick(); else if (!v && c >= 10) rhPlayKit(10, .5); } c = v; }, enumerable: true, configurable: true});
  return o;
}
function rhAudio() {
  rhCtx ??= new AudioContext();
  if (!rhNoise) { rhNoise = rhCtx.createBuffer(1, rhCtx.sampleRate, rhCtx.sampleRate); const d = rhNoise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  if (!rhOut) { rhOut = rhCtx.createGain(); rhOut.connect(rhCtx.destination); }
  rhOut.gain.value = +$('rhVol').value / 100 * .6;
  rhKit ??= rhKitMake();
}
function rhSound(e, when, c = rhCtx, out = rhOut) {
  const g = c.createGain(); g.connect(out);
  const env = (a, d, v) => { g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(v, when + a); g.gain.exponentialRampToValueAtTime(.0001, when + d); };
  if (e.k === 'kick') { const o = c.createOscillator(); o.frequency.setValueAtTime(150, when); o.frequency.exponentialRampToValueAtTime(40, when + .12); env(.002, .22, .9 * e.v); o.connect(g); o.start(when); o.stop(when + .25); }
  else if (e.k === 'snare' || e.k === 'hat') {
    const n = c.createBufferSource(), f = c.createBiquadFilter(); n.buffer = rhNoise;
    f.type = e.k === 'hat' ? 'highpass' : 'bandpass'; f.frequency.value = e.k === 'hat' ? 7000 : 1800;
    env(.001, e.k === 'hat' ? .045 : .17, (e.k === 'hat' ? .25 : .55) * e.v); n.connect(f).connect(g); n.start(when, Math.random() * .5); n.stop(when + .2);
  } else {
    const o = c.createOscillator(); o.type = e.k === 'lead' ? e.w || 'square' : 'triangle'; o.frequency.value = e.f;
    g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(e.v * (e.k === 'lead' ? .55 : 1), when + .006); g.gain.setValueAtTime(e.v * (e.k === 'lead' ? .4 : .7), when + Math.min(e.d, .08)); g.gain.exponentialRampToValueAtTime(.0001, when + e.d + .04);
    o.connect(g); o.start(when); o.stop(when + e.d + .06);
  }
}
// le morceau est « cuit » d'avance en un seul son (hors temps réel) : plus aucun instrument à créer pendant la partie, donc plus de saccades
const rhRendered = new Map();
async function rhRenderSong(i, c) {  // synthèse faite à la main dans un tableau (le moteur audio hors temps réel mettait plus de 20 s)
  if (rhRendered.has(i)) return rhRendered.get(i);
  toast('Préparation du niveau…'); rhBar(.3); await new Promise(r => setTimeout(r, 40));
  rhAudio();
  const R = 44100, N = Math.ceil((c.len + 1.5) * R), out = new Float32Array(N), nz = rhNoise.getChannelData(0), TAU = 2 * Math.PI;
  const biquad = (type, f) => { const w = TAU * f / R, al = Math.sin(w) / 2, cw = Math.cos(w), a0 = 1 + al, b = type === 'hp' ? [(1 + cw) / 2, -(1 + cw), (1 + cw) / 2] : [al, 0, -al]; return {b0: b[0] / a0, b1: b[1] / a0, b2: b[2] / a0, a1: -2 * cw / a0, a2: (1 - al) / a0}; };
  const HP = biquad('hp', 7000), BP = biquad('bp', 1800), expo = (a, t, T) => a * Math.pow(.0001 / a, t / T);
  for (const e of c.events) {
    const s0 = Math.floor(e.t * R); if (s0 >= N) continue;
    if (e.k === 'kick') {
      let ph = 0; const L = Math.min(N - s0, Math.floor(.25 * R)), v = .9 * e.v;
      for (let n = 0; n < L; n++) { const t = n / R, f = 150 * Math.pow(40 / 150, Math.min(t, .12) / .12); ph += TAU * f / R; out[s0 + n] += Math.sin(ph) * (t < .002 ? v * t / .002 : expo(v, t - .002, .218)); }
    } else if (e.k === 'snare' || e.k === 'hat') {
      const hat = e.k === 'hat', q = hat ? HP : BP, d = hat ? .045 : .17, v = (hat ? .25 : .55) * e.v, L = Math.min(N - s0, Math.floor((d + .02) * R));
      let x1 = 0, x2 = 0, y1 = 0, y2 = 0, o = Math.floor(Math.random() * nz.length * .5);
      for (let n = 0; n < L; n++) { const t = n / R, x = nz[(o + n) % nz.length], y = q.b0 * x + q.b1 * x1 + q.b2 * x2 - q.a1 * y1 - q.a2 * y2; x2 = x1; x1 = x; y2 = y1; y1 = y; out[s0 + n] += y * (t < .001 ? v * t / .001 : t < d ? expo(v, t - .001, d - .001) : 0); }
    } else {
      const lead = e.k === 'lead', w = lead ? e.w || 'square' : 'triangle', v1 = e.v * (lead ? .55 : 1), v2 = e.v * (lead ? .4 : .7), tm = Math.min(e.d, .08), T = e.d + .04, L = Math.min(N - s0, Math.floor((e.d + .06) * R)), inc = e.f / R;
      let ph = 0;
      for (let n = 0; n < L; n++) {
        const t = n / R; ph += inc; if (ph >= 1) ph -= 1;
        const s = w === 'square' ? (ph < .5 ? 1 : -1) : w === 'sawtooth' ? 2 * ph - 1 : w === 'sine' ? Math.sin(TAU * ph) : 1 - 4 * Math.abs(ph - .5);
        out[s0 + n] += s * (t < .006 ? v1 * t / .006 : t < tm ? v1 : t < T ? expo(v2, t - tm, T - tm) : 0);
      }
    }
  }
  for (let n = 0; n < N; n++) out[n] = Math.max(-1, Math.min(1, out[n] * .6));
  const buf = rhCtx.createBuffer(1, N, R); buf.copyToChannel(out, 0); rhRendered.set(i, buf); return buf;
}
let rhOffMs = 0;
const rhLatency = () => (rhCtx?.outputLatency || 0) + (rhCtx?.baseLatency || 0) + rhOffMs / 1000;
// l'horloge audio n'avance que par paquets (~10 ms sous Windows) : sur un écran à 144 ou 165 Hz, elle reste figée une image sur trois
// et les notes avancent par à-coups. On la prolonge avec l'horloge de l'écran entre deux paquets (jamais de plus de 50 ms, jamais en arrière).
const rhCk = {ct: -1, pt: 0, out: 0};
function rhTime() {
  const t = rhCtx.currentTime, p = performance.now();
  if (t !== rhCk.ct) { rhCk.ct = t; rhCk.pt = p; }
  const v = rhCtx.state === 'running' ? t + Math.min(.05, (p - rhCk.pt) / 1000) : t;
  rhCk.out = v < rhCk.out && rhCk.out - v < .06 ? rhCk.out : v;  // un paquet arrivé un peu tôt ne fait pas reculer les notes
  return rhCk.out;
}
const rhNow = () => rhTime() - rh.t0 - rhLatency();
const rhDrawAll = () => { cv.style.cursor = rh.mode === 'play' ? 'none' : ''; RHG.draw(); };  // le gros curseur gêne la lecture des notes pendant la partie
/* ---------- commun aux jeux de rythme : choix du morceau, calcul de difficulté, plein écran, départ, jugement, fin de partie ----------
   Le jeu fournit RHG = {key, factor, chart(base, c, diff), reset(), update(), draw()} avant d'appeler rhOpen(). */
// la difficulté en étoiles, calculée sur les notes elles-mêmes : densité moyenne, passages les plus chargés (fenêtres de 3 s) et déplacements entre voies
function rhStars(notes, len, factor = 1) {
  if (!notes.length) return 1;
  const ts = notes.map(n => n.t), first = ts[0], last = ts.at(-1), act = Math.max(20, Math.min(len, last - first + 2)), dens = notes.length / act;
  const wins = []; for (let i = 0, j = 0; i < ts.length; i++) { while (ts[i] - ts[j] > 3) j++; wins.push((i - j + 1) / 3); }
  wins.sort((a, b) => a - b); const peak = wins[Math.floor(wins.length * .9)] || dens;
  let moves = 0; for (let i = 1; i < notes.length; i++) if (Math.abs((notes[i].lane ?? 0) - (notes[i - 1].lane ?? 0)) >= 2) moves++;
  const jumps = notes.length > 1 ? moves / (notes.length - 1) : 0;
  return Math.max(1, Math.min(10, Math.round((.55 * dens + .45 * peak) * (1 + .35 * jumps) * 1.15 * factor * 10) / 10));
}
console.assert(rhStars([], 60) === 1 && rhStars(Array.from({length: 600}, (_, i) => ({t: i * .2, lane: i % 4})), 120) > rhStars(Array.from({length: 120}, (_, i) => ({t: i, lane: 0})), 120), 'rhStars');
const rhStarCache = new Map();  // 'i:diff' -> étoiles (les morceaux du jeu donnent toujours les mêmes notes)
function rhSongStars(i, diff) {
  const k = i + ':' + diff; if (!rhStarCache.has(k)) { const c = rhCompose(RH_SONGS[i]); rhStarCache.set(k, (RHG.stars || rhStars)(RHG.chart(rhChart(c, diff), c, diff), c.len, RHG.factor)); }
  return rhStarCache.get(k);
}
const rhStarTxt = s => s.toFixed(1) + '★';
// avant la partie : une barre de chargement (la musique est lue, décodée et analysée en entier d'avance, rien ne se charge pendant
// la partie), puis, une fois en plein écran, un compte à rebours : le passage en plein écran (qui fige l'écran un instant) ne tombe jamais sur des notes
const rhOver = () => {
  const box = cv.parentElement; let o = box.querySelector(':scope > .rhOver'); if (o) return o;
  o = document.createElement('div'); o.className = 'rhOver';
  o.innerHTML = '<div class="rhBar" hidden><span>Chargement du niveau…</span><i><b></b></i></div><div class="rhCount" aria-live="assertive"></div>';
  const st = document.createElement('style'); st.textContent = '.rhOver{position:absolute;inset:0;pointer-events:none;z-index:5}'
    + '.rhBar{position:absolute;left:50%;bottom:12%;transform:translateX(-50%);width:min(60%,420px);text-align:center;font-family:inherit;font-size:13px;line-height:1.6;color:#fff;text-shadow:0 1px 3px #000}'
    + '.rhBar i{display:block;height:8px;margin-top:6px;border-radius:4px;background:rgba(0,0,0,.55);box-shadow:0 0 0 1px rgba(255,255,255,.35);overflow:hidden}'
    + '.rhBar b{display:block;height:100%;width:0;background:var(--accent,#3fe0ff);transition:width .25s}'
    + '.rhCount{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:inherit;font-weight:800;font-size:min(22vw,22vh);line-height:1;color:#fff;text-shadow:0 0 24px var(--accent,#3fe0ff),0 4px 0 rgba(0,0,0,.6)}';
  o.append(st); if (getComputedStyle(box).position === 'static') box.style.position = 'relative'; box.append(o); return o;
};
const rhBar = p => { const b = rhOver().querySelector('.rhBar'); b.hidden = p == null; if (p != null) b.querySelector('b').style.width = Math.round(p * 100) + '%'; };
function rhCount() {  // 3, 2, 1 jusqu'au départ de la musique (l'horloge audio : une pause arrête le compte)
  const c = rhOver().querySelector('.rhCount'), tick = () => {
    const left = rh && rhCtx && (rh.mode === 'play' || rh.mode === 'pause') ? rh.t0 - rhCtx.currentTime : 0, n = left > 0 && left <= 3 ? String(Math.ceil(left)) : '';
    if (c.textContent !== n) c.textContent = n;
    if (left > 0) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);  // après le passage en mode « play »
}
let rhTok = 0;
async function rhSelect(i, diff) { const me = rhTok + 1; rhBar(.03); try { return await rhPrepare(i, diff); } finally { if (me === rhTok) rhBar(null); } }
async function rhPrepare(i, diff) {  // i : numéro d'un morceau du jeu, ou identifiant d'une musique importée
  let info, c, base; const tok = ++rhTok;
  if (rh) { try { rh.src?.stop(); } catch {} rh.mode = 'load'; }
  if (typeof i === 'number') {
    const song = RH_SONGS[i] || RH_SONGS[0]; i = RH_SONGS.indexOf(song); c = rhCompose(song); base = rhChart(c, diff); info = {name: song.name, bpm: song.bpm, key: 'rh' + i + diff};
    const buffer = await rhRenderSong(i, c); c = {events: c.events, lead: c.lead, len: c.len, step: c.step, buffer, beat0: 0};  // la batterie reste : Orbe y place ses streams
  } else {
    const imp = rhImports().find(x => x.id === i); if (!imp) return rhSelect(0, diff);
    const {a, buffer} = await rhLoadImport(imp);
    c = {events: [], lead: [], len: a.len, step: a.beat / 4, buffer, beat0: a.beat0, peaks: a.peaks}; base = rhChartImport(a, diff); info = {name: imp.name, bpm: a.bpm, key: 'rhx' + imp.id + diff};
  }
  if (tok !== rhTok) return;  // un autre niveau a été choisi entre-temps
  const notes = RHG.chart(base, c, diff).map(n => ({...n, judged: false}));
  rh = rhHook(rh || {raf: 0, tick: 0});
  Object.assign(rh, {mode: 'ready', song: i, diff, c, info, notes, stars: (RHG.stars || rhStars)(notes, c.len, RHG.factor), src: null, t0: 0, score: 0, combo: 0, maxCombo: 0,
    counts: {PARFAIT: 0, BIEN: 0, OK: 0, RATÉ: 0}, dts: [], fx: [], sparks: [], record: false, grade: '', acc: 0, adj: 0, overAt: 0});
  RHG.reset(); games.rhythmLast = {song: i, diff}; saveGames(); rhList();
  gameLoop(rh, RHG.key, RHG.update, rhDrawAll);
}
const rhFull = on => { try { if (on && !document.fullscreenElement) cv.parentElement.requestFullscreen?.().catch(() => {}); if (!on && document.fullscreenElement) document.exitFullscreen(); } catch {} };
function rhBegin() {  // plein écran (par-dessus la barre de NeoDex), puis le morceau part dans 2 secondes
  rhFull(true); rhAudio(); rhCtx.resume(); rh.t0 = rhCtx.currentTime + 4; rhCount(); rh.mode = 'play';
  try { rh.src?.stop(); } catch {} rh.src = rhCtx.createBufferSource(); rh.src.buffer = rh.c.buffer; rh.src.connect(rhOut); rh.src.start(rh.t0);
}
function rhPress() {  // espace ou clic hors partie : jouer, reprendre, rejouer
  if (!rh) return false;
  if (rh.mode === 'ready') { rhBegin(); return true; }
  if (rh.mode === 'pause') { rh.mode = 'play'; rhCtx.resume(); return true; }
  if (rh.mode === 'over') { if (rh.tick - rh.overAt > 40) rhSelect(rh.song, rh.diff); return true; }
  return false;
}
function rhPause() { if (rh?.mode === 'play') { rh.mode = 'pause'; rhCtx?.suspend(); } }
const rhWin = dt => RH.WIN.find(w => Math.abs(dt) <= w[0]);
function rhHit(n, dt) {  // -> la fenêtre atteinte (PARFAIT, BIEN, OK), ou rien si la note est ratée
  const w = rhWin(dt); n.judged = true; if (!w) { rhMissed(n); return null; }
  rh.dts.push(dt); rh.combo++; rh.maxCombo = Math.max(rh.maxCombo, rh.combo); rh.counts[w[1]]++; rh.score += Math.round(w[2] * (1 + Math.min(rh.combo, 100) / 100));
  return w;
}
function rhMissed(n) { n.judged = true; n.missed = true; rh.combo = 0; rh.counts['RATÉ']++; }
function rhCheckEnd(now) {
  if (now <= rh.c.len + 1.5) return false;
  rh.mode = 'over'; rh.overAt = rh.tick; try { rh.src?.stop(); } catch {} rhFull(false);
  const n = rh.notes.length, acc = n ? (rh.counts.PARFAIT * 300 + rh.counts.BIEN * 200 + rh.counts.OK * 100) / (n * 300) : 0;
  rh.acc = acc; rh.grade = acc >= .95 ? 'S' : acc >= .9 ? 'A' : acc >= .8 ? 'B' : acc >= .7 ? 'C' : 'D';
  const k = rh.info.key, res = gstore('rhythm', {}); rh.record = best(k, rh.score);
  if (rh.record || !res[k]) res[k] = {score: rh.score, acc: Math.round(acc * 1000) / 10, grade: rh.grade, combo: rh.maxCombo};
  rh.adj = rhAutoOffset(rh.dts); saveGames(); sfx('SAB'.includes(rh.grade) ? 'launch' : 'notify'); rhList(); rhInfo();
  return true;
}
function rhOffsetStep(dts) {  // décalage automatique : si tu tapes en moyenne en retard (ou en avance), on corrige de 70 % de l'écart
  if (dts.length < 20) return 0;
  const s = [...dts].sort((a, b) => a - b), med = s[s.length >> 1] * 1000;
  return Math.abs(med) < 8 ? 0 : Math.round(med * .7);
}
console.assert(rhOffsetStep(Array(30).fill(.05)) === 35 && rhOffsetStep(Array(30).fill(.004)) === 0, 'rhOffsetStep');
function rhAutoOffset(dts) { const d = rhOffsetStep(dts); if (!d) return 0; rhOffMs = Math.max(-300, Math.min(300, rhOffMs + d)); $('rhOffset').value = rhOffMs; gstore('rhythmPrefs', {}).rhOffset = String(rhOffMs); return d; }
// les textes communs dessinés dans le canevas : départ, chargement, pause, résultats
function rhScreens(y0 = 90) {
  const title = rh.info.name.length > 26 ? rh.info.name.slice(0, 25) + '…' : rh.info.name, diff = RH_DIFFS[rh.diff] || (String(rh.diff).startsWith('S') ? 'Perso' : rh.diff);
  if (rh.mode === 'ready') gameText(g, W, [[title.toUpperCase(), RHG.color, 10], [diff + ' · ' + rhStarTxt(rh.stars) + ' · ' + rh.notes.length + ' notes · ' + Math.round(rh.info.bpm) + ' BPM', '#e8e0ff'], ...RHG.help, ['Espace ou clic : jouer (plein écran)', '#ffd84a']], y0);
  if (rh.mode === 'load') gameText(g, W, [['CHARGEMENT…', '#ffd84a', 10], ['La musique se prépare', '#e8e0ff']], y0 + 20);
  if (rh.mode === 'pause') gameText(g, W, [['PAUSE', '#ffffff', 12], ['Espace : reprendre', '#e8e0ff']], y0 + 20);
  if (rh.mode === 'over' && rh.tick - rh.overAt > 20) gameText(g, W, [['NOTE ' + rh.grade, rh.grade === 'S' ? '#ffd84a' : RHG.color, 14], [rh.score + ' points · ' + (rh.acc * 100).toFixed(1) + ' %', '#ffffff'], ['Combo max ' + rh.maxCombo + ' · ' + rhStarTxt(rh.stars), '#e8e0ff'],
    ['Parfait ' + rh.counts.PARFAIT + ' · Bien ' + rh.counts.BIEN + ' · OK ' + rh.counts.OK + ' · Raté ' + rh.counts['RATÉ'], '#a8a0c8'], [rh.record ? 'NOUVEAU RECORD !' : 'Espace : rejouer', '#ffd84a'], ...(rh.adj ? [['Décalage ajusté : ' + (rh.adj > 0 ? '+' : '') + rh.adj + ' ms', '#7ee07a']] : [])], y0 - 10);
}
const rhProgress = (now, col) => { px(g, '#1a1430', 0, 0, W, 2); px(g, col, 0, 0, Math.max(0, Math.min(1, now / rh.c.len)) * W, 2); };
// la liste des morceaux, les imports, les réglages (le panneau de droite)
function rhDiffRow(key, sel, play, imp, songI) {
  const res = games?.rhythm || {}, row = el('div', 'row');
  if (imp?.stars) { const d = 'S' + imp.stars, r = res[key + d], b = el('button', 'btn' + (sel && rh?.diff === d ? ' main' : ''), 'JOUER · ' + imp.stars + '★' + (r ? ' · ' + r.grade : '')); if (r) b.title = r.score + ' points · ' + r.acc + ' %'; b.onclick = () => { b.blur(); play(d); }; row.append(b); return row; }
  for (const [d, label] of Object.entries(RH_DIFFS)) {
    const r = res[key + d], st = songI != null ? rhStarCache.get(songI + ':' + d) : null, b = el('button', 'btn' + (sel && rh?.diff === d ? ' main' : ''), label + (st ? ' ' + rhStarTxt(st) : '') + (r ? ' · ' + r.grade : ''));
    b.dataset.star = songI != null ? songI + ':' + d : ''; b.dataset.label = label + '|' + (r ? ' · ' + r.grade : '');
    b.title = (r ? r.score + ' points · ' + r.acc + ' % · ' : '') + 'difficulté calculée sur les notes'; b.onclick = () => { b.blur(); play(d); }; row.append(b);
  }
  return row;
}
let rhStarJob = 0;
function rhFillStars() {  // les étoiles se calculent petit à petit, sans figer l'écran
  const job = ++rhStarJob, btns = [...$('rhSongs').querySelectorAll('button[data-star]')].filter(b => b.dataset.star && !rhStarCache.has(b.dataset.star));
  const step = () => { if (job !== rhStarJob) return; const t = performance.now(); while (btns.length && performance.now() - t < 12) { const b = btns.shift(), [i, d] = b.dataset.star.split(':'), [lab, rest] = b.dataset.label.split('|'); b.textContent = lab + ' ' + rhStarTxt(rhSongStars(+i, d)) + rest; } if (btns.length) setTimeout(step, 30); };
  setTimeout(step, 60);
}
function rhList() {
  $('rhTabSongs').classList.toggle('main', rhTab === 'songs'); $('rhTabMine').classList.toggle('main', rhTab === 'mine');
  $('rhTabMine').textContent = 'MES MUSIQUES · ' + rhImports().length; $('rhImport').style.display = rhTab === 'mine' ? '' : 'none';
  if (rhTab === 'mine' && !$('rhMuList').options.length) rhFillNeoMusic();
  if (rhTab === 'songs') {
    const res = games?.rhythm || {}, done = RH_SONGS.filter((_, i) => Object.keys(RH_DIFFS).some(d => res['rh' + i + d])).length;
    $('rhTabSongs').textContent = 'CHANSONS · ' + done + ' / ' + RH_SONGS.length;
    const order = RH_SONGS.map((s, i) => i).sort((a, b) => RH_SONGS[a].bpm - RH_SONGS[b].bpm);
    $('rhSongs').replaceChildren(...order.map((i, rank) => {
      const s = RH_SONGS[i], c = el('div', 'sysCard rhSong' + (rh?.song === i ? ' on' : '')), mins = (RH_LEN[i] ??= s.len ?? rhCompose(s).len);
      c.append(el('b', '', (rank + 1) + '. ' + s.name), el('span', 'hint', (RHG.tag ? RHG.tag(mins) + ' · ' : '') + (s.style ? s.style + ' · ' : '') + s.bpm + ' BPM · ' + clock(mins)), rhDiffRow('rh' + i, rh?.song === i, d => rhSelect(i, d), null, i));
      return c;
    }));
    return rhFillStars();
  }
  const list = rhImports();
  $('rhSongs').replaceChildren(...(list.length ? list.map(imp => {
    const c = el('div', 'sysCard rhSong' + (rh?.song === imp.id ? ' on' : '')), x = el('button', 'rhDel', '×');
    x.title = 'Retirer ce niveau (la musique reste dans NeoMusic)';
    x.onclick = () => { games.rhythmImports = list.filter(o => o !== imp); rhAnalysed.delete(imp.id); saveGames(); rhList(); };
    c.append(x, el('b', '', imp.name), el('span', 'hint', (imp.bpm ? imp.bpm + ' BPM · ' + clock(imp.len || 0) : 'pas encore analysée') + (imp.url ? ' · YouTube' : ' · fichier')),
      rhDiffRow('rhx' + imp.id, rh?.song === imp.id, d => { $('rhImpMsg').textContent = 'Préparation du niveau…'; rhSelect(imp.id, d).then(() => $('rhImpMsg').textContent = '', e => $('rhImpMsg').textContent = 'Impossible : ' + e.message); }, imp));
    return c;
  }) : [el('span', 'hint', 'Importe un fichier audio, ou choisis une musique de NeoMusic : le jeu trouve son tempo et ses temps forts et en fait un niveau.')]));
}
async function rhFillNeoMusic() {
  try { await muLoad(); } catch {}
  const seen = new Set(), songs = (typeof mu === 'object' && mu ? mu.playlists.flatMap(p => p.tracks) : []).filter(t => (t.file || t.url) && !seen.has(muId(t)) && seen.add(muId(t)));
  $('rhMuList').replaceChildren(...(songs.length ? songs.map(t => { const o = el('option', '', (t.display_title || t.file).slice(0, 70)); o.value = muId(t); return o; }) : [el('option', '', 'Aucune musique dans NeoMusic')]));
  $('rhMuList')._songs = songs; $('rhMuBtn').disabled = !songs.length;
}
$('rhTabSongs').onclick = () => { rhTab = 'songs'; rhList(); };
$('rhTabMine').onclick = () => { rhTab = 'mine'; rhList(); rhFillNeoMusic(); };
$('rhFileBtn').onclick = () => $('rhFile').click();
$('rhFile').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try { const file = await neo.musicAddFile(await neo.pathOf(f)); rhAddImport({id: 'f:' + file, name: f.name.replace(/\.[^.]+$/, ''), file, stars: +$('rhStars').value}); }
  catch (err) { $('rhImpMsg').textContent = 'Import impossible : ' + err.message; }
};
$('rhMuBtn').onclick = () => { const t = $('rhMuList')._songs?.find(x => muId(x) === $('rhMuList').value); if (t) rhAddImport({id: muId(t), name: t.display_title || t.file, file: t.file || '', url: t.url || '', stars: +$('rhStars').value}); };
$('rhFs').onclick = () => { rhFull(!document.fullscreenElement); $('rhFs').blur(); };
$('rhOffset').addEventListener('change', () => { rhOffMs = +$('rhOffset').value; });
$('rhClick').onchange = () => { rhAudio(); rhCtx.resume(); rhClick(); };  // le son choisi, pour l'entendre
$('rhVol').oninput = () => { if (rhOut) rhOut.gain.value = +$('rhVol').value / 100 * .6; };
for (const id of ['rhVol', 'rhClick', 'rhOffset', 'obSens']) $(id).addEventListener('change', () => { gstore('rhythmPrefs', {})[id] = $(id).value; saveGames(); });
setInterval(() => { if (rhCtx?.state === 'running' && (!view.classList.contains('on') || rh?.mode !== 'play')) rhCtx.suspend(); }, 200);  // la musique s'arrête avec la partie
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) rhPause(); });  // Échap sort du plein écran : on met en pause
$('gNew').onclick = () => { if (rh) rhSelect(rh.song, rh.diff); $('gNew').blur(); };
function rhInfo() { const res = games.rhythm || {}, all = Object.values(res); showStats([['Morceaux joués', all.length], ['Notes S', all.filter(r => r.grade === 'S').length], ['Meilleur combo', all.reduce((m, r) => Math.max(m, r.combo || 0), 0)]]); }
function rhOpen() {
  const p = games.rhythmPrefs || {}; for (const id of ['rhVol', 'rhClick', 'rhOffset', 'obSens']) if (p[id] != null) $(id).value = p[id];
  rhOffMs = +$('rhOffset').value; obSensShow(); rhInfo();
  if (rh) { rhList(); return gameLoop(rh, RHG.key, RHG.update, rhDrawAll); }
  const last = games.rhythmLast || {song: 0, diff: 'normal'}; rhSelect(last.song, last.diff).catch(() => rhSelect(0, 'normal'));
}

/* ---------- Orbe : des orbes apparaissent sur le terrain, un cercle d'approche se resserre sur chacun : clique (ou W / X) au moment où il le touche,
   suis la boule des glissières bouton enfoncé, et fais tourner la souris sur les toupies. Les orbes d'un même combo sont numérotés. ---------- */
const OB = {X0: 32, Y0: 28, PW: 256, PH: 192,  // le terrain (4:3) dans la toile de 320 × 240
  COLS: ['#ff4fa8', '#3fe0ff', '#ffd84a', '#7ee07a'], KEYS: ['w', 'x', 'z', 'c'], SPIN_R: 74};
// les réglages d'un niveau, comme dans les jeux du genre : CS (taille des orbes), AR (le temps où on les voit venir), OD (la précision demandée),
// et le style de la map, tiré du morceau (le même à toutes ses difficultés) : il change les rythmes, le placement et ces réglages
const OB_STYLES = [
  {name: 'Sauts', cs: -.6, ar: .6, od: 0, sp: 1.5, fill: .4, stream: .2, slide: .7, sv: 1, pat: ['zig', 'tri', 'star', 'square']},
  {name: 'Streams', cs: .3, ar: .2, od: 0, sp: .8, fill: 1.1, stream: 2.4, slide: .6, sv: 1, pat: ['flow', 'flow', 'zig']},
  {name: 'Précision', cs: 1.8, ar: -.4, od: 1.2, sp: .85, fill: .6, stream: .4, slide: .9, sv: .9, pat: ['square', 'flow', 'tri']},
  {name: 'Technique', cs: .5, ar: .5, od: .6, sp: 1, fill: 2, stream: .9, slide: 1.3, sv: 1.35, pat: ['flow', 'zig', 'tri', 'square']},
  {name: 'Glissières', cs: 0, ar: 0, od: 0, sp: 1.1, fill: .6, stream: .5, slide: 2.2, sv: 1.6, pat: ['flow', 'flow', 'tri']},
  {name: 'Mixte', cs: 0, ar: 0, od: .3, sp: 1, fill: 1, stream: 1, slide: 1, sv: 1.1, pat: ['flow', 'zig', 'tri', 'square', 'star']},
];
// le niveau (1 à 10) choisi : il règle tout le reste
const obLevel = d => /^S\d+$/.test(d) ? +d.slice(1) : {facile: 2, normal: 4, difficile: 6, expert: 8}[d] || 4;
const obClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const obStyle = len => OB_STYLES[seeded(Math.round(len * 1000) ^ 0x51ed)() * OB_STYLES.length | 0];
function obStats(diff, len) {  // r : le rayon des orbes ; pre : le temps où on les voit venir (s) ; pk : la sévérité (les fenêtres PARFAIT / BIEN / OK divisées par pk)
  const lv = obLevel(diff), st = obStyle(len), cs = obClamp(2.6 + lv * .3 + st.cs, 2, 7), ar = obClamp(3.6 + lv * .6 + st.ar, 3, 10), od = obClamp(2.5 + lv * .55 + st.od, 2, 9.5);
  return {lv, st, cs, ar, od, r: Math.round(27.2 - 2.24 * cs), pre: (ar < 5 ? 1800 - 120 * ar : 1200 - 150 * (ar - 5)) / 1000, pk: .045 / ((80 - 6 * od) / 1000)};
}
// une glissière : un arc (courbe de Bézier) échantillonné, avec la longueur parcourue à chaque point pour avancer la boule à vitesse constante
function obPath(sx, sy, cx, cy, ex, ey) {
  const pts = []; let len = 0;
  for (let i = 0; i <= 32; i++) { const t = i / 32, u = 1 - t, x = u * u * sx + 2 * u * t * cx + t * t * ex, y = u * u * sy + 2 * u * t * cy + t * t * ey; if (pts.length) len += Math.hypot(x - pts.at(-1)[0], y - pts.at(-1)[1]); pts.push([x, y, len]); }
  return pts;
}
function obAt(pts, f) {  // le point à la fraction f (0..1) de la longueur
  const L = pts.at(-1)[2] * obClamp(f, 0, 1); let i = 1; while (i < pts.length - 1 && pts[i][2] < L) i++;
  const a = pts[i - 1], b = pts[i], k = b[2] > a[2] ? (L - a[2]) / (b[2] - a[2]) : 0; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
}
// où est la boule d'une glissière à l'instant now : elle fait l'aller, puis le retour si la glissière se répète
function obBall(n, now) { const f = obClamp((now - n.t) / n.len, 0, 1) * n.reps, pass = Math.min(n.reps - 1, Math.floor(f)), k = f - pass; return obAt(n.pts, pass % 2 ? 1 - k : k); }
const obEnd = n => n.kind === 'slide' ? obAt(n.pts, n.reps % 2 ? 1 : 0) : [n.x, n.y];
// les notes du morceau deviennent une map : même tirage sur tous les PC
function obChart(base, c, diff) {
  const S = obStats(diff, c.len), {lv, r} = S, step = c.step, beat = step * 4, b0 = c.beat0 || 0, rnd = seeded(Math.round(c.len * 1000) + base.length * 7919);
  const stAt = t => S.st.name !== 'Mixte' ? S.st : OB_STYLES[seeded(Math.floor((t - b0) / (beat * 32)) + 77)() * 5 | 0];  // Mixte : un autre style toutes les 8 mesures
  const K = t => Math.round((t - b0) / step), T = k => b0 + k * step;
  // 1. le rythme : un accord = un orbe, sur la grille des doubles-croches
  let ns = [];
  for (const n of base) { const p = ns.at(-1), k = K(n.t); if (p && p.k === k) { p.len = Math.max(p.len, n.len || 0); continue; } ns.push({k, t: n.t, len: n.len || 0}); }
  // là où la musique est chargée (batterie, mélodie, attaques entendues) : les streams n'y vont que là
  const hits = new Set([...(c.events || []).filter(e => e.k !== 'bass' && e.k !== 'arp'), ...(c.peaks || [])].map(e => K(e.t)));
  const busy = t => { if (!hits.size) return 1; let m = 0; for (let k = K(t) - 4; k <= K(t) + 4; k++) m += hits.has(k); return m / 9; };
  const med = ns.map(n => busy(n.t)).sort((a, b) => a - b)[ns.length >> 1] || 0;
  // les glissières : les notes tenues, et d'autres suivies d'un blanc, selon le style
  ns.forEach((a, i) => { const st = stAt(a.t), g = (ns[i + 1]?.k ?? a.k + 99) - a.k;
    a.slide = a.len >= beat * .9 / (1 + st.slide);
    if (!a.slide && g >= 4 && rnd() < (st.slide - .8) * .35 + (lv < 4 ? .15 : 0)) { a.len = (g - 2) * step; a.slide = true; }
    if (a.slide) a.len = Math.max(1, Math.min(Math.round(a.len / step), g - (g > 4 ? 2 : 1))) * step; });  // calée sur la grille, finie au moins une double-croche avant la note suivante
  // les doubles, triples et streams : des doubles-croches ajoutées entre deux notes, si le tempo le permet à ce niveau
  const minStep = lv >= 8 ? .068 : lv >= 6 ? .085 : lv >= 4 ? .11 : 9, maxRun = lv < 6 ? 5 : lv < 8 ? 9 : 17, add = [];
  let run = 1;  // la longueur de la suite de doubles-croches en cours
  for (let i = 0; i + 1 < ns.length; i++) {
    const a = ns[i], b = ns[i + 1], g = b.k - a.k, st = stAt(a.t);
    if (step < minStep || a.slide) { run = 1; continue; }
    if (g === 1) { run++; continue; }
    if (g <= 8 && busy(a.t) >= Math.max(.3, med) && run + g <= maxRun + 1 && rnd() < obClamp((lv - 4.5) * .1 * st.stream, 0, .85)) {  // un stream jusqu'à la note suivante
      for (let k = a.k + 1; k < b.k; k++) add.push({k, t: T(k), len: 0}); run += g - 1; continue;
    }
    if (lv >= 3.5 && g <= 8 && rnd() < obClamp((lv - 3) * .06 * st.fill, 0, .55)) {  // un double ou un triple qui mène à la note suivante
      const m = g >= 3 && lv >= 5 && rnd() < .5 ? 2 : 1; for (let j = m; j >= 1; j--) add.push({k: b.k - j, t: T(b.k - j), len: 0}); run = m + 1; continue;
    }
    run = 1;
  }
  // une suite de doubles-croches trop longue pour le niveau (ou trop rapide) est coupée : une note sautée laisse respirer
  ns = ns.concat(add).sort((a, b) => a.k - b.k); run = 1;
  ns = ns.filter((n, i) => { const p = i && ns[i - 1]; if (!p || n.k - p.k > 1 || p.drop) return run = 1; run++;
    const cap = step < minStep ? 1 : lv >= 8 && stAt(n.t).name === 'Streams' ? 33 : maxRun; return !(n.drop = run > cap); });
  // 2. le placement : l'écart suit le temps (les streams serrés, les sauts larges), la direction suit un motif par combo
  const M = r + 2, inside = (x, y) => x >= M && x <= OB.PW - M && y >= M && y <= OB.PH - M, out = [];
  let prevSlide = false, x = OB.PW / 2, y = OB.PH / 2, a = rnd() * 2 * Math.PI, lastSpin = -99, combo = 0, col = -1, bar = -99, last = -9, pat = 'flow', turn = 1, curve = .2;
  for (const n of ns) {
    if (n.t < last + .05) continue;  // tombe pendant la glissière ou la toupie d'avant : laissée de côté
    const st = stAt(n.t);
    if (n.len >= beat * 3 && n.t - lastSpin > 20) {  // une toupie : une très longue note, au plus une toutes les 20 secondes
      lastSpin = n.t; out.push({t: n.t, len: n.len, kind: 'spin', x: OB.PW / 2, y: OB.PH / 2, combo: 0, col: Math.max(0, col), r});
      x = OB.PW / 2; y = OB.PH / 2; combo = 0; bar = -99; last = n.t + n.len; continue;
    }
    const gap = n.t - last, inStream = gap < step * 1.5 && !prevSlide, gb = gap / beat, bb = Math.floor((n.t - b0) / (beat * 2));
    if (!out.length || (!inStream && (bb !== bar || combo >= 8)) || combo >= 16) {  // un nouveau combo : toutes les deux mesures, jamais au milieu d'un stream
      bar = bb; col = (col + 1) % OB.COLS.length; combo = 0; pat = st.pat[rnd() * st.pat.length | 0]; turn = rnd() < .5 ? 1 : -1; curve = (.1 + rnd() * .25) * turn;
    }
    const spB = (34 + lv * 8) * st.sp;  // l'écart pour un temps (en pixels), comme l'espacement réglé d'une map
    let d = gb * spB;
    if (inStream) d = (st.name === 'Précision' || st.name === 'Technique') && rnd() < .3 ? 0 : obClamp(d, r * .7, r * 1.9);  // en stream, serré (parfois un double empilé)
    else if (gb <= 1.01 && lv >= 4.5) d = Math.max(d, (lv - 3) * 13 * st.sp);  // sur un temps ou un demi-temps : de vrais sauts
    d = out.length ? obClamp(d, d && r * .7, 175) : 0;
    if (inStream) a += curve;  // les streams font des courbes
    else if (pat === 'zig') a += Math.PI - .45 * turn;
    else if (pat === 'tri') a += turn * 2 * Math.PI / 3;
    else if (pat === 'square') a += turn * Math.PI / 2;
    else if (pat === 'star') a += turn * 4 * Math.PI / 5;
    else { a += turn * (.4 + rnd() * .7); if (rnd() < .15) turn = -turn; }
    let nx = x + Math.cos(a) * d, ny = y + Math.sin(a) * d;
    for (let k = 0; k < 12; k++) {  // contre les bords : la direction rebondit ; loin des orbes encore à l'écran (sauf en stream)
      if (!inside(nx, ny)) { if (nx < M || nx > OB.PW - M) a = Math.PI - a; if (ny < M || ny > OB.PH - M) a = -a; if (k > 3) a += .7; }
      else if (inStream || !d || !out.some((o, j) => j < out.length - 1 && n.t - o.t < S.pre && Math.hypot(o.x - nx, o.y - ny) < r * 1.8)) break;
      else a += .7;
      nx = x + Math.cos(a) * d; ny = y + Math.sin(a) * d;
    }
    nx = obClamp(nx, M, OB.PW - M); ny = obClamp(ny, M, OB.PH - M);
    if (!d && out.length) { nx -= 3; ny -= 3; }  // un orbe empilé : décalé de quelques pixels pour qu'on voie qu'il y en a deux
    const o = {t: n.t, len: 0, kind: 'circle', x: nx, y: ny, combo: ++combo, col, r};
    if (n.slide) {  // une glissière : à suivre bouton enfoncé, en aller-retour si elle est longue ; sa vitesse dépend du niveau et du style
      const total = 50 * (.7 + lv * .09) * st.sv * n.len / beat, reps = Math.max(1, Math.ceil(total / 110)), L = obClamp(total / reps, r * 1.3, 110);
      for (let k = 0; k < 10; k++) {
        const s = a + (rnd() - .5) * .9, ex = nx + Math.cos(s) * L, ey = ny + Math.sin(s) * L, bend = rnd() < .3 ? 0 : (rnd() - .5) * L * (st.name === 'Glissières' ? 1.2 : .7);
        const cx = (nx + ex) / 2 - Math.sin(s) * bend, cy = (ny + ey) / 2 + Math.cos(s) * bend;
        if (inside(ex, ey) && inside(cx, cy)) { Object.assign(o, {kind: 'slide', len: n.len, pts: obPath(nx, ny, cx, cy, ex, ey), reps}); a = reps % 2 ? Math.atan2(ey - cy, ex - cx) : Math.atan2(ny - cy, nx - cx); break; }
        a += Math.PI / 3;
      }
    }
    out.push(o); [x, y] = obEnd(o); last = o.t + o.len; prevSlide = o.kind === 'slide';
  }
  return out;
}
// la difficulté en étoiles, à la manière des jeux du genre : la visée (l'écart entre orbes, en diamètres, rapporté au temps) et la vitesse (les clics par seconde),
// en efforts qui s'accumulent et retombent, les passages les plus durs comptant le plus
function obStars(ns) {
  if (ns.length < 2) return 1;
  let aim = 0, spd = 0, sec = ns[0].t + .4, ma = 0, ms = 0; const A = [], P = [];
  for (let i = 1; i < ns.length; i++) {
    const p = ns[i - 1], n = ns[i]; if (n.kind === 'spin' || p.kind === 'spin') continue;
    const dt = Math.max(.05, n.t - p.t), [ex, ey] = obEnd(p), d = Math.hypot(n.x - ex, n.y - ey) / (2 * n.r) + (p.kind === 'slide' ? .5 : 0);
    while (n.t > sec) { A.push(ma); P.push(ms); ma *= .15 ** .4; ms *= .3 ** .4; sec += .4; }
    aim = aim * .15 ** dt + d / dt * .09; spd = spd * .3 ** dt + 1 / dt * .09; ma = Math.max(ma, aim); ms = Math.max(ms, spd);
  }
  A.push(ma); P.push(ms);
  const top = v => v.sort((x, y) => y - x).reduce((s, x, i) => s + x * .9 ** i, 0);
  const v = Math.sqrt(top(A)) * .62 + Math.sqrt(top(P)) * .52; return Math.max(1, Math.min(10, Math.round(.7 * v ** 1.1 * 10) / 10));
}
const RHG = {key: 'orbe', factor: .9, color: '#3fe0ff',
  get help() { const o = rh?.ob; return [...(o ? [[o.st.name + ' · CS ' + o.cs.toFixed(1) + ' · AR ' + o.ar.toFixed(1) + ' · OD ' + o.od.toFixed(1), '#3fe0ff']] : []),
    ['Clique (ou W / X) quand le cercle touche l\'orbe', '#e8e0ff'], ['Glissières : suis la boule · toupies : tourne', '#c8f8ff']]; },
  chart: obChart, stars: obStars, tag: len => obStyle(len).name,
  reset() {
    const o = obStats(rh.diff, rh.c.len);
    Object.assign(rh, {keys: new Set(), cx: rh.cx ?? W / 2, cy: rh.cy ?? H / 2, trail: [], pops: [], ob: o, pre: o.pre, r: o.r, pk: o.pk, shake: 0});
    rh.disc = OB.COLS.map(c => obDisc(c, rh.r)); rh.ghost = obDisc('#3a3058', rh.r);
  },
  update() {
    const now = rhNow(), late = RH.WIN.at(-1)[0] / rh.pk;
    for (const n of rh.notes) {
      if (n.t > now + 1) break;
      if (n.kind === 'spin') { obSpin(n, now); continue; }
      if (!n.judged && now - n.t > late) { rhMissed(n); obJudge(n, null); }
      if (n.track && !n.done) {  // la glissière : bouton enfoncé et curseur sur la boule (un peu de marge), sinon lâchée après 100 ms
        const [bx, by] = obBall(n, now), on = rh.keys.size > 0 && Math.hypot(rh.cx - OB.X0 - bx, rh.cy - OB.Y0 - by) <= rh.r * 2.4;
        n.off = on ? 0 : (n.off || 0) + 1;
        if (n.off > 6) { n.track = false; n.done = n.broken = true; rh.combo = 0; obPop(bx, by, 'LÂCHÉ', '#ff4a5a'); }
        else if (now >= n.t + n.len) { n.track = false; n.done = true; rh.score += 150 * n.reps; const [ex, ey] = obEnd(n); obBurst(ex, ey, OB.COLS[n.col], 10); }
      }
    }
    for (const s of rh.sparks) { s.x += s.vx; s.y += s.vy; s.vx *= .93; s.vy *= .93; s.life--; } rh.sparks = rh.sparks.filter(s => s.life > 0);
    for (const p of rh.pops) p.t--; rh.pops = rh.pops.filter(p => p.t > 0);
    if (rh.shake) rh.shake--;
    rhCheckEnd(now);
  },
  draw() { obDraw(); },
};
function obBurst(x, y, col, n) { for (let i = 0; i < n; i++) { const a = Math.random() * 2 * Math.PI, v = .8 + Math.random() * 2.2; rh.sparks.push({x: OB.X0 + x, y: OB.Y0 + y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 18, col}); } }
function obPop(x, y, text, col) { rh.pops.push({x: OB.X0 + x, y: OB.Y0 + y, text, col, t: 28}); }
function obJudge(n, w) { const [x, y] = n.kind === 'spin' ? [OB.PW / 2, OB.PH / 2 + 30] : [n.x, n.y]; obPop(x, y, w ? w[1] : 'RATÉ', w ? w[3] : '#ff4a5a'); if (w) obBurst(x, y, OB.COLS[n.col], 9); }
// un clic (souris ou touche) : seulement sur le premier orbe pas encore touché, comme dans les jeux du genre (on ne saute pas un orbe)
function obClick() {
  const now = rhNow(), late = RH.WIN.at(-1)[0] / rh.pk, n = rh.notes.find(n => !n.judged && n.kind !== 'spin');
  if (!n || n.t - now > rh.pre || Math.hypot(rh.cx - OB.X0 - n.x, rh.cy - OB.Y0 - n.y) > rh.r * 1.15) return;  // pas encore là, ou clic à côté : rien
  if (n.t - now > late) { rh.shake = 10; n.shake = 10; return; }  // beaucoup trop tôt : l'orbe tremble
  const w = rhHit(n, (now - n.t) * rh.pk); obJudge(n, w); if (w) n.hitAt = now; if (w && n.kind === 'slide') n.track = true;
}
function obPress(src, down) {
  if (rh?.mode !== 'play') return;
  if (!down) return void rh.keys.delete(src);
  if (rh.keys.has(src)) return; rh.keys.add(src); obClick();
}
// une toupie : bouton enfoncé, on tourne autour du centre ; il faut environ 1,2 tour par seconde de toupie
function obSpin(n, now) {
  if (n.judged || now < n.t) return;
  const ax = rh.cx - OB.X0 - OB.PW / 2, ay = rh.cy - OB.Y0 - OB.PH / 2, ang = Math.atan2(ay, ax);
  if (rh.keys.size && n.la != null && Math.hypot(ax, ay) > 5) { const d = ((ang - n.la) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; n.spun = (n.spun || 0) + Math.min(Math.abs(d), .5); }  // 0,5 radian par pas au plus (~5 tours/s)
  n.la = ang;
  if (now < n.t + n.len) return;
  const f = (n.spun || 0) / obNeed(n), w = f >= 1 ? RH.WIN[0] : f >= .7 ? RH.WIN[1] : f >= .4 ? RH.WIN[2] : null;
  if (w) { rhHit(n, w[0]); rh.dts.pop(); rh.score += Math.max(0, Math.floor((f - 1) * 4)) * 100; } else rhMissed(n);  // pas d'écart de temps pour une toupie : rien pour le décalage auto
  obJudge(n, w);
}
const obNeed = n => Math.max(1, n.len * 1.2) * 2 * Math.PI;
// les dessins : orbes et anneaux en pixels, préparés une fois par couleur et par taille
function obDisc(col, r) {
  return cnv(2 * r + 3, 2 * r + 3, b => { const c = r + 1;
    for (let y = 0; y < 2 * r + 3; y++) for (let x = 0; x < 2 * r + 3; x++) { const d = Math.hypot(x - c, y - c);
      if (d > r + .5) continue; px(b, d > r - .7 ? '#05010b' : d > r - 2.6 ? '#ffffff' : d > r - 3.6 ? '#05010b' : (x - c) + (y - c) < -r * .4 ? prShade(col, 1.35) : (x + y) % 2 && d > r * .55 ? prShade(col, .8) : col, x, y); } });
}
const obRings = new Map();
function obRing(col, r) {  // un anneau d'épaisseur 1 (le cercle d'approche, le cercle de suivi, la toupie)
  r = Math.max(2, Math.round(r)); const k = col + r; if (obRings.has(k)) return obRings.get(k);
  const s = cnv(2 * r + 3, 2 * r + 3, b => { const c = r + 1; for (let y = 0; y < 2 * r + 3; y++) for (let x = 0; x < 2 * r + 3; x++) { const d = Math.hypot(x - c, y - c); if (Math.abs(d - r) < .75) px(b, col, x, y); else if (Math.abs(d - r - 1) < .5) px(b, '#05010b', x, y); } });
  obRings.set(k, s); return s;
}
const prShade = (c, f) => '#' + [1, 3, 5].map(i => Math.max(0, Math.min(255, Math.round(parseInt(c.slice(i, i + 2), 16) * f))).toString(16).padStart(2, '0')).join('');
function obBody(n) {  // le corps d'une glissière : un tube sombre bordé de blanc, dessiné une fois
  if (n.body) return n.body; const r = rh.r, pad = r + 2, xs = n.pts.map(p => p[0]), ys = n.pts.map(p => p[1]), x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad;
  const c = cnv(Math.ceil(Math.max(...xs) - x0 + pad), Math.ceil(Math.max(...ys) - y0 + pad), b => {
    const dot = (rad, col) => { for (const [x, y] of n.pts) for (let j = -rad; j <= rad; j++) for (let i = -rad; i <= rad; i++) if (i * i + j * j <= rad * rad) px(b, col, x - x0 + i, y - y0 + j); };
    dot(r, '#05010b'); dot(r - 1, '#e8e0ff'); dot(r - 3, prShade(OB.COLS[n.col], .3));
  });
  return n.body = {c, x0, y0};
}
const OB_BG = cnv(W, H, b => {  // le fond : un ciel tramé, des étoiles, le terrain à peine marqué
  px(b, '#05030d', 0, 0, W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const d = Math.hypot(x - W / 2, y - H / 2); if ((x + y) % 2 === 0 && Math.floor(d / 14) % 2 === 0 && d < 150) px(b, '#0b0820', x, y); }
  const r = seeded(31); for (let i = 0; i < 120; i++) px(b, r() < .25 ? '#5a4a8a' : '#221a44', Math.floor(r() * W), Math.floor(r() * H));
  for (let x = OB.X0 - 6; x <= OB.X0 + OB.PW + 6; x += 4) { px(b, '#1a1438', x, OB.Y0 - 6); px(b, '#1a1438', x, OB.Y0 + OB.PH + 6); }
  for (let y = OB.Y0 - 6; y <= OB.Y0 + OB.PH + 6; y += 4) { px(b, '#1a1438', OB.X0 - 6, y); px(b, '#1a1438', OB.X0 + OB.PW + 6, y); }
});
function obDraw() {
  if (rh.mode !== 'play' && obLocked()) try { document.exitPointerLock(); } catch {}  // pause, fin de partie : la souris est rendue
  const live = rh.mode === 'play' || rh.mode === 'pause', now = live ? rhNow() : -2, r = rh.r, pre = rh.pre, X = OB.X0, Y = OB.Y0;
  g.drawImage(OB_BG, 0, 0);
  if (live) {
    // les orbes visibles, du plus lointain au plus proche (le prochain à toucher passe dessus)
    const vis = []; for (const n of rh.notes) { if (n.t - now > pre) break; if (n.t + (n.len || 0) + .3 < now) continue; vis.push(n); }
    // les points de suivi : du bout d'un orbe au suivant du même combo
    for (let i = 1; i < vis.length; i++) { const a = vis[i - 1], b = vis[i]; if (b.combo < 2 || a.kind === 'spin') continue; const [ax, ay] = obEnd(a), d = Math.hypot(b.x - ax, b.y - ay); if (d < r * 2.4) continue;
      for (let s = r + 4; s < d - r - 2; s += 7) { const f = s / d, t = a.t + a.len + (b.t - a.t - a.len) * f; if (t < now - .05) continue; g.globalAlpha = obClamp(1 - (b.t - now - pre * .2) / pre, 0, 1) * .7; px(g, '#c8c0f0', X + ax + (b.x - ax) * f - 1, Y + ay + (b.y - ay) * f - 1, 2, 2); } g.globalAlpha = 1; }
    for (let i = vis.length - 1; i >= 0; i--) {
      const n = vis[i], col = OB.COLS[n.col], fade = obClamp((now - (n.t - pre)) / (.4 * Math.min(1, pre / .45)), 0, 1), jx = n.shake ? (n.shake-- % 2 ? 1 : -1) : 0;
      if (n.kind === 'spin') { obDrawSpin(n, now); continue; }
      const gone = n.judged && !n.missed, after = now - n.t;
      if (n.kind === 'slide' && !(n.done && !n.track && now > n.t + n.len)) {  // le tube, la boule, le cercle de suivi
        const bd = obBody(n); g.globalAlpha = (n.missed || n.broken ? .3 : .62) * fade; g.drawImage(bd.c, Math.round(X + bd.x0), Math.round(Y + bd.y0));
        const passes = n.reps - Math.floor(obClamp(after / n.len, 0, .999) * n.reps); if (passes > 1) { const [ex, ey] = obEnd({...n, reps: (n.reps - passes) % 2 ? 2 : 1}); g.drawImage(obRing('#ffffff', r * .55), Math.round(X + ex - r * .55 - 1), Math.round(Y + ey - r * .55 - 1)); }  // un retour à faire : un anneau au bout
        g.globalAlpha = 1;
        if (after >= 0 && after <= n.len && !n.missed && !n.broken) { const [bx, by] = obBall(n, now); g.drawImage(rh.disc[n.col], Math.round(X + bx - r - 1), Math.round(Y + by - r - 1)); if (n.track) g.drawImage(obRing(rh.keys.size ? '#ffffff' : '#a8a0c8', r * 2.4), Math.round(X + bx - r * 2.4 - 1), Math.round(Y + by - r * 2.4 - 1)); }
      }
      if (gone && n.hitAt != null && now - n.hitAt < .15) {  // touché : l'orbe grossit et s'efface
        const k = (now - n.hitAt) / .15, rr = Math.round(r * (1 + .4 * k)); g.globalAlpha = .8 * (1 - k); g.drawImage(rh.disc[n.col], Math.round(X + n.x - rr - 1), Math.round(Y + n.y - rr - 1), 2 * rr + 3, 2 * rr + 3); g.globalAlpha = 1;
      }
      if (gone || (n.missed && after > .3)) continue;
      // l'orbe et son numéro ; le cercle d'approche se resserre jusqu'à lui au bon moment
      g.globalAlpha = n.missed ? .45 : fade * .85; const x = Math.round(X + n.x) + jx, y = Math.round(Y + n.y);
      g.drawImage(n.missed ? rh.ghost : rh.disc[n.col], x - r - 1, y - r - 1); pxFont(g, String(n.combo), x, y + 4, '#ffffff', 8, 'center');
      if (!n.missed && after < 0) { const ar = r * (1 + 2 * obClamp(-after / pre, 0, 1)); g.globalAlpha = fade; g.drawImage(obRing(col, ar), Math.round(x - ar - 1), Math.round(y - ar - 1)); }
      g.globalAlpha = 1;
    }
  }
  for (const p of rh.sparks) { g.globalAlpha = p.life / 18; px(g, p.col, p.x, p.y, 2, 2); } g.globalAlpha = 1;
  for (const p of rh.pops) { g.globalAlpha = Math.min(1, p.t / 10); pxFont(g, p.text, p.x, p.y - 12 - (28 - p.t) / 3, p.col, 6, 'center'); } g.globalAlpha = 1;
  if (rh.mode !== 'ready' && rh.mode !== 'load') {
    rhProgress(now, '#3fe0ff'); pxFont(g, String(rh.score).padStart(7, '0'), 4, 13, '#ffffff', 7); if (rh.combo > 1) pxFont(g, rh.combo + 'x', 4, H - 5, '#ffd84a', 8);
    pxFont(g, rhStarTxt(rh.stars), W - 4, 13, '#6a5a9a', 6, 'right');
  }
  if (rh.mode === 'play') {  // le curseur et sa traînée
    rh.trail.push([rh.cx, rh.cy]); if (rh.trail.length > 8) rh.trail.shift();
    rh.trail.forEach(([x, y], i) => { g.globalAlpha = (i + 1) / 16; px(g, '#ffd84a', x - 1, y - 1, 3, 3); }); g.globalAlpha = 1;
    const cr = rh.keys.size ? 4 : 5; g.drawImage(obRing('#ffd84a', cr), Math.round(rh.cx - cr - 1), Math.round(rh.cy - cr - 1)); px(g, '#ffffff', rh.cx - 1, rh.cy - 1, 2, 2);
  }
  rhScreens(86);
}
function obDrawSpin(n, now) {
  const cx = OB.X0 + OB.PW / 2, cy = OB.Y0 + OB.PH / 2, R = OB.SPIN_R, left = obClamp((n.t + n.len - now) / n.len, 0, 1), f = obClamp((n.spun || 0) / obNeed(n), 0, 1.5);
  g.globalAlpha = obClamp((now - (n.t - rh.pre)) / (rh.pre * .5), 0, 1);
  g.drawImage(obRing('#e8e0ff', R), cx - R - 1, cy - R - 1); if (now >= n.t) g.drawImage(obRing(OB.COLS[n.col], Math.max(4, R * left)), Math.round(cx - R * left - 1), Math.round(cy - R * left - 1));  // l'anneau qui rétrécit : le temps qu'il reste
  const a0 = n.spun || 0; for (let k = 0; k < 3; k++) { const a = a0 + k * 2 * Math.PI / 3; for (let d = 8; d < 22; d += 2) px(g, f >= 1 ? '#ffd84a' : '#c8c0f0', cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2, 2); }
  pxFont(g, f >= 1 ? 'BRAVO !' : 'TOURNE !', cx, cy - 28, f >= 1 ? '#ffd84a' : '#ffffff', 8, 'center'); pxFont(g, Math.round(Math.min(f, 1) * 100) + ' %', cx, cy + 40, '#e8e0ff', 7, 'center');
  g.globalAlpha = 1;
}
// la souris vise partout (même hors du terrain, en plein écran) ; boutons et touches W / X / Z / C frappent
// la visée : pendant la partie, la souris est capturée et le curseur avance du déplacement brut de la souris (sans l'accélération de Windows),
// multiplié par la sensibilité (1 = la vitesse du curseur de Windows sans accélération) ; hors partie, ou si la capture est refusée, il suit la souris
const obSensShow = () => { $('obSensV').textContent = (+$('obSens').value).toFixed(2) + '×'; };
$('obSens').oninput = obSensShow;
const obLocked = () => document.pointerLockElement === cv;
const obLock = () => { if (obLocked()) return; try { const p = cv.requestPointerLock?.({unadjustedMovement: true}); p?.catch?.(() => { try { cv.requestPointerLock()?.catch?.(() => {}); } catch {} }); } catch { try { cv.requestPointerLock(); } catch {} } };
document.addEventListener('pointermove', e => {
  if (!rh || !view.classList.contains('on')) return;
  if (obLocked()) { const k = +$('obSens').value * W / cv.getBoundingClientRect().width; rh.cx = obClamp(rh.cx + e.movementX * k, 0, W); rh.cy = obClamp(rh.cy + e.movementY * k, 0, H); return; }
  const [x, y] = cpos(e); rh.cx = obClamp(x, 0, W); rh.cy = obClamp(y, 0, H);
});
document.addEventListener('pointerlockchange', () => { if (!obLocked() && rh?.mode === 'play') rhPause(); });  // Échap libère la souris : la partie se met en pause
cv.oncontextmenu = e => e.preventDefault();
cv.onpointerdown = e => { e.preventDefault(); if (!rh) return; if (!obLocked()) { const [x, y] = cpos(e); rh.cx = x; rh.cy = y; } if (rh.mode !== 'play') { rhPress(); if (rh.mode === 'play') obLock(); return; } obPress('m' + e.button, true); };
addEventListener('pointerup', e => { if (rh) obPress('m' + e.button, false); });
document.addEventListener('keydown', e => {
  if (!keyOk(e) || !rh) return; const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (OB.KEYS.includes(k)) { e.preventDefault(); if (!e.repeat) obPress(k, true); }
  if (k === ' ' || k === 'Enter') { e.preventDefault(); if (!e.repeat && rh.mode !== 'play') { rhPress(); if (rh.mode === 'play') obLock(); } }
  if (k === 'p' || k === 'Escape') rhPause();
});
document.addEventListener('keyup', e => { if (!rh) return; const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; if (OB.KEYS.includes(k)) obPress(k, false); if (e.key === ' ' && keyOk(e)) e.preventDefault(); });
{  // vérification : les orbes restent sur le terrain, dans l'ordre, avec des glissières, des streams et une toupie ; les orbes rapetissent avec le niveau ; un clic au bon moment sur l'orbe le touche, à côté non
  const c = rhCompose(RH_SONGS[7]), x = RHG.chart(rhChart(c, 'expert'), c, 'expert'), ok = x.every((o, i) => o.x >= 0 && o.x <= OB.PW && o.y >= 0 && o.y <= OB.PH && (!i || o.t > x[i - 1].t) && (o.kind !== 'slide' || o.pts.every(p => p[0] >= 0 && p[0] <= OB.PW && p[1] >= 0 && p[1] <= OB.PH)));
  const lens = rhChart(c, 'expert').map(n => ({...n, len: 9})), sp = RHG.chart(lens, c, 'expert').filter(o => o.kind === 'spin');
  rhAudio(); const keep = rh; rh = {mode: 'play', t0: 0, diff: 'normal', c: {len: 60}, sparks: [], combo: 0, maxCombo: 0, score: 0, dts: [], counts: {PARFAIT: 0, BIEN: 0, OK: 0, 'RATÉ': 0}, notes: []}; RHG.reset();
  const t0 = rhNow(); rh.notes = [{t: t0, kind: 'circle', x: 50, y: 50, combo: 1, col: 0, len: 0}, {t: t0 + .5, kind: 'circle', x: 150, y: 90, combo: 2, col: 0, len: 0}];
  rh.cx = OB.X0 + 50; rh.cy = OB.Y0 + 50; obPress('w', true); obPress('w', false); const hit = rh.notes[0].judged && !rh.notes[0].missed;
  rh.cx = OB.X0 + 10; rh.cy = OB.Y0 + 10; obPress('x', true); const miss = !rh.notes[1].judged; rh = keep;
  const fast = RH_SONGS.map(rhCompose).find(c => c.step < .1), xs = RHG.chart(rhChart(fast, 'expert'), fast, 'expert'); let run = 1, best = 1; for (let i = 1; i < xs.length; i++) { run = xs[i - 1].kind === 'circle' && xs[i].t - xs[i - 1].t < fast.step * 1.5 ? run + 1 : 1; best = Math.max(best, run); }
  const small = obStats('expert', 100).r < obStats('facile', 100).r;
  console.assert(best >= 3 && best <= 33 && small && ok && x.some(o => o.kind === 'slide') && sp.length >= 1 && sp.every((s, i) => !i || s.t - sp[i - 1].t > 20) && hit && miss, 'orbe', ok, hit, miss, sp.length, best, small);
}
ctx.onOpen(() => rhOpen());

}

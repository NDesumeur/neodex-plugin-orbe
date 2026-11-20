// lancé par le test « local » de NeoDex : une partie jouée (plein écran, souris qui tourne, clics), captures du canevas, aucune erreur
module.exports = async ({ pj, sleep }) => {
  { // les touches réglables : la 1re case prend Q, puis reprend sa touche d'avant
    const r = await pj(`(async () => { const b = document.querySelector('.rhKeys button'); if (!b) return 'pas de réglage des touches'; const old = b.textContent;
      const press = k => dispatchEvent(new KeyboardEvent('keydown', {key: k, bubbles: true}));
      b.click(); press('q'); await new Promise(r => setTimeout(r, 50)); if (b.textContent !== 'Q') return 'touche non prise : ' + b.textContent;
      b.click(); press(old.toLowerCase()); await new Promise(r => setTimeout(r, 50)); return b.textContent === old ? '' : 'touche non rendue'; })()`);
    if (r) throw new Error(r);
  }
  const fs = require('fs'), dir = process.env.NEO_SHOTS;
  const shot = async n => { if (!dir) return; const u = await pj(`document.getElementById('gc').toDataURL('image/png')`); fs.writeFileSync(require('path').join(dir, 'orbe-' + n + '.png'), Buffer.from(u.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); addEventListener('unhandledrejection', e => __e.push(String(e.reason))); 0`);
  for (let i = 0; i < 30 && await pj(`!document.querySelector('.rhBar') || !document.querySelector('.rhBar').hidden`) === false; i++) await sleep(500);
  await sleep(6000);  // le morceau intégré se prépare (rendu du son)
  // un niveau dur et rapide (style Streams, 180 BPM, Expert) : streams, triples et sauts passent à l'écran
  await pj(`[...document.querySelectorAll('.rhSong')].find(c => c.textContent.includes('Mercure stellaire'))?.querySelector('button')?.parentElement.querySelectorAll('button')[3]?.click(), 0`);
  for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  // le mod NF (sans échec) : le robot qui clique au hasard ne perd pas la partie ; le niveau se refait avec
  await pj(`document.querySelector('.obMod[data-m="NF"]').click(), 0`); await sleep(300);
  for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  await sleep(1000); await shot('pret');
  if (await pj(`document.getElementById('gc').__rh.st().mods`) !== 'NF') throw new Error('mod NF non pris');
  await pj(`window.__sons = 0; const st = AudioBufferSourceNode.prototype.start; AudioBufferSourceNode.prototype.start = function (...a) { __sons++; return st.apply(this, a); }; 0`);  // les sons joués : la musique, puis un clic par orbe touché
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })), 0`); await sleep(1800);
  const full = await pj(`!!document.fullscreenElement`), count = await pj(`document.querySelector('.rhCount')?.textContent || ''`); await shot('compte');
  // la souris tourne sur le terrain et clique souvent : tous les chemins du jeu passent (orbes, glissières, toupies), sans erreur
  await pj(`(() => { const c = document.getElementById('gc'); let a = 0, n = 0; window.__bot = setInterval(() => { const r = c.getBoundingClientRect(); a += .21; const x = r.left + r.width * (.5 + .3 * Math.cos(a)), y = r.top + r.height * (.5 + .3 * Math.sin(a * 1.3));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, bubbles: true })); if (++n % 9 === 0) { document.dispatchEvent(new KeyboardEvent('keydown', { key: n % 18 ? 'w' : 'x', bubbles: true })); setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { key: n % 18 ? 'w' : 'x', bubbles: true })), 60); } }, 16); return 1; })()`);
  for (const k of [1, 2, 3, 4]) { await pj(`(s => { s.value = '${k}'; s.dispatchEvent(new Event('change')); })(document.getElementById('obSkin')), 0`); await sleep(5000); await shot('partie' + k + '-skin' + k); }  // chaque skin passe à l'écran
  await pj(`(s => { s.value = '0'; s.dispatchEvent(new Event('change')); })(document.getElementById('obSkin')), 0`);
  // chaque jeu de sons de frappe (Normal, Soft, Drum, 8-bit) se fabrique et joue pendant la partie, sans erreur
  for (const k of ['1', '2', '3', '0']) { await pj(`(s => { s.value = '${k}'; s.dispatchEvent(new Event('change')); })(document.getElementById('obHs')), 0`); await sleep(1200); }
  { const e = await pj(`__e.slice()`); if (e.length) throw new Error('sons de frappe : ' + e[0]); }
  const r = await pj(`new Promise(ok => { const d = []; let l = performance.now(), n = 0; const f = t => { d.push(t - l); l = t; if (++n < 240) requestAnimationFrame(f); else ok(d); }; requestAnimationFrame(f); })`);
  await pj(`clearInterval(__bot), 0`); await shot('hud');
  // la pause : le menu, puis « continuer » demande de cliquer sur le rond
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', bubbles: true })), 0`); await sleep(400); await shot('pause');
  const pm = await pj(`document.getElementById('gc').__rh.st().mode`); await sleep(400);
  // la vraie souris, posée sur la fenêtre, peut survoler « Recommencer » dans le menu : on choisit « Continuer » au clavier
  const hov = await pj(`(rh => { const m = rh.menu; rh.menu = 0; return m; })(document.getElementById('gc').__rh.st())`);
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 0`); await sleep(300); await shot('reprise');
  const rm = await pj(`document.getElementById('gc').__rh.st().mode`);
  if (pm !== 'pause' || rm !== 'resume') throw new Error('pause : ' + pm + ' puis ' + rm + ' (survol ' + hov + ')');
  await pj(`(() => { const rh = document.getElementById('gc').__rh.st(), c = document.getElementById('gc').getBoundingClientRect(); document.dispatchEvent(new PointerEvent('pointermove', { clientX: c.left + rh.pcx / 320 * c.width, clientY: c.top + rh.pcy / 240 * c.height, bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', bubbles: true })); document.dispatchEvent(new KeyboardEvent('keyup', { key: 'w', bubbles: true })); return 0; })()`);
  await sleep(200); const back = await pj(`document.getElementById('gc').__rh.st().mode`); if (back !== 'play') throw new Error('reprise : ' + back);

  // un pilote automatique : le curseur va sur chaque orbe et frappe au bon moment, suit les glissières, tourne les toupies
  const pilot = `(() => { const T = document.getElementById('gc').__rh, key = (t, k) => document.dispatchEvent(new KeyboardEvent(t, { key: k, bubbles: true })); let held = false, a = 0;
    window.__auto = setInterval(() => { const rh = T.st(); if (rh.mode !== 'play') return; const now = T.now(), X = 32, Y = 28;
      const sl = rh.notes.find(n => n.kind !== 'circle' && now >= n.t && now < n.t + n.len);
      if (sl) { if (sl.kind === 'spin') { a += .5; rh.cx = 160 + 30 * Math.cos(a); rh.cy = 124 + 30 * Math.sin(a); } else { const [x, y] = T.ball(sl, now); rh.cx = X + x; rh.cy = Y + y; } if (!held) { key('keydown', 'w'); held = true; } return; }
      const n = rh.notes.find(n => !n.judged && n.kind !== 'spin'); if (held) { key('keyup', 'w'); held = false; } if (!n) return;
      rh.cx = X + n.x; rh.cy = Y + n.y; if (now >= n.t - .008) { key('keydown', 'w'); held = true; if (n.kind === 'circle') { key('keyup', 'w'); held = false; } } }, 4); return 0; })()`;
  await pj(pilot); for (const k of [1, 2, 3]) { await sleep(3000); await shot('auto' + k); }
  const auto = await pj(`(() => { clearInterval(__auto); const rh = document.getElementById('gc').__rh.st(); return [rh.counts.PARFAIT + rh.counts.BIEN + rh.counts.OK, rh.maxCombo, rh.score]; })()`);
  if (auto[0] < 5 || auto[1] < 5) throw new Error('pilote automatique : ' + auto);
  await pj(`document.exitFullscreen?.().catch(() => {}), 0`);
  const errs = await pj(`__e`), s = [...r].sort((x, y) => x - y), avg = r.reduce((x, y) => x + y, 0) / r.length;
  if (errs.length) throw new Error(errs.join(' | '));
  if (!full) throw new Error('le plein écran ne s\'ouvre pas');
  if (1000 / avg < 50) throw new Error('saccades : ' + Math.round(1000 / avg) + ' i/s');
  const sons = await pj(`__sons`);
  // l'écran de fin et sa courbe de précision (une partie inventée : juste au début, des ratés au milieu, juste à la fin), et le thème du terrain
  await pj(`(() => { const T = document.getElementById('gc').__rh, rh = T.st(), L = rh.c.len, h = []; for (let i = 0; i < 200; i++) { const t = i / 200 * L, mid = t > L * .4 && t < L * .6; h.push([t, mid ? (i % 3 ? 1 : 0) : (i % 7 ? 3 : 2)]); } T.finish(h); return 0; })()`);
  await sleep(800); await shot('fin'); await sleep(1600); await shot('fin-note');  // la note tombe à 1,3 s
  const end = await pj(`(() => { const rh = document.getElementById('gc').__rh.st(); return [rh.mode, rh.hist.length, rh.theme?.name || ''].join(','); })()`);
  if (!/^over,200,\S/.test(end)) throw new Error('écran de fin : ' + end);
  const top = await pj(`document.querySelector('#obTop .obLbRow')?.textContent || document.getElementById('obTop').textContent`); if (!/^1/.test(top)) throw new Error('classement du niveau : ' + top);
  // une autre variante de la map : d'autres motifs, puis retour à la première
  const pos = `document.getElementById('gc').__rh.st().notes.slice(0, 40).map(n => Math.round(n.x) + ':' + Math.round(n.y)).join(' ')`, v0 = await pj(pos);
  await pj(`document.getElementById('obVarNext').click(), 0`); await sleep(300); for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  const v1 = await pj(pos), vv = await pj(`document.getElementById('gc').__rh.st().var`); if (vv !== 1 || v1 === v0) throw new Error('variante : ' + vv);
  await pj(`document.getElementById('obVarBack').click(), 0`); await sleep(300); for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  if (await pj(pos) !== v0) throw new Error('retour à la première variante');
  // la lampe (FL) et caché (HD) : une partie avec le pilote
  await pj(`['FL', 'HD'].forEach(m => document.querySelector('.obMod[data-m="' + m + '"]').click()), 0`); await sleep(300);
  for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  await sleep(500); await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })), 0`); await sleep(4500);
  await pj(pilot); await sleep(3000); await shot('fl-hd'); await pj(`clearInterval(__auto), document.exitFullscreen?.().catch(() => {}), 0`);
  const fl = await pj(`document.getElementById('gc').__rh.st().mods`); if (fl !== 'NFHDFL') throw new Error('mods : ' + fl);
  await pj(`(g => g.__rh.finish(g.__rh.st().hist || []))(document.getElementById('gc')), 0`); await sleep(500);  // la partie finie : les mods se changent
  await pj(`['FL', 'HD', 'NF'].forEach(m => document.querySelector('.obMod[data-m="' + m + '"]').click()), 0`);  // les mods rendus
  // Auto : le jeu joue tout seul (l'intro passée), sans rater
  await pj(`document.querySelector('.obMod[data-m="AT"]').click(), 0`); await sleep(300); for (let i = 0; i < 40 && await pj(`document.querySelector('.rhBar')?.hidden === false`); i++) await sleep(500);
  await sleep(500); await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })), 0`); await sleep(400);
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })), 0`); await sleep(9000); await shot('auto-mod');
  const at = await pj(`(() => { const rh = document.getElementById('gc').__rh.st(); return [rh.counts.PARFAIT + rh.counts.BIEN + rh.counts.OK, rh.counts['RATÉ'], rh.mods]; })()`);
  await pj(`document.querySelector('.obMod[data-m="AT"]').click(), document.exitFullscreen?.().catch(() => {}), 0`);
  if (at[2] !== 'AT' || at[0] < 5 || at[1] > 0) throw new Error('Auto : ' + at);
  // ta musique : un battement qui accélère un peu (120 à 122 BPM) suivi par la carte des temps, mieux que par une grille fixe ; un tempo fixe n'en fait pas
  const tm = await pj(`(async () => { const T = document.getElementById('gc').__rh, sr = 22050, len = 40, mk = acc => { const b = new OfflineAudioContext(1, sr * len, sr).createBuffer(1, sr * len, sr), d = b.getChannelData(0), beats = [];
      let t = .5, bpm = 120; while (t < len - .5) { beats.push(t); bpm += acc; t += 60 / bpm; }
      for (const bt of beats) for (let i = 0; i < sr * .05; i++) { const k = Math.floor(bt * sr) + i; d[k] += Math.sin(i / sr * 2 * Math.PI * 80) * Math.exp(-i / sr * 60) * .9 + (Math.random() * 2 - 1) * Math.exp(-i / sr * 200) * .5; }
      return [b, beats]; };
    const err = (m, beats) => beats.slice(-20).reduce((e, bt) => { const x = m.toB(bt); return e + Math.abs(x - Math.round(x)); }, 0) / 20;
    const [b1, s1] = mk(.025), a1 = await T.analyse(b1), [b2, s2] = mk(0), a2 = await T.analyse(b2);
    return [!!a1.bt, +err(T.beatMap(a1), s1).toFixed(3), +err(T.beatMap({...a1, bt: null}), s1).toFixed(3), !!a2.bt, +err(T.beatMap(a2), s2).toFixed(3)]; })()`);
  if (!tm[0] || !(tm[1] < tm[2]) || tm[1] > .06 || tm[4] > .04) throw new Error('carte des temps : ' + tm);
  // la recherche et les filtres de la liste : « néon » trouve la chanson ; puis la liste entière, la carte choisie à l'écran
  await pj(`document.getElementById('rhTabSongs').click(), (i => { i.value = 'néon'; i.dispatchEvent(new Event('input')); })(document.getElementById('obSearch')), 0`); await sleep(600);
  const found = await pj(`[...document.querySelectorAll('.obCard b')].map(b => b.textContent).join('|')`); if (!/Lever de néon/.test(found)) throw new Error('recherche : ' + found.slice(0, 200));
  await pj(`(s => { s.value = 'Streams'; s.dispatchEvent(new Event('change')); })(document.getElementById('obFStyle')), 0`); await sleep(400);
  const tags = await pj(`[...document.querySelectorAll('.obCard > .hint')].map(b => b.textContent.split(' · ')[0])`); if (!tags.length || tags.some(t => t !== 'Streams')) throw new Error('filtre de style : ' + tags);
  await pj(`(s => { s.value = ''; s.dispatchEvent(new Event('change')); })(document.getElementById('obFStyle')), (i => { i.value = ''; i.dispatchEvent(new Event('input')); })(document.getElementById('obSearch')), 0`); await sleep(600);
  // le carrousel : seules les cartes à l'écran existent ; Bas change de chanson, Droite de difficulté (hors partie)
  const nCards = await pj(`document.querySelectorAll('#rhSongs .obCard').length`); if (!(nCards > 3 && nCards < 40)) throw new Error('carrousel : ' + nCards + ' cartes');
  await pj(`(g => { if (g.__rh.st().mode !== 'over') g.__rh.finish(g.__rh.st().hist || []); })(document.getElementById('gc')), 0`); await sleep(1500);
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })), 0`); await sleep(2500);
  const s0 = await pj(`document.getElementById('gc').__rh.st().song`);
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })), 0`); await sleep(2500);
  const s1 = await pj(`(r => r.song + '|' + r.mode)(document.getElementById('gc').__rh.st())`); if (s1.split('|')[0] == s0) throw new Error('flèche Bas : ' + s0 + ' -> ' + s1);
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })), 0`); await sleep(2500);
  const d1 = await pj(`document.getElementById('gc').__rh.st().diff`); if (d1 === 'normal') throw new Error('flèche Droite : ' + d1);
  // l'onglet des statistiques (laissé ouvert pour la capture de fin)
  await pj(`document.getElementById('rhTabStats').click(), 0`); await sleep(400);
  const stt = await pj(`document.getElementById('rhSongs').textContent`); if (!/PROFIL/.test(stt) || !/pp/.test(stt)) throw new Error('statistiques : ' + stt.slice(0, 200));
  const errs2 = await pj(`__e`); if (errs2.length) throw new Error(errs2.join(' | '));
  return 'carte des temps ' + tm.join('/') + ', plein écran ok, compte « ' + count + ' », ' + sons + ' sons joués, ' + Math.round(1000 / avg) + ' i/s, 95e centile ' + s[Math.floor(s.length * .95)].toFixed(1) + ' ms';
};

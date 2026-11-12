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
  await sleep(1500); await shot('pret');
  await pj(`window.__sons = 0; const st = AudioBufferSourceNode.prototype.start; AudioBufferSourceNode.prototype.start = function (...a) { __sons++; return st.apply(this, a); }; 0`);  // les sons joués : la musique, puis un clic par orbe touché
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true })), 0`); await sleep(1800);
  const full = await pj(`!!document.fullscreenElement`), count = await pj(`document.querySelector('.rhCount')?.textContent || ''`); await shot('compte');
  // la souris tourne sur le terrain et clique souvent : tous les chemins du jeu passent (orbes, glissières, toupies), sans erreur
  await pj(`(() => { const c = document.getElementById('gc'); let a = 0, n = 0; window.__bot = setInterval(() => { const r = c.getBoundingClientRect(); a += .21; const x = r.left + r.width * (.5 + .3 * Math.cos(a)), y = r.top + r.height * (.5 + .3 * Math.sin(a * 1.3));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, bubbles: true })); if (++n % 9 === 0) { document.dispatchEvent(new KeyboardEvent('keydown', { key: n % 18 ? 'w' : 'x', bubbles: true })); setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { key: n % 18 ? 'w' : 'x', bubbles: true })), 60); } }, 16); return 1; })()`);
  for (const k of [1, 2, 3, 4]) { await sleep(5000); await shot('partie' + k); }
  const r = await pj(`new Promise(ok => { const d = []; let l = performance.now(), n = 0; const f = t => { d.push(t - l); l = t; if (++n < 240) requestAnimationFrame(f); else ok(d); }; requestAnimationFrame(f); })`);
  await pj(`clearInterval(__bot), document.exitFullscreen?.().catch(() => {}), 0`);
  const errs = await pj(`__e`), s = [...r].sort((x, y) => x - y), avg = r.reduce((x, y) => x + y, 0) / r.length;
  if (errs.length) throw new Error(errs.join(' | '));
  if (!full) throw new Error('le plein écran ne s\'ouvre pas');
  if (1000 / avg < 50) throw new Error('saccades : ' + Math.round(1000 / avg) + ' i/s');
  const sons = await pj(`__sons`);
  return 'plein écran ok, compte « ' + count + ' », ' + sons + ' sons joués, ' + Math.round(1000 / avg) + ' i/s, 95e centile ' + s[Math.floor(s.length * .95)].toFixed(1) + ' ms';
};

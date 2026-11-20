# Orbe (Orb)

A mouse rhythm game: numbered orbs appear on the field, and a circle closes in on each one. Aim at the orb and click when the circle touches it. Follow the sliders with the button held, spin the spinners. Play the 1200 tracks from the Rythme plugin, or your own music.

*Version française : [README.md](README.md)*

## How to play

- **Mouse**: aim. **Click** (left or right) or **W / X** (also Z and C): hit.
- **Orbs**: click when the approach circle touches the orb's edge. Hit them in the order of their numbers: only the next orb counts, and clicking much too early makes it shake.
- **Sliders**: hit their orb, then keep the button held and follow the ball to the end; a white ring at the end means it comes back.
- **Spinners**: keep the button held and spin the mouse around the centre before the ring closes.
- **Space**: play, or skip a long intro · **P** or **Esc**: pause (Continue, Retry, Quit; to continue, click the circle where your cursor was) · hold **²** (the key left of 1): retry right away.

## Full screen and start

Pick a level: a bar shows the loading (the music is read, decoded and analysed in full before playing). As in osu!, the start screen shows the title, style, theme, tempo, length and the number of circles, sliders and spinners, the stars in the difficulty's colour, the **CS, AR, OD, HP** settings as bars and **your best** on this level; in the middle, an orb beats to the song, whose **chorus** loops (setting "Listen before playing"). Space or click goes full screen, then a **3, 2, 1** countdown starts the music.

## The page

On the left, the game, with the **mods** and map variants below it, then the **level leaderboard** (rank, grade, score, accuracy, combo, mods, pp, date) and your **profile** (your rank, pp, accuracy and records), like osu!'s user panel.

On the right, the song **carousel**, as in osu!: one long list you scroll with the wheel, the cards laid out in an arc around the middle. Each card has a band in the colour of its hardest difficulty, your **best grade** next to the title, and the stars of each of its difficulties, on their colour (blue for the easy ones, then green, yellow, orange, red, purple). No scrollbar: the wheel and the arrow keys are enough. The chosen song opens on its four difficulties; clicking the difficulty already chosen starts the game.

**With the keyboard**, as in osu!: **Up** and **Down** change song (the level loads when you stop), **Left** and **Right** change difficulty, **Enter** plays, **F2** picks a random song.

Above the list: a title **search**, **filters** (map style, stars, tempo, length), the **order** (title, tempo, length, best grade) and **RANDOM**, which picks a song among those shown. The star filter computes them as needed, bit by bit. **Options** and **help** open with their buttons, below the list.

## Accuracy and points

As in osu!: each orb hit right on time is worth **300** (nothing shows, just a burst), a bit off **100**, further off **50**; a miss drops a red **X**. The windows depend on the level's **OD**: from ±62 / ±124 / ±193 ms for the easiest to ±31 / ±62 / ±96 ms in Expert. Points follow the osu! formula: the combo before the hit, the level's difficulty and the mods multiply them.

**Sliders**: as soon as you hold the ball, a follow circle grows around it; you can stray a little. Each tick (small dot) and each repeat (the arrow beating with the music) held keeps the combo; let go, it breaks. The end is judged slightly before the finish. The body unrolls from the head to the end as the slider appears.

**Spinners**: the RPM counter shows; once the count is reached, each extra spin gives **1000** points.

Accuracy is computed as in osu!, and so is the grade: **SS** with no mistake, **S** with over 90 % of 300s and no miss, then **A**, **B**, **C** and **D**. Orbs placed on the same spot stack with a small offset, so you see them all.

## Health and mods

A **health bar** at the top left drains on its own, refills with each hit and drops on each miss; nearly empty, it blinks and the screen edges pulse red. Empty, the game is lost (it does not count). During a break in the song, a ✓ or ✗ tells whether your health is good, and arrows warn you just before it starts again.

The **mods**, with the settings: **EZ** (bigger, slower orbs), **NF** (never fail), **HT** (song at 75 %), **HR** (smaller, faster orbs, flipped field), **DT** (song at 150 %), **HD** (no approach circle, orbs fade out) and **FL** (you only see around the cursor). Each changes the points, as in osu!. HT and DT also change the pitch of the music.

More mods: **SD** (a single miss and you fail), **PF** (anything but a 300 makes you fail), **RX** (just aim, no clicking), **AP** (the cursor moves on its own, you click) and **AT** (the game plays itself to show you; nothing is saved). RX and AP give no pp.

## pp and statistics

Each finished game gives **pp** (performance points), computed as in osu!: aim, speed and accuracy, depending on the level's difficulty and your mods. A miss or a broken combo takes some away. Your **profile** adds up your best game on each level (the 1st counts in full, then 95 %, 90 %…).

Your **rank** follows your total pp: Beginner, Bronze (50 pp), Silver (200), Gold (500), Platinum (1000), Diamond (2000), Master (4000) and Legend (7000). **Medals** have three tiers, **bronze**, **silver** and **gold**: Great grades (A, S, SS), Full combo (1, 10, 50 levels), Stars (3, 5, 7★), Accuracy (95, 98, 99.5 %), Combo (500, 1000, 2000), Performance (50, 100, 200 pp in one game), Hidden, Hard Rock, Double Time and Flashlight (finish a 2, 4, 6★ level with HD, HR, DT or FL), Explorer (1, 5, 20 other variants), Traveller (10, 50, 200 different levels), Regular (50, 200, 1000 games) and Endurance (1, 5, 20 h of play); plus First step. Each new tier is announced at the end of the game.

The **STATS** tab starts with your **player card**: an image of your profile (rank, pp, accuracy, games, top performances, medals) to **save** (in Downloads) or **copy** to share it. Then it shows your rank with your pp curve, your medals, your profile (pp, accuracy, games, play time, best UR and combo), curves of your accuracy and UR over your games, your games per day, your top performances and your favourite levels.

## During the game

Top right: the rolling score, accuracy, a pie showing how far the song has gone, and the mods. If you already finished this level, a small **green** or **red** number under the score tells whether you are ahead of or behind your best at the same moment. Bottom: the bouncing combo, and in the middle the **hit error bar** (early on the left, late on the right; the small arrow is your average). On the right, the **K1 K2 M1 M2** counters light up when you press.

## Playfield themes

Each song has its theme, the same at all its difficulties: **Night**, **Ocean**, **Embers**, **Forest**, **Candy**, **Ice**, **Snow**, **Neon**, **Dunes** or **Aurora**. The theme changes the orb colours and the dotted background (rings, waves, diagonals, checks, snowflakes, grid horizon, dunes or aurora); its name shows before you play.

## End screen

As in osu!: the score and counts roll up, then the grade drops in with a sound. It shows the score, the number of 300s, 100s, 50s and misses, the combo, accuracy, the **mean offset** and the **UR** (your consistency: the lower, the better), then **health** along the song. Each level keeps its **leaderboard**: your 10 best games, with their mods, in the panel. Space or click: play again.

Next to it, **your offsets**: how many hits land early (left) or late (right), within the 300, 100 and 50 windows. And your **aim**: each hit as a dot in a circle (the movement goes to the right), your average in yellow, and a line telling whether you usually aim too far, not far enough, or on target.

Further down, the **accuracy curve** shows how precise you were along the song: green when you are almost always Perfect, yellow when it drops, red in the hard parts. Each small red tick below is a missed note, at its place in the song. **Click the timeline**: details of that passage (the nearest miss and the broken combo, or the passage's accuracy).

## Songs and difficulty

The **Songs** tab offers the 1200 Rythme tracks. Each level has its own settings, shown before you play:

- **CS**: orb size (the higher, the smaller).
- **AR**: how early you see them coming (the higher, the faster the approach circle). As in osu!, it is 8 around 4 stars and at least 9 from 5 stars.
- **OD**: how precise you must be.

Each track also has a **map style**, the same at all its difficulties and shown in the list:

- **Jumps** (Sauts): wide gaps in triangles, squares, stars, back-and-forths, wide curves and growing gaps; the pattern changes every 4 notes. It is the most common style.
- **Streams**: long runs of tight orbs, in curves, on the drums' sixteenth notes.
- **Precision** (Précision): smaller orbs, stricter timing.
- **Technical** (Technique): doubles, triples and changing rhythms, with stacked orbs.
- **Sliders** (Glissières): lots of sliders, longer, more curved and faster.
- **Mixed** (Mixte): a different style every 8 bars.

Easy keeps to simple rhythms. Doubles and triples come in Normal, streams in Hard. Each style has its own longest stream (3 orbs in Jumps, 5 in Precision, Sliders and Mixed, 7 in Technical, up to 33 in Streams): past that, the passage carries on as half-beat jumps. Long streams stay in Streams maps. Stars (1 to 10) are computed from the map itself: aim (the gaps, relative to orb size and time) and speed (clicks per second).

## Varied maps

Orb placement is inspired by osu! maps: for each kind of passage (stream, burst, jump, free section), the game picks between several shapes (curves, S, spirals, zigzags, squares, triangles, stars, pentagons, back-and-forths…). Orbs follow the movement instead of bouncing off the edges, and never land on a slider that is still visible. Sliders take eight shapes (line, curve, arc, S, hook, wave, zigzag, loop) and go faster in the chorus. A passage that comes back in the music often comes back with the same shape, mirrored.

Like a mapper, the game **spots the choruses**: when 4 bars of a chorus come back, they reuse exactly the shapes of the first time (or their mirror). **Triplets** keep their real place instead of being snapped to the grid. Hard levels get **rhythmic sliders** (very short, with a repeat, on three quick notes) and often a jump right after a slider. In **calm passages**, the map leaves a real break or puts a spinner.

The music drives the map: streams on drum rolls, sliders on held notes, the finish on accents, new combos more often in the chorus.

A level always gives the same map. **ANOTHER VARIANT** makes a different one, with its own leaderboard; **THE FIRST ONE** goes back to the original map.

Stars are closer to osu!'s: aim also counts slider travel, angles and speed changes, speed counts rhythm changes.

## My music

In **My music**, create a level from an imported **audio file** or a track from your **NeoMusic** library: the game finds its tempo and strong beats and places the orbs on them (it also follows a changing tempo, and separates the bass, the snare and the highs), at the chosen **difficulty** (1 to 10 stars). Orbs are placed the same way on all your PCs.

## Settings

- Separate **volumes**: the **music**, the **hits** (hitsounds, sliders, spinners) and the **menu** (changing song or difficulty, the end grade, medals).
- **Hitsounds**: osu!-style hit sounds in four sets (Normal, Soft, Drum and **8-bit**, with old-console sounds), with the whistle on sliders, the finish on accents and the clap on beats 2 and 4; plus the slider tick and spinner sounds. Or **Hit sound**: a single sound on each note you hit, one of 10 (Soft, Clap, Wood, Kick, Crystal, Pop, Hi-hat, Snare, Pluck, Tock) or none. Losing a combo of 10 or more plays a « combo break » sound.
- **Background dim** (0 to 100 %): the background darkens while playing so the orbs stand out (less during breaks in the song).
- **Cursor**: its size (1× to 3×), its trail (the skin's, long or none) and **pointing**: mouse (captured) or **tablet** (the cursor goes where the pen points).
- **Sensitivity** (0.3× to 3×): cursor speed in game. While playing, the mouse is captured and follows its raw movement, without Windows acceleration; Esc releases it and pauses.
- **Offset** (−300 to +300 ms): it adjusts itself after each game; you can also change it by hand.

## Data and sync

Your scores and grades per level and your settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Orbe → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

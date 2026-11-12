# Orbe (Orb)

A mouse rhythm game: numbered orbs appear on the field, and a circle closes in on each one. Aim at the orb and click when the circle touches it. Follow the sliders with the button held, spin the spinners. Play the 1200 tracks from the Rythme plugin, or your own music.

*Version française : [README.md](README.md)*

## How to play

- **Mouse**: aim. **Click** (left or right) or **W / X** (also Z and C): hit.
- **Orbs**: click when the approach circle touches the orb's edge. Hit them in the order of their numbers: only the next orb counts, and clicking much too early makes it shake.
- **Sliders**: hit their orb, then keep the button held and follow the ball to the end; a white ring at the end means it comes back.
- **Spinners**: keep the button held and spin the mouse around the centre before the ring closes.
- **Space**: play · **P** or **Esc**: pause.

## Full screen and start

Pick a level: a bar shows the loading (the music is read, decoded and analysed in full before playing). Space or click goes full screen, then a **3, 2, 1** countdown starts the music.

## Accuracy and points

Each orb is judged by how far it is from the right moment: **Perfect** (300 points), **Good** (200 points), **OK** (100 points), otherwise a miss. The windows depend on the level's **OD**: from ±62 / ±124 / ±193 ms on the easiest levels to ±31 / ±62 / ±96 ms in Expert. A slider followed to the end gives 150 more points per pass; letting go breaks the combo. A spinner is judged on how many turns you made.

Points rise by 1 % per orb of combo, up to double at 100 in a row. At the end, accuracy gives a grade: **S** from 95 %, **A** at 90 %, **B** at 80 %, **C** at 70 %, **D** below.

## Songs and difficulty

The **Songs** tab offers the 1200 Rythme tracks. Each level has its own settings, shown before you play:

- **CS**: orb size (the higher, the smaller).
- **AR**: how early you see them coming (the higher, the faster the approach circle).
- **OD**: how precise you must be.

Each track also has a **map style**, the same at all its difficulties and shown in the list:

- **Jumps** (Sauts): wide gaps in triangles, squares, stars and back-and-forths.
- **Streams**: long runs of tight orbs, in curves, on the drums' sixteenth notes.
- **Precision** (Précision): smaller orbs, stricter timing.
- **Technical** (Technique): doubles, triples and changing rhythms, with stacked orbs.
- **Sliders** (Glissières): lots of sliders, longer, more curved and faster.
- **Mixed** (Mixte): a different style every 8 bars.

Easy keeps to simple rhythms. Doubles and triples come in Normal, streams in Hard, and in Expert they go up to 17 orbs (33 in the Streams style). Stars (1 to 10) are computed from the map itself: aim (the gaps, relative to orb size and time) and speed (clicks per second).

## My music

In **My music**, create a level from an imported **audio file** or a track from your **NeoMusic** library: the game finds its tempo and strong beats and places the orbs on them, at the chosen **difficulty** (1 to 10 stars). Orbs are placed the same way on all your PCs.

## Settings

- Music **volume**.
- **Hit sound**: the sound played on each note you hit, one of 10 (Soft, Clap, Wood, Kick, Crystal, Pop, Hi-hat, Snare, Pluck, Tock) or none. Losing a combo of 10 or more plays a « combo break » sound.
- **Sensitivity** (0.3× to 3×): cursor speed in game. While playing, the mouse is captured and follows its raw movement, without Windows acceleration; Esc releases it and pauses.
- **Offset** (−300 to +300 ms): it adjusts itself after each game; you can also change it by hand.

## Data and sync

Your scores and grades per level and your settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Orbe → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

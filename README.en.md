# Orbe (Orb)

A mouse rhythm game: numbered orbs appear on the field, and a circle closes in on each one. Aim at the orb and click when the circle touches it. Follow the sliders with the button held, spin the spinners. Play the 200 tracks from the Rythme plugin, or your own music.

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

Each orb is judged by how far it is from the right moment: **Perfect** (about ±75 ms, 300 points), **Good** (±150 ms, 200 points), **OK** (±230 ms, 100 points), otherwise a miss. A slider followed to the end gives 150 more points per pass; letting go breaks the combo. A spinner is judged on how many turns you made.

Points rise by 1 % per orb of combo, up to double at 100 in a row. At the end, accuracy gives a grade: **S** from 95 %, **A** at 90 %, **B** at 80 %, **C** at 70 %, **D** below.

## Songs and difficulty

The **Songs** tab offers the 200 Rythme tracks, rated from 1 to 10 stars. The higher the level, the smaller the orbs, the faster they come and the further apart they are.

## My music

In **My music**, create a level from an imported **audio file** or a track from your **NeoMusic** library: the game finds its tempo and strong beats and places the orbs on them, at the chosen **difficulty** (1 to 10 stars). Orbs are placed the same way on all your PCs.

## Settings

- Music **volume**.
- **Offset** (−300 to +300 ms): it adjusts itself after each game; you can also change it by hand.

## Data and sync

Your scores and grades per level and your settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Orbe → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

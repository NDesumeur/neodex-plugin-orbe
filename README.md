# Orbe

Un jeu de rythme à la souris : des orbes numérotés apparaissent sur le terrain, et un cercle se resserre sur chacun. Vise l'orbe et clique au moment où le cercle le touche. Suis les glissières bouton enfoncé, fais tourner les toupies. Joue les 200 morceaux du plugin Rythme, ou ta propre musique.

*English version: [README.en.md](README.en.md)*

## Comment jouer

- **Souris** : vise. **Clic** (gauche ou droit) ou **W / X** (aussi Z et C) : frappe.
- **Orbes** : clique quand le cercle d'approche touche le bord de l'orbe. Touche-les dans l'ordre de leurs numéros : seul le prochain orbe compte, un clic trop tôt le fait trembler.
- **Glissières** : touche leur orbe, puis garde le bouton enfoncé et suis la boule jusqu'au bout ; un anneau blanc au bout annonce un retour.
- **Toupies** : garde le bouton enfoncé et fais tourner la souris autour du centre avant que l'anneau se referme.
- **Espace** : jouer · **P** ou **Échap** : pause.

## Plein écran et départ

Choisis un niveau : une barre montre le chargement (la musique est lue, décodée et analysée en entier avant de jouer). Espace ou clic passe en plein écran, puis un compte à rebours **3, 2, 1** lance la musique.

## Précision et points

Chaque orbe est jugé selon l'écart avec le bon moment : **Parfait** (300 points), **Bien** (200 points), **OK** (100 points), sinon raté. Les fenêtres dépendent de l'**OD** du niveau : de ±62 / ±124 / ±193 ms pour les plus faciles à ±31 / ±62 / ±96 ms en Expert. Une glissière suivie jusqu'au bout rapporte 150 points de plus par passage ; la lâcher casse le combo. Une toupie est jugée sur le nombre de tours.

Les points augmentent de 1 % par orbe de combo, jusqu'au double à 100 de suite. À la fin, la précision donne une note : **S** à partir de 95 %, **A** à 90 %, **B** à 80 %, **C** à 70 %, **D** en dessous.

## Chansons et difficulté

L'onglet **Chansons** reprend les 200 morceaux de Rythme. Chaque niveau a ses réglages, affichés avant de jouer :

- **CS** : la taille des orbes (plus il est haut, plus ils sont petits).
- **AR** : le temps où on les voit venir (plus il est haut, plus le cercle d'approche est rapide).
- **OD** : la précision demandée.

Chaque morceau a aussi un **style de map**, le même à toutes ses difficultés et affiché dans la liste :

- **Sauts** : de grands écarts en triangles, carrés, étoiles et allers-retours.
- **Streams** : de longues suites d'orbes serrés, en courbes, sur les doubles-croches de la batterie.
- **Précision** : des orbes plus petits, une précision plus sévère.
- **Technique** : des doubles, des triples et des rythmes qui changent, avec des orbes empilés.
- **Glissières** : beaucoup de glissières, plus longues, plus courbées et plus rapides.
- **Mixte** : un autre style toutes les 8 mesures.

Facile reste sur des rythmes simples. Les doubles et triples arrivent en Normal, les streams en Difficile, et en Expert ils vont jusqu'à 17 orbes (33 en style Streams). Les étoiles (1 à 10) se calculent sur la map elle-même : la visée (les écarts, rapportés à la taille des orbes et au temps) et la vitesse (les clics par seconde).

## Mes musiques

Dans **Mes musiques**, crée un niveau à partir d'un **fichier audio** importé ou d'une musique de ta bibliothèque **NeoMusic** : le jeu trouve son tempo et ses temps forts et place les orbes dessus, à la **difficulté** choisie (1 à 10 étoiles). Les orbes sont placés de la même façon sur tous tes PC.

## Réglages

- **Volume** de la musique.
- **Son des clics** : le son joué à chaque note touchée, au choix parmi 10 (Doux, Clap, Bois, Grosse caisse, Cristal, Pop, Charleston, Caisse claire, Pluck, Tok) ou aucun. Perdre un combo de 10 ou plus joue un son « combo cassé ».
- **Sensibilité** (0,3× à 3×) : la vitesse du curseur en partie. Pendant la partie la souris est capturée et suit son déplacement brut, sans l'accélération de Windows ; Échap la libère et met en pause.
- **Décalage** (−300 à +300 ms) : il se règle tout seul après chaque partie ; tu peux aussi le changer à la main.

## Données et synchronisation

Tes scores et notes par niveau et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Orbe → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

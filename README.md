# Orbe

Un jeu de rythme à la souris : des orbes numérotés apparaissent sur le terrain, et un cercle se resserre sur chacun. Vise l'orbe et clique au moment où le cercle le touche. Suis les glissières bouton enfoncé, fais tourner les toupies. Joue les 1200 morceaux du plugin Rythme, ou ta propre musique.

*English version: [README.en.md](README.en.md)*

## Comment jouer

- **Souris** : vise. **Clic** (gauche ou droit) ou **W / X** (aussi Z et C) : frappe.
- **Orbes** : clique quand le cercle d'approche touche le bord de l'orbe. Touche-les dans l'ordre de leurs numéros : seul le prochain orbe compte, un clic trop tôt le fait trembler.
- **Glissières** : touche leur orbe, puis garde le bouton enfoncé et suis la boule jusqu'au bout ; un anneau blanc au bout annonce un retour.
- **Toupies** : garde le bouton enfoncé et fais tourner la souris autour du centre avant que l'anneau se referme.
- **Espace** : jouer, ou passer une longue intro · **P** ou **Échap** : pause (Continuer, Recommencer, Quitter ; pour continuer, clique sur le rond là où était ton curseur) · **²** maintenu : recommencer tout de suite.

## Plein écran et départ

Choisis un niveau : une barre montre le chargement (la musique est lue, décodée et analysée en entier avant de jouer). Comme dans osu!, l'écran de départ montre le titre, le style, le thème, le tempo, la durée et le nombre de cercles, glissières et toupies, les étoiles dans la couleur de la difficulté, les réglages **CS, AR, OD, HP** en barres et **ton record** sur ce niveau ; au milieu, un orbe bat au rythme de la chanson, dont le **refrain** tourne en boucle (réglage « Écouter avant de jouer »). Espace ou clic passe en plein écran, puis un compte à rebours **3, 2, 1** lance la musique.

## La page

À gauche, le jeu, avec en dessous les **mods**, puis le **classement du niveau** (rang, note, score, précision, combo, mods, pp, date) et ton **profil** (ton rang, tes pp, ta précision, tes records), comme le panneau du joueur d'osu!.

À droite, la **liste des maps**, comme dans osu! : une seule longue liste qu'on fait défiler à la molette, les cartes rangées en arc autour du milieu. **Une carte par difficulté** : les chansons du jeu, tes musiques et tes maps osu! sont ensemble, rangées par étoiles sous des titres **1 ★, 2 ★ … 10 ★ et 10+ ★** (11 étoiles et plus). Chaque carte a une bande de la couleur de ses étoiles (bleu pour les faciles, puis vert, jaune, orange, rouge, violet), ses étoiles, ta **meilleure note**, son style (Streams, Sauts, Précision, Technique, Glissières ou Mixte), son tempo et sa durée. Les étoiles des 1200 chansons sont calculées d'avance : la liste et les filtres s'affichent tout de suite. Pas de barre de défilement : la molette et les flèches suffisent. Un clic choisit la difficulté ; un clic sur la carte déjà choisie lance la partie. Les filtres : l'origine (chansons du jeu, mes musiques, maps osu!), le style, la catégorie d'étoiles, le tempo, la durée, et l'ordre dans chaque catégorie (étoiles, titre, tempo, durée, meilleure note).

**Au clavier**, comme dans osu! : **Haut** et **Bas** passent à la carte d'à côté (le niveau se charge quand tu t'arrêtes), **Gauche** et **Droite** à l'autre difficulté de la même chanson, **Entrée** joue, **F2** prend une chanson au hasard, **Page haut** et **Page bas** sautent à la catégorie d'étoiles d'avant ou d'après. Pour aller vite dans la liste : la molette défile trois fois plus vite, et un **clic droit maintenu** va directement à cet endroit de la liste (en haut le début, en bas la fin), comme dans osu!. Le filtre **Sans les chansons du jeu** cache les chansons d'Orbe et ne garde que tes musiques et tes maps osu!. Tes musiques sont rangées avec les autres dès leur import, avec des étoiles estimées (≈) jusqu'à leur première partie.

Au-dessus de la liste : une **recherche** par titre, des **filtres** (style de la map, étoiles, tempo, durée), l'**ordre** (titre, tempo, durée, meilleure note) et **AU HASARD**, qui choisit une chanson parmi celles affichées. Le filtre des étoiles les calcule au besoin, petit à petit. Les **options** et l'**aide** s'ouvrent avec leurs boutons, sous la liste. Les filtres sont gardés d'une fois sur l'autre : si des maps sont cachées par eux, la liste le dit (« N maps cachées par tes filtres ») avec un bouton **TOUT AFFICHER** ; après un import, ils sont remis à zéro pour que la nouvelle map se voie.

## Précision et points

Comme dans osu! : chaque orbe touché au plus juste vaut **300** (rien ne s'affiche, juste un éclat), un peu à côté **100**, encore plus loin **50** ; un raté fait tomber un **X** rouge. Les fenêtres dépendent de l'**OD** du niveau : de ±62 / ±124 / ±193 ms pour les plus faciles à ±31 / ±62 / ±96 ms en Expert. Les points suivent la formule d'osu! : le combo d'avant, la difficulté du niveau et les mods les multiplient.

**Glissières** : dès que tu tiens la boule, un cercle de suivi grandit autour ; tu peux t'écarter un peu. Chaque tic (petit point) et chaque retour (la flèche qui bat avec la musique) tenus gardent le combo ; lâchés, il casse. Le bout se juge un peu avant la fin. Le tube se déroule de la tête vers le bout quand la glissière apparaît.

**Toupies** : le compte-tours (RPM) s'affiche ; une fois le compte bon, chaque tour en plus rapporte **1000** points.

La précision se calcule comme dans osu!, et la note aussi : **SS** sans aucune faute, **S** avec plus de 90 % de 300 et aucun raté, puis **A**, **B**, **C** et **D**. Les orbes posés au même endroit s'empilent avec un petit décalage, pour qu'on les voie tous.

## Vie et mods

Une **barre de vie** en haut à gauche baisse toute seule, remonte à chaque frappe et chute à chaque raté ; presque vide, elle clignote et les bords de l'écran battent en rouge. Vide, la partie est perdue (elle ne compte pas). Pendant une pause du morceau, un ✓ ou un ✗ dit si ta vie est bonne, et des flèches préviennent juste avant la reprise.

Les **mods**, avec les réglages : **EZ** (orbes plus grands et plus lents), **NF** (on ne perd jamais), **HT** (morceau à 75 %), **HR** (orbes plus petits et plus rapides, terrain retourné), **DT** (morceau à 150 %), **HD** (pas de cercle d'approche, les orbes s'effacent) et **FL** (on ne voit qu'autour du curseur). Chacun change les points, comme dans osu!. HT et DT gardent la hauteur de la musique ; **NC** (Nightcore) et **DC** (Daycore) la changent, comme un disque accéléré ou ralenti.

D'autres mods : **SD** (un seul raté et c'est perdu), **PF** (tout ce qui n'est pas un 300 fait perdre), **RX** (il suffit de viser, sans cliquer), **AP** (le curseur bouge tout seul, tu cliques) et **AT** (le jeu joue tout seul pour te montrer ; rien n'est enregistré). RX et AP ne donnent pas de pp.

## pp et statistiques

Chaque partie finie rapporte des **pp** (points de performance), calculés avec le code d'osu! traduit tel quel (la version de juillet 2026) : la visée, la vitesse, la précision, la lecture et la Lampe (FL), selon les étoiles du niveau, son OD, son AR et tes mods, comme pour une partie d'osu! stable. Un raté ou un combo cassé en enlève (osu! estime aussi les glissières cassées d'après le combo). Ton **profil** additionne ta meilleure partie de chaque niveau (la 1re compte en entier, puis 95 %, 90 %…).

Ton **rang** suit ton total de pp : Débutant, Bronze (50 pp), Argent (200), Or (500), Platine (1000), Diamant (2000), Maître (4000) et Légende (7000). Les **médailles** ont trois paliers, **bronze**, **argent** et **or** : Belles notes (A, S, SS), Full combo (1, 10, 50 niveaux), Étoiles (3, 5, 7★), Précision (95, 98, 99,5 %), Combo (500, 1000, 2000), Performance (50, 100, 200 pp en une partie), Caché, Dur, Accéléré et Lampe (finir un niveau de 2, 4, 6★ en HD, HR, DT ou FL), Voyageur (10, 50, 200 niveaux différents), Habitué (50, 200, 1000 parties) et Endurance (1, 5, 20 h de jeu) ; plus Premier pas. Et 34 autres : Perfection et Série de S (nombre de SS, de S), Combo étoilé, SS étoilé et Tireur d'élite (un full combo, un SS, 98 % sur un niveau difficile), Légende (8, 9, 10★), Métronome (UR sous 150, 100, 80), Facile, Ralenti, Mort subite et Sans faute (EZ, HT, SD, PF), Cocktail (plusieurs mods à la fois), Importateur (maps osu!), Ta musique, Polyvalent (les styles), Streamer, Sauteur, Technicien, Glisseur et Orfèvre (un style à 3, 5, 7★), Expert, Collectionneur (une chanson dans ses 4 difficultés), Discothèque, Persévérant, Tenace, Marathon, Score total, Cliqueur, Assidu, Semaine de feu (des jours de suite), Oiseau de nuit et Lève-tôt. Chaque nouveau palier s'annonce à la fin de la partie.

L'onglet **STATS** commence par ta **carte de joueur** : une image de ton profil (rang, pp, précision, parties, meilleures performances, médailles) à **enregistrer** (dans Téléchargements) ou à **copier** pour la partager. Puis il montre ton rang avec la courbe de tes pp, tes médailles, ton profil, tes **meilleures performances** comme sur un profil osu! (les 15 premières, avec ce que chacune compte après pondération, les étoiles, les mods et la note), **dans le temps** (tes pp, ta précision et ton rang à la fin de chaque jour sur 30 jours, ce que tu as gagné cette semaine et ton meilleur progrès de la semaine), des courbes de ta précision et de ton UR au fil des parties, tes résultats **par style de map et par étoiles** (parties, précision et pp moyens), le **temps de jeu et l'activité** (un calendrier de tes parties sur 13 semaines, les jours joués, les clics, le meilleur combo, les mods préférés) et tes niveaux préférés.

## Pendant la partie

Toutes les maps s'affichent en large (400 × 240 au lieu de 320 × 240) : le terrain reste au milieu, et le compteur de touches, à droite, ne cache plus les orbes. En haut à droite : le score qui défile, la précision, un camembert qui montre où en est le morceau, et les mods. Si tu as déjà fini ce niveau, un petit chiffre **vert** ou **rouge** sous le score dit si tu es en avance ou en retard sur ton record au même moment. En bas : le combo qui rebondit, et au milieu la **barre d'erreur** (tôt à gauche, tard à droite ; la petite flèche est ta moyenne). À droite, les compteurs **K1 K2 M1 M2** s'allument quand tu appuies.

## Thèmes du terrain

Chaque morceau a son thème, le même à toutes ses difficultés : **Nuit**, **Océan**, **Braise**, **Forêt**, **Bonbon**, **Glace**, **Neige**, **Néon**, **Dunes** ou **Aurore**. Le thème change les couleurs des orbes et le fond tramé (anneaux, vagues, diagonales, damier, flocons, horizon quadrillé, dunes ou aurore) ; son nom s'affiche avant de jouer.

## Écran de fin

Comme dans osu! : le score et les nombres défilent, puis la note tombe avec un son. On y voit le score, le nombre de 300, 100, 50 et ratés, le combo, la précision, le **décalage moyen** et l'**UR** (ta régularité : plus il est bas, mieux c'est), puis la **vie** le long du morceau. Chaque niveau garde son **classement** : tes 10 meilleures parties, avec leurs mods, dans le panneau. Espace ou clic : rejouer.

À côté, **tes décalages** : combien de frappes tombent tôt (à gauche) ou tard (à droite), dans les fenêtres du 300, du 100 et du 50. Et ta **visée** : chaque frappe en point dans un rond (le mouvement va vers la droite), ta moyenne en jaune, et une phrase qui dit si tu vises en général trop loin, pas assez loin, ou juste.

Plus bas, la **courbe de précision** montre ta justesse le long du morceau : en vert quand tu es presque toujours Parfait, en jaune quand ça baisse, en rouge dans les passages difficiles. Chaque petit trait rouge en dessous est une note ratée, à sa place dans le morceau. **Clique sur la frise** : le détail du passage (le raté le plus proche et le combo cassé, ou la précision du passage).

## Chansons et difficulté

L'onglet **Chansons** reprend les 1200 morceaux de Rythme. Chaque niveau a ses réglages, affichés avant de jouer :

- **CS** : la taille des orbes (plus il est haut, plus ils sont petits).
- **AR** : le temps où on les voit venir (plus il est haut, plus le cercle d'approche est rapide). Comme dans les maps classées d'osu!, il suit les étoiles de la map : 7,5 à 3 étoiles, 8,5 à 4, 9 à 5, puis jusqu'à 10.
- **OD** : la précision demandée.

Chaque morceau a aussi un **style de map**, le même à toutes ses difficultés et affiché dans la liste :

- **Sauts** : de grands écarts en triangles, carrés, étoiles, allers-retours, grandes courbes et écarts qui grandissent ; le motif change toutes les 4 notes. C'est le style le plus fréquent.
- **Streams** : de longues suites d'orbes serrés, en courbes, sur les doubles-croches de la batterie.
- **Précision** : des orbes plus petits, une précision plus sévère.
- **Technique** : des doubles, des triples et des rythmes qui changent, avec des orbes empilés.
- **Glissières** : beaucoup de glissières, plus longues, plus courbées et plus rapides.
- **Mixte** : un autre style toutes les 8 mesures.

Facile reste sur des rythmes simples. Les doubles et triples arrivent en Normal, les streams en Difficile. Chaque style a sa longueur de stream maximale (3 orbes en Sauts, 5 en Précision, Glissières et Mixte, 7 en Technique, jusqu'à 33 en Streams) : au-delà, le passage continue en sauts au demi-temps. Les longs streams restent donc dans les maps Streams. Les étoiles (1 à 10) se calculent sur la map elle-même : la visée (les écarts, rapportés à la taille des orbes et au temps) et la vitesse (les clics par seconde).

## Des maps variées

Le placement des orbes s'inspire des maps d'osu! : pour chaque type de passage (stream, rafale, saut, passage libre), le jeu choisit entre plusieurs formes (courbes, S, spirales, zigzags, carrés, triangles, étoiles, pentagones, allers-retours…). Les orbes suivent le mouvement au lieu de rebondir sur les bords, et ne se posent pas sur une glissière encore visible. Les glissières prennent huit formes (droite, courbe, arc, S, crochet, vague, zigzag, boucle) et vont plus vite dans le refrain. Un passage qui revient dans la musique revient souvent avec la même forme, en miroir.

Comme un mapper, le jeu **repère les refrains** : quand 4 mesures du refrain reviennent, elles reprennent exactement les formes de la première fois (ou leur miroir). Les **triolets** gardent leur vraie place au lieu d'être recollés sur la grille. Les niveaux durs ont des **glissières rythmiques** (très courtes, avec un retour, sur trois notes rapides) et souvent un saut juste après une glissière. Dans les **passages calmes**, la map laisse une vraie pause ou met une toupie.

La musique guide la map : des streams sur les roulements, des glissières sur les notes tenues, la cymbale sur les accents, de nouveaux combos plus souvent dans le refrain.

Les étoiles sont calculées avec le code d'osu! traduit tel quel (la version de juillet 2026) : la visée (sauts, agilité et flow, avec le trajet des glissières), la vitesse (avec la complexité du rythme), la lecture (l'AR, les notes à l'écran en même temps, HD) et la Lampe avec FL. Sur des maps classées, elles tombent à 0,01 étoile près de celles du site d'osu!. Les maps osu! déjà importées sont recalculées une fois à l'ouverture.

## Mes musiques

Dans l'onglet **IMPORTER**, crée un niveau à partir d'un **fichier audio** importé ou d'une musique de ta bibliothèque **NeoMusic** : le jeu trouve son tempo et ses temps forts et place les orbes dessus (il suit aussi un tempo qui change, et sépare les basses, la caisse claire et les aigus), à la **difficulté** choisie (1 à 10 étoiles). Les orbes sont placés de la même façon sur tous tes PC.

**Maps osu!** : colle le **lien d'une map** (osu.ppy.sh/beatmapsets/…) et **TÉLÉCHARGER** : le fichier vient d'un miroir public (catboy.best, sinon osu.direct), sans compte osu! (NeoDex 3.3.6 ou plus). Ou télécharge-la sur le site d'osu! (**CATALOGUE OSU!** l'ouvre dans un onglet ; il faut un compte osu!), puis **IMPORTER UNE MAP OSU!** ou dépose le fichier **.osz** sur le jeu. Orbe reconnaît le **style** de chaque difficulté d'après ses motifs (suites de notes serrées, sauts, glissières, rythmes variés, petits cercles), lit les **couleurs de combo** de la map et toutes les sortes de glissières (même celles d'osu! lazer), et empile les notes posées au même endroit comme osu!. Chaque difficulté (mode standard) garde ses propres orbes, glissières, toupies, sons de frappe, son fond et ses réglages CS, AR, OD et HP ; ses étoiles et ses pp sont calculés comme dans osu!. La musique, les difficultés et le fond sont gardés dans les données du jeu (15 Mo au plus pour la musique) et suivent la synchronisation.

## Replays, analyse et entraînement

Chaque partie finie garde son **replay** (les 50 dernières parties, sur ce PC). Sous le jeu, l'**analyse** montre la **carte des erreurs** : chaque note à sa place dans le morceau, en haut si tu as frappé en retard, en bas en avance, et un trait rouge pour chaque raté. Les boutons **REVOIR LE REPLAY** et **AU RALENTI ×0,5** rejouent la partie (le curseur et les frappes, sans tes clics) ; **EXPORTER EN .OSR** fabrique un fichier de replay qu'osu! sait ouvrir (pour les maps osu!). Les boutons des passages ratés lancent une **boucle** sur ce passage : il démarre à 75 % de la vitesse, et chaque réussite à 95 % ou plus l'accélère de 5 %, jusqu'à 150 %. Une boucle n'est pas enregistrée.

L'onglet **ENTRAÎNEMENT** propose des **exercices** fabriqués par le jeu : sauts, flow (des sauts en courbe), streams (de 16 à 32 notes) et lecture (AR de plus en plus haut), au tempo et à la durée choisis.

L'onglet **STATS** montre aussi tes **paliers de pp** (et le prochain à atteindre), tes derniers **replays**, et tes **amis** : copie ton code, colle celui d'un ami, et ses meilleurs scores apparaissent dans le classement de chaque niveau (rien ne passe par un serveur : le code contient les scores).

Le **navigateur de maps**, sous l’import, cherche des maps osu! sur osu.direct (classées, aimées ou toutes), avec des filtres d’étoiles, de durée et de BPM : choisis-en une, elle se télécharge et s’importe toute seule.

## Réglages

- **Volumes** séparés : la **musique**, les **frappes** (hitsounds, glissières, toupies) et le **menu** (changer de chanson ou de difficulté, la note de fin, les médailles).
- **Hitsounds** : les sons de frappe d'osu!, en quatre jeux (Normal, Soft, Drum et **8-bit**, aux sons de vieille console), avec le sifflet sur les glissières, la cymbale sur les accents et le clap sur les temps 2 et 4 ; plus le tic des glissières et les sons des toupies. Ou bien **Son des clics** : un son unique à chaque note touchée, au choix parmi 10 (Doux, Clap, Bois, Grosse caisse, Cristal, Pop, Charleston, Caisse claire, Pluck, Tok) ou aucun. **Selon la map** : chaque note d'une map osu! joue le jeu de sons écrit dans la map (Normal, Soft ou Drum). Perdre un combo de 10 ou plus joue un son « combo cassé ».
- **Skin osu!** : **IMPORTER UN SKIN OSU!** (ou dépose un fichier **.osk** sur le jeu) : ses cercles, son cercle d'approche, ses chiffres, ses glissières, son curseur, ses couleurs de combo et ses sons de frappe remplacent ceux d'Orbe, dessinés nets (le reste du jeu reste en pixels). Les glissières sont tracées comme dans osu! : un bord opaque et un fond un peu transparent, plus sombre au bord et plus clair au milieu ; les couleurs de combo de la map passent avant celles du skin. Si le skin a un compteur de touches (**inputoverlay**), son cadre et ses touches remplacent celui d'Orbe. Il apparaît dans les menus Skin et Hitsounds ; **RETIRER LE SKIN** l'enlève. Un seul skin à la fois.
- **Storyboard** : les images animées et la vidéo de fond d'une map osu!, quand elle en a (les sprites et leurs fondus, mouvements, tailles et rotations ; une vidéo mp4 ou webm de 40 Mo au plus).
- **Fond assombri** (0 à 100 %, jusqu'au noir) : le fond s'assombrit pendant la partie pour mieux voir les orbes (moins pendant les pauses du morceau). **Flou du fond** (0 à 8) : floute l'image de fond, comme dans osu!.
- **Curseur** : sa taille (1× à 3×), sa traînée (celle du skin, longue ou aucune) et le **pointage** : souris (capturée) ou **tablette** (le curseur va là où pointe le stylet).
- **Sensibilité** (0,3× à 3×) : la vitesse du curseur en partie. Pendant la partie la souris est capturée et suit son déplacement brut, sans l'accélération de Windows ; Échap la libère et met en pause.
- **Décalage** (−300 à +300 ms) : il se règle tout seul après chaque partie ; tu peux aussi le changer à la main.

## Données et synchronisation

Tes scores et notes par niveau et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Orbe → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

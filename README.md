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

À gauche, le jeu, avec en dessous les **mods** et les variantes de la map, puis le **classement du niveau** (rang, note, score, précision, combo, mods, pp, date) et ton **profil** (ton rang, tes pp, ta précision, tes records), comme le panneau du joueur d'osu!.

À droite, le **carrousel** des chansons, comme dans osu! : une seule longue liste qu'on fait défiler à la molette, les cartes rangées en arc autour du milieu. Chaque carte a une bande de la couleur de sa difficulté la plus dure, ta **meilleure note** à côté du titre, et les étoiles de chacune de ses difficultés, sur leur couleur (bleu pour les faciles, puis vert, jaune, orange, rouge, violet). Pas de barre de défilement : la molette et les flèches suffisent. La chanson choisie s'ouvre sur ses quatre difficultés ; un clic sur la difficulté déjà choisie lance la partie.

**Au clavier**, comme dans osu! : **Haut** et **Bas** changent de chanson (le niveau se charge quand tu t'arrêtes), **Gauche** et **Droite** changent de difficulté, **Entrée** joue, **F2** prend une chanson au hasard.

Au-dessus de la liste : une **recherche** par titre, des **filtres** (style de la map, étoiles, tempo, durée), l'**ordre** (titre, tempo, durée, meilleure note) et **AU HASARD**, qui choisit une chanson parmi celles affichées. Le filtre des étoiles les calcule au besoin, petit à petit. Les **options** et l'**aide** s'ouvrent avec leurs boutons, sous la liste.

## Précision et points

Comme dans osu! : chaque orbe touché au plus juste vaut **300** (rien ne s'affiche, juste un éclat), un peu à côté **100**, encore plus loin **50** ; un raté fait tomber un **X** rouge. Les fenêtres dépendent de l'**OD** du niveau : de ±62 / ±124 / ±193 ms pour les plus faciles à ±31 / ±62 / ±96 ms en Expert. Les points suivent la formule d'osu! : le combo d'avant, la difficulté du niveau et les mods les multiplient.

**Glissières** : dès que tu tiens la boule, un cercle de suivi grandit autour ; tu peux t'écarter un peu. Chaque tic (petit point) et chaque retour (la flèche qui bat avec la musique) tenus gardent le combo ; lâchés, il casse. Le bout se juge un peu avant la fin. Le tube se déroule de la tête vers le bout quand la glissière apparaît.

**Toupies** : le compte-tours (RPM) s'affiche ; une fois le compte bon, chaque tour en plus rapporte **1000** points.

La précision se calcule comme dans osu!, et la note aussi : **SS** sans aucune faute, **S** avec plus de 90 % de 300 et aucun raté, puis **A**, **B**, **C** et **D**. Les orbes posés au même endroit s'empilent avec un petit décalage, pour qu'on les voie tous.

## Vie et mods

Une **barre de vie** en haut à gauche baisse toute seule, remonte à chaque frappe et chute à chaque raté ; presque vide, elle clignote et les bords de l'écran battent en rouge. Vide, la partie est perdue (elle ne compte pas). Pendant une pause du morceau, un ✓ ou un ✗ dit si ta vie est bonne, et des flèches préviennent juste avant la reprise.

Les **mods**, avec les réglages : **EZ** (orbes plus grands et plus lents), **NF** (on ne perd jamais), **HT** (morceau à 75 %), **HR** (orbes plus petits et plus rapides, terrain retourné), **DT** (morceau à 150 %), **HD** (pas de cercle d'approche, les orbes s'effacent) et **FL** (on ne voit qu'autour du curseur). Chacun change les points, comme dans osu!. HT et DT changent aussi la hauteur de la musique.

D'autres mods : **SD** (un seul raté et c'est perdu), **PF** (tout ce qui n'est pas un 300 fait perdre), **RX** (il suffit de viser, sans cliquer), **AP** (le curseur bouge tout seul, tu cliques) et **AT** (le jeu joue tout seul pour te montrer ; rien n'est enregistré). RX et AP ne donnent pas de pp.

## pp et statistiques

Chaque partie finie rapporte des **pp** (points de performance), calculés comme dans osu! : la visée, la vitesse et la précision, selon la difficulté du niveau et tes mods. Un raté ou un combo cassé en enlève. Ton **profil** additionne ta meilleure partie de chaque niveau (la 1re compte en entier, puis 95 %, 90 %…).

Ton **rang** suit ton total de pp : Débutant, Bronze (50 pp), Argent (200), Or (500), Platine (1000), Diamant (2000), Maître (4000) et Légende (7000). Les **médailles** ont trois paliers, **bronze**, **argent** et **or** : Belles notes (A, S, SS), Full combo (1, 10, 50 niveaux), Étoiles (3, 5, 7★), Précision (95, 98, 99,5 %), Combo (500, 1000, 2000), Performance (50, 100, 200 pp en une partie), Caché, Dur, Accéléré et Lampe (finir un niveau de 2, 4, 6★ en HD, HR, DT ou FL), Explorateur (1, 5, 20 autres variantes), Voyageur (10, 50, 200 niveaux différents), Habitué (50, 200, 1000 parties) et Endurance (1, 5, 20 h de jeu) ; plus Premier pas. Chaque nouveau palier s'annonce à la fin de la partie.

L'onglet **STATS** commence par ta **carte de joueur** : une image de ton profil (rang, pp, précision, parties, meilleures performances, médailles) à **enregistrer** (dans Téléchargements) ou à **copier** pour la partager. Puis il montre ton rang avec la courbe de tes pp, tes médailles, ton profil (pp, précision, parties, temps de jeu, meilleur UR et combo), des courbes de ta précision et de ton UR au fil des parties, tes parties par jour, tes meilleures performances et tes niveaux préférés.

## Pendant la partie

En haut à droite : le score qui défile, la précision, un camembert qui montre où en est le morceau, et les mods. Si tu as déjà fini ce niveau, un petit chiffre **vert** ou **rouge** sous le score dit si tu es en avance ou en retard sur ton record au même moment. En bas : le combo qui rebondit, et au milieu la **barre d'erreur** (tôt à gauche, tard à droite ; la petite flèche est ta moyenne). À droite, les compteurs **K1 K2 M1 M2** s'allument quand tu appuies.

## Thèmes du terrain

Chaque morceau a son thème, le même à toutes ses difficultés : **Nuit**, **Océan**, **Braise**, **Forêt**, **Bonbon**, **Glace**, **Neige**, **Néon**, **Dunes** ou **Aurore**. Le thème change les couleurs des orbes et le fond tramé (anneaux, vagues, diagonales, damier, flocons, horizon quadrillé, dunes ou aurore) ; son nom s'affiche avant de jouer.

## Écran de fin

Comme dans osu! : le score et les nombres défilent, puis la note tombe avec un son. On y voit le score, le nombre de 300, 100, 50 et ratés, le combo, la précision, le **décalage moyen** et l'**UR** (ta régularité : plus il est bas, mieux c'est), puis la **vie** le long du morceau. Chaque niveau garde son **classement** : tes 10 meilleures parties, avec leurs mods, dans le panneau. Espace ou clic : rejouer.

À côté, **tes décalages** : combien de frappes tombent tôt (à gauche) ou tard (à droite), dans les fenêtres du 300, du 100 et du 50. Et ta **visée** : chaque frappe en point dans un rond (le mouvement va vers la droite), ta moyenne en jaune, et une phrase qui dit si tu vises en général trop loin, pas assez loin, ou juste.

Plus bas, la **courbe de précision** montre ta justesse le long du morceau : en vert quand tu es presque toujours Parfait, en jaune quand ça baisse, en rouge dans les passages difficiles. Chaque petit trait rouge en dessous est une note ratée, à sa place dans le morceau. **Clique sur la frise** : le détail du passage (le raté le plus proche et le combo cassé, ou la précision du passage).

## Chansons et difficulté

L'onglet **Chansons** reprend les 1200 morceaux de Rythme. Chaque niveau a ses réglages, affichés avant de jouer :

- **CS** : la taille des orbes (plus il est haut, plus ils sont petits).
- **AR** : le temps où on les voit venir (plus il est haut, plus le cercle d'approche est rapide). Comme dans osu!, il vaut 8 vers 4 étoiles et au moins 9 dès 5 étoiles.
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

Un niveau donne toujours la même map. **AUTRE VARIANTE** en fabrique une autre, avec son propre classement ; **LA PREMIÈRE** revient à la map de départ.

Les étoiles se rapprochent de celles d'osu! : la visée compte aussi le trajet des glissières, les angles et les changements de vitesse, la vitesse compte les changements de rythme.

## Mes musiques

Dans **Mes musiques**, crée un niveau à partir d'un **fichier audio** importé ou d'une musique de ta bibliothèque **NeoMusic** : le jeu trouve son tempo et ses temps forts et place les orbes dessus (il suit aussi un tempo qui change, et sépare les basses, la caisse claire et les aigus), à la **difficulté** choisie (1 à 10 étoiles). Les orbes sont placés de la même façon sur tous tes PC.

## Réglages

- **Volumes** séparés : la **musique**, les **frappes** (hitsounds, glissières, toupies) et le **menu** (changer de chanson ou de difficulté, la note de fin, les médailles).
- **Hitsounds** : les sons de frappe d'osu!, en quatre jeux (Normal, Soft, Drum et **8-bit**, aux sons de vieille console), avec le sifflet sur les glissières, la cymbale sur les accents et le clap sur les temps 2 et 4 ; plus le tic des glissières et les sons des toupies. Ou bien **Son des clics** : un son unique à chaque note touchée, au choix parmi 10 (Doux, Clap, Bois, Grosse caisse, Cristal, Pop, Charleston, Caisse claire, Pluck, Tok) ou aucun. Perdre un combo de 10 ou plus joue un son « combo cassé ».
- **Fond assombri** (0 à 100 %) : le fond s'assombrit pendant la partie pour mieux voir les orbes (moins pendant les pauses du morceau).
- **Curseur** : sa taille (1× à 3×), sa traînée (celle du skin, longue ou aucune) et le **pointage** : souris (capturée) ou **tablette** (le curseur va là où pointe le stylet).
- **Sensibilité** (0,3× à 3×) : la vitesse du curseur en partie. Pendant la partie la souris est capturée et suit son déplacement brut, sans l'accélération de Windows ; Échap la libère et met en pause.
- **Décalage** (−300 à +300 ms) : il se règle tout seul après chaque partie ; tu peux aussi le changer à la main.

## Données et synchronisation

Tes scores et notes par niveau et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Orbe → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

# École Chrétienne de Cyvadier — ECC

Site vitrine statique en français. Ouvrir `index.html` ou servir ce dossier avec un serveur HTTP. Aucun paquet à installer.

Identité bleue et structure scolaire : accueil avec carousel, présentation, photos de l’école, qualités mises en valeur, galerie, carrousel de présentation pour environ 13 membres de l’équipe, témoignages, admissions et contact. Les noms, portraits, postes et titres de l’équipe sont à confirmer. Les témoignages défilent lorsque leur nombre dépasse les emplacements visibles. Les animations respectent la préférence de réduction des mouvements.

L’image de la bannière est illustrative. Les photos de la présentation de l’école proviennent du dossier ECC partagé (`13jVP8EhJUtvGMPfg3_g56IO8NDkT8QmN`) et s’ouvrent en grand sur Google Drive. Les profils et témoignages sont explicitement provisoires. Le téléphone et les liens Facebook, Instagram et YouTube figurent dans les coordonnées du site. Le formulaire de contact prépare un message à copier, sans l’envoyer, en attendant l’adresse officielle de l’école. Les boutons d’admission conduisent à la rubrique contact.

## Galerie photo

La présentation scolaire affinée est définie par `school.css`, chargé après `template.css` sur les deux pages. L’accueil suit le parcours : école, cycles Kinder/Primaire/Secondaire, renseignements pour l’admission, qualités mises en valeur (art, musique, technologie, exploration, culture et religion) avec des photos de la galerie ECC, présentation photo de l’école, galerie, équipe, témoignages et contact. Les six photos de présentation proviennent du dossier Drive ECC partagé. Les classes ouvertes et les conditions précises restent à confirmer par l’école. Les cartes des cycles ouvrent la galerie sur le site. Le slogan officiel et les 4 photos Drive du carousel sont conservés.

Dossier officiel : `1ZbJdPyb4HYbpvHbGA32l4Ggy1-ayIuRs`. La page `galerie.html` affiche directement une grille des photos vérifiées, sans intégrer le navigateur de dossiers Google Drive. Chaque photo s’ouvre individuellement sur Drive. Les images doivent être accessibles aux visiteurs via leur lien ; le site ne modifie pas leurs permissions.

L’accueil affiche les 8 photos les plus récentes parmi les 28 photos vérifiées des sous-dossiers `Galat 2026` et `Variete` de `tout`, triées par date. La galerie complète affiche ces 28 images et les 6 photos du dossier ECC partagé. Les images sont servies par Google Drive, avec un lien vers chaque fichier si la miniature ne charge pas. `gallery-data.js` contient les photos de `tout` ; elle doit être resynchronisée pour refléter les futurs ajouts.

`template.css` définit un template indépendant : bannière photo sur toute la largeur, typographie condensée, trois accès rapides et mise en valeur des qualités de l’école. L’identité reprend le bleu marine et le rouge du logo officiel fourni, conservé dans `assets/logo-ecc.jpeg`. Le logo apparaît dans l’en-tête, la présentation, le pied de page et comme icône du site. `styles.css` et `ecc.css` sont les anciens styles, conservés mais non chargés. `script.js`, `testimonials.js` et `contact.js` gèrent les interactions.

# École Chrétienne de Cyvadier — ECC

Site vitrine statique en français. Ouvrir `index.html` ou servir ce dossier avec un serveur HTTP. Aucun paquet à installer.

Identité bleue et structure scolaire : accueil avec carousel, présentation, informations parents, vie scolaire, galerie, équipe éducative, témoignages, admissions et contact. Les témoignages défilent lorsque leur nombre dépasse les emplacements visibles. Les animations respectent la préférence de réduction des mouvements.

Les images de la bannière et du guide sont illustratives. Les profils et témoignages sont explicitement provisoires. À fournir : coordonnées, lien d’admission et informations de l’équipe. Le formulaire de contact prépare un message à copier, sans l’envoyer, en attendant l’adresse officielle de l’école. Les boutons d’admission conduisent à la rubrique contact.

## Galerie Google Drive

La présentation scolaire affinée est définie par `school.css`, chargé après `template.css` sur les deux pages. L’accueil suit le parcours : école, cycles Kinder/Primaire/Secondaire, renseignements pour l’admission, actualités, espace parents, galerie, équipe, témoignages et contact. Les classes ouvertes et les conditions précises restent à confirmer par l’école. Les cartes des cycles pointent vers les albums correspondants. Le slogan officiel et les 4 photos Drive du carousel sont conservés.

Dossier officiel : `1ZbJdPyb4HYbpvHbGA32l4Ggy1-ayIuRs`. Sous-albums vérifiés : Tout, Kinder, Primaire et Secondaire. La page `galerie.html` affiche directement ces albums via Drive et ses boutons permettent de passer d’un album à l’autre. Les nouvelles photos sont accessibles au rechargement de l’album. Les dossiers et images doivent être accessibles aux visiteurs via leur lien ; le site ne modifie pas leurs permissions.

L’accueil affiche les 8 photos les plus récentes parmi les 15 photos vérifiées du sous-dossier `tout`, triées par date d’ajout. Les images sont servies par Google Drive, avec un lien de secours si la miniature ne charge pas. `gallery-data.js` contient cette sélection vérifiée : elle doit être resynchronisée pour refléter les futurs ajouts sur l’accueil. La page des albums reste connectée en direct sans clé API. Les trois albums par niveau étaient vides à la mise en place.

`template.css` définit un template indépendant : bannière photo sur toute la largeur, typographie condensée, trois accès rapides et actualités en tête de parcours. L’identité reprend le bleu marine et le rouge du logo officiel fourni, conservé dans `assets/logo-ecc.jpeg`. Le logo apparaît dans l’en-tête, la présentation, le pied de page et comme icône du site. `styles.css` et `ecc.css` sont les anciens styles, conservés mais non chargés. `script.js`, `testimonials.js` et `contact.js` gèrent les interactions.

Déposez ici les fichiers de police MB Empire avec exactement ces noms :

  MBEmpire-Heavy.woff2   ← titres h1       (font-weight: 900)
  MBEmpire-Heavy.ttf

  MBEmpire-Bold.woff2    ← sous-titres h2/h3 (font-weight: 700)
  MBEmpire-Bold.ttf

  MBEmpire-Light.woff2   ← contenu / body  (font-weight: 300)
  MBEmpire-Light.ttf

Les fichiers .woff2 sont prioritaires (meilleure compression).
Les .ttf servent de fallback pour les navigateurs plus anciens.

Si vos fichiers ont des noms différents, modifiez les @font-face dans :
  src/styles.scss  (lignes ~10-35)

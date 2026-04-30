# Mémoire de travail - Projet SEFAIZO Frontend

Ce fichier doit être lu au début de chaque nouvelle session de travail sur ce projet. Il sert de référence commune pour garder une cohérence stricte entre les décisions UX/UI, l'architecture Angular, Tailwind CSS, et les futures intégrations backend.

## 1. Objectif du projet

SEFAIZO est une plateforme de réservation de services beauté à Abidjan. La page d'accueil doit reproduire la maquette fournie avec un niveau de fidélité élevé : structure, hiérarchie visuelle, couleurs, espacements, cartes, images, sections, typographie et comportements responsive.

Le résultat attendu n'est pas une simple landing page générique. C'est une interface exploitable, structurée, préparée pour recevoir les données backend sans réécriture majeure.

## 2. État actuel du projet

- Framework : Angular 21, composants standalone.
- Styling principal : Tailwind CSS v4.
- Icônes : `lucide-angular`.
- Templates : fichiers HTML séparés des fichiers TypeScript.
- CSS global :
  - `src/tailwind.css` : import Tailwind + tokens de design via `@theme`.
  - `src/styles.scss` : socle global minimal, conteneur, body, reset léger.
- Données actuelles :
  - `src/app/core/models/home-content.model.ts` définit les contrats TypeScript.
  - `src/app/core/data/home.mock.ts` contient les données temporaires.
  - `src/app/core/services/home.service.ts` est le point prévu pour remplacer le mock par l'API backend.
- Assets image :
  - `public/assets/images/home/`
  - Ne pas remplacer ces images sans nécessité visuelle ou validation.

## 3. Règles de travail non négociables

1. Lire le projet avant toute modification.
   - Inspecter les fichiers concernés.
   - Comprendre les composants existants.
   - Éviter les changements supposés ou automatiques.

2. Respecter la maquette.
   - Reproduire le rendu avec précision.
   - Ne pas négliger les détails : alignements, espacements, taille des images, couleurs, rythme vertical, hiérarchie typographique.
   - Toute correction doit préserver la cohérence desktop et mobile.

3. Garder TypeScript et HTML séparés.
   - Utiliser `templateUrl`.
   - Ne pas mettre de template inline dans les composants sauf micro-cas exceptionnel et justifié.
   - La logique reste dans `.ts`, le rendu dans `.html`.

4. Utiliser Tailwind CSS comme système de style principal.
   - Les classes Tailwind doivent vivre dans les templates HTML.
   - Les anciens SCSS composants ne doivent pas revenir.
   - `src/styles.scss` reste réservé aux bases globales réutilisables.
   - `src/tailwind.css` reste la source des tokens design.

5. Préserver une structure backend-friendly.
   - Les composants ne doivent pas contenir de données métier codées en dur quand ces données peuvent venir du service.
   - Les interfaces du dossier `core/models` sont le contrat d'échange.
   - `HomeService` est le point d'entrée pour remplacer le mock par `HttpClient`.
   - Les composants de présentation reçoivent leurs données par `@Input`.

6. Ne pas casser le travail existant.
   - Ne pas supprimer ou réécrire un fichier sans raison claire.
   - Ne pas faire de refactor large si la demande est ciblée.
   - Ne pas modifier les assets originaux sans besoin explicite.

7. Valider avant de conclure.
   - Exécuter `npm run build` après toute modification significative.
   - Vérifier le rendu local sur `http://127.0.0.1:4200/` si le serveur est actif.
   - Pour les changements visuels, vérifier au minimum desktop et mobile.

## 4. Architecture à conserver

La structure actuelle doit rester lisible par domaine :

```text
src/app/
  core/
    data/
      home.mock.ts
    models/
      home-content.model.ts
    services/
      home.service.ts
  features/
    home/
      components/
        app-download-section/
        business-section/
        category-strip/
        cta-section/
        hero-section/
        site-footer/
        site-header/
        stats-section/
        testimonials-section/
        trends-section/
      pages/
        home-page/
  shared/
    components/
      business-card/
      section-header/
    pipes/
      price.pipe.ts
```

Rôle des dossiers :

- `core` : modèles, services, données temporaires, logique partagée au niveau application.
- `features/home` : orchestration et sections de la page d'accueil.
- `shared` : composants réutilisables et pipes.
- `public/assets` : images statiques servies par Angular.

## 5. Contrat d'intégration backend

Le backend doit pouvoir remplacer les mocks sans toucher à la structure visuelle.

Point d'intégration principal :

```ts
// src/app/core/services/home.service.ts
getHomeContent(): Observable<HomeContent>
```

À terme, ce service doit :

- Injecter `HttpClient`.
- Appeler un endpoint du type `/api/home` ou équivalent.
- Retourner un objet compatible avec `HomeContent`.
- Gérer les erreurs avec une stratégie claire : fallback, état vide, ou message d'erreur.

Les composants ne doivent pas connaître les détails API. Ils consomment uniquement les propriétés déjà typées :

- `HeroContent`
- `Category`
- `Business`
- `Trend`
- `Testimonial`
- `StatItem`
- `FooterColumn`
- `HomeContent`

Toute nouvelle donnée affichée doit d'abord passer par un modèle TypeScript.

## 6. Règles Tailwind CSS

La configuration actuelle suit Tailwind v4 avec :

```css
@import 'tailwindcss';

@theme {
  --font-sans: Inter, "Segoe UI", Arial, sans-serif;
  --color-primary: #5b35f6;
  --color-primary-600: #4d28dc;
  --color-primary-100: #eee9ff;
  --color-accent: #ffb224;
  --color-ink: #11152f;
  --color-text: #252b4a;
  --color-muted: #727994;
  --color-border: #e7e9f4;
  --color-soft: #f7f5ff;
  --color-page: #fbfbff;
  --shadow-card: 0 14px 34px rgba(31, 35, 88, 0.12);
  --shadow-soft: 0 10px 26px rgba(44, 39, 117, 0.1);
}
```

Règles :

- Utiliser les tokens existants avant d'ajouter une nouvelle couleur.
- Ne pas disperser des couleurs arbitraires si elles peuvent devenir un token.
- Les valeurs arbitraires Tailwind sont acceptées pour reproduire précisément la maquette, mais elles doivent rester compréhensibles.
- Éviter les styles globaux sauf pour des règles vraiment transversales.
- Ne pas recréer des fichiers `.component.scss`.

## 7. Règles UX/UI

1. La page doit rester professionnelle, directe et orientée réservation.
2. Les visuels doivent montrer le vrai sujet : salon, coiffure, soins, beauté.
3. Éviter les sections marketing inutiles ou décoratives.
4. Les cartes servent aux salons, avis, tendances ou éléments répétés.
5. Ne pas imbriquer des cartes dans des cartes.
6. Les boutons doivent être clairs, stables et alignés.
7. Les icônes doivent venir de `lucide-angular` quand une icône existe.
8. Le texte ne doit jamais déborder de son conteneur.
9. Les layouts doivent être stables entre desktop, tablette et mobile.
10. Toute section ajoutée doit avoir un vrai rôle métier.

## 8. Règles responsive

La page est desktop-first dans sa composition actuelle, avec adaptations mobiles déjà présentes.

À chaque ajout ou modification :

- Vérifier l'absence de scroll horizontal.
- Vérifier les grilles à 1440px, autour de 960px, et à 390px.
- S'assurer que les titres, cartes, boutons et prix restent lisibles.
- Les cartes salon doivent rester exploitables sur mobile.
- Les images doivent garder un cadrage cohérent et ne pas devenir décoratives.

Points sensibles :

- Hero : titre, formulaire, image en arrière-plan.
- Cartes salon : nom, note, prix, bouton.
- Tendances : disposition compacte et images verticales.
- App download : téléphone et visuels décoratifs.

## 9. Accessibilité et sémantique

Règles minimales :

- Utiliser des `section`, `header`, `main`, `footer`, `nav`, `article` quand le rôle est clair.
- Ajouter `aria-label` lorsque le texte visible ne suffit pas.
- Utiliser `sr-only` pour les champs de formulaire qui ont besoin d'un label invisible.
- Les images de contenu doivent avoir un `alt` utile.
- Les images décoratives peuvent avoir `alt=""`.
- Les boutons et liens doivent avoir une cible compréhensible.

## 10. Qualité Angular

Règles :

- Garder les composants petits et ciblés.
- Les composants de section reçoivent leurs données par `@Input`.
- La page `HomePageComponent` orchestre les sections.
- Les services sont injectés avec `inject()` si cela reste cohérent avec le code actuel.
- Les imports doivent rester explicites.
- Ne pas introduire une librairie sans besoin réel.
- Ne pas ajouter d'état complexe tant que le besoin métier n'est pas présent.

## 11. Processus avant chaque modification

1. Lire les fichiers concernés.
2. Identifier le composant propriétaire de la zone à modifier.
3. Vérifier si la donnée doit venir du modèle/service.
4. Modifier de façon ciblée.
5. Vérifier le rendu.
6. Lancer `npm run build`.
7. Résumer clairement ce qui a changé.

## 12. Commandes utiles

Installer les dépendances :

```bash
npm install
```

Démarrer le projet :

```bash
npm start -- --host 127.0.0.1 --port 4200
```

Build production :

```bash
npm run build
```

Rechercher rapidement dans le projet :

```bash
rg "texte-ou-symbole"
rg --files
```

Important : si `ng serve` était lancé avant un changement dans `angular.json`, il faut le redémarrer pour que la nouvelle configuration soit prise en compte.

## 13. Checklist de livraison

Avant de dire qu'une tâche est terminée :

- Le code compile avec `npm run build`.
- Les templates restent séparés des TypeScript.
- Aucun `.component.scss` n'a été réintroduit.
- Les données affichées restent typées.
- Les sections restent alignées avec la maquette.
- Le rendu mobile n'a pas de débordement horizontal.
- Les images utilisées viennent de `public/assets/images/home/` ou ont été validées.
- Le code est lisible pour l'équipe backend.
- Les changements sont strictement liés à la demande.

## 14. Décisions déjà prises

- Tailwind CSS est préféré à une stratégie SCSS par composant.
- Les fichiers TypeScript et HTML restent séparés pour la maintenabilité.
- Les composants sont organisés par section pour faciliter le remplacement progressif par des données backend.
- Les données temporaires restent centralisées dans `home.mock.ts`.
- Les assets générés/corrigés sont dans `public/assets/images/home/`.
- La page d'accueil est la première priorité du frontend.

## 15. Points à traiter plus tard

Ces points ne doivent pas être implémentés sans demande explicite :

- Brancher `HttpClient` sur les endpoints backend réels.
- Ajouter un vrai menu mobile interactif.
- Ajouter les routes détaillées : salons, catégories, réservation, authentification.
- Ajouter états loading, empty state et error state.
- Ajouter tests unitaires ou tests visuels automatisés.
- Remplacer les textes temporaires par les textes définitifs du produit.

## 16. Définition de terminé

Une tâche frontend est considérée terminée uniquement si :

- Elle répond à la demande exacte.
- Elle respecte la maquette ou l'intention UX validée.
- Elle respecte Tailwind et la structure Angular existante.
- Elle ne complique pas l'intégration backend.
- Elle a été validée par build.
- Les limites connues sont signalées clairement.


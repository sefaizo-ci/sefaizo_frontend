# SefaizoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


 Structure du projet

      1 sefaizo-frontend/
      2 ├── src/app/
      3 │   ├── core/
      4 │   │   ├── models/          # Types TypeScript (User, Business, Booking...)
      5 │   │   ├── services/        # AuthService, MockDataService
      6 │   │   └── guards/          # AuthGuard, ClientGuard, ProGuard, AdminGuard
      7 │   ├── features/
      8 │   │   ├── public/          # Site marketplace public
      9 │   │   │   ├── home/        # Page d'accueil
     10 │   │   │   ├── search/      # Recherche avec filtres
     11 │   │   │   ├── business-detail/ # Fiche pro
     12 │   │   │   └── booking/     # Tunnel de réservation (6 étapes)
     13 │   │   ├── client/          # Espace client
     14 │   │   │   ├── reservations/ # Mes réservations
     15 │   │   │   └── profile/     # Profil client
     16 │   │   ├── pro/             # Espace professionnel
     17 │   │   │   ├── dashboard/   # Tableau de bord
     18 │   │   │   ├── services/    # Gestion des services
     19 │   │   │   ├── agenda/      # Calendrier
     20 │   │   │   └── wallet/      # Portefeuille
     21 │   │   ├── admin/           # Dashboard admin
     22 │   │   │   └── dashboard/   # KYC, stats, modération
     23 │   │   └── auth/            # Authentification
     24 │   │       ├── login/
     25 │   │       └── register/
     26 │   └── shared/
     27 │       ├── ui/              # Composants réutilisables
     28 │       └── pipes/           # Pipes (fcfa, dateFormat, phone)

    🌐 Serveur de développement
    http://localhost:4200

    🔑 Comptes de démonstration

    ┌────────┬───────────────────┬──────────────┐
    │ Rôle   │ Email             │ Mot de passe │
    ├────────┼───────────────────┼──────────────┤
    │ Client │ client@sefaizo.ci │ password123  │
    │ Pro    │ pro@sefaizo.ci    │ password123  │
    │ Admin  │ admin@sefaizo.ci  │ password123  │
    └────────┴───────────────────┴──────────────┘


    ✅ Fonctionnalités implémentées

    Site Public
     - ✅ Page d'accueil avec recherche, catégories, pros vedettes, communes
     - ✅ Page de recherche avec filtres (catégorie, commune, prix, note)
     - ✅ Fiche professionnel avec onglets (Services, Horaires, Avis, Photos)
     - ✅ Tunnel de réservation en 6 étapes (Service → Date → Lieu → Récap → Paiement → Confirmation)

    Espace Client
     - ✅ Mes réservations (À venir / Passées / Annulées)
     - ✅ Annulation de réservation
     - ✅ Profil client

    Espace Pro
     - ✅ Dashboard avec statistiques
     - ✅ Gestion des services
     - ✅ Agenda (placeholder)
     - ✅ Wallet avec historique
     pro@sefaizo.ci / password123

    Admin Dashboard
     - ✅ Validation KYC
     - ✅ Statistiques (KPIs, top pros)
     - ✅ Modération (placeholder)

    🎨 Design System (Fresha-inspired)
     - Couleur principale: #00A99D (Teal)
     - Framework CSS: Tailwind CSS
     - Police: Inter (Google Fonts)
     - Composants: Buttons, Cards, Badges, Skeleton loaders, Toast notifications

    📊 Mock Data
    Données fictives incluses pour:
     - 8 professionnels à Abidjan (Cocody, Plateau, Yopougon, etc.)
     - Services par catégorie (Coiffure, Esthétique, Manucure, etc.)
     - Réservations, avis, transactions wallet
     - Documents KYC en attente
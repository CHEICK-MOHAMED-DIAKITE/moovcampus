# MoovCampus

**L'application qui mesure le CO₂ que les étudiants évitent en allant en cours autrement.**

Projet réalisé pour le **LibraryUI Challenge 2026** avec Angular et les composants de [LibraryUI](https://www.libraryui.com/accueil).

🔗 **Démo en ligne : https://cheick-mohamed-diakite.github.io/moovcampus/**

---

## L'idée

Chaque matin, des milliers d'étudiants choisissent entre la voiture, les transports, le vélo ou la marche pour rejoindre leur campus. MoovCampus rend ce choix visible :

- tu **déclares un trajet** (mode, départ, arrivée, distance) ;
- l'application calcule le **CO₂ évité** par rapport au même trajet seul en voiture (≈ 200 g/km, ordre de grandeur ADEME) ;
- chaque kilomètre rapporte des **points**, qui font avancer ton rang et celui de ton **campus** ;
- des **défis** (vélotaf, semaine sans voiture…) donnent des points bonus.

La démo est interactive : déclarer un trajet met à jour en direct les indicateurs, le graphique, l'historique, l'objectif du mois et ta place dans le classement.

## Les pages

| Page | Contenu |
| --- | --- |
| **Accueil** | Hero avec un trajet animé, impact de la communauté, étapes, défis, FAQ, appel à l'action |
| **Tableau de bord** | Indicateurs personnels, km par mode, objectif mensuel, historique des trajets, formulaire de déclaration |
| **Classement et défis** | Classement filtrable des étudiants, CO₂ évité par campus, tous les défis |
| **Composants** | La liste des composants LibraryUI utilisés, avec liens vers LibraryUI et vers le code |

## Les 11 composants LibraryUI utilisés

Tous les composants sont dans [`src/app/libraryui/`](src/app/libraryui). Chaque fichier commence par un commentaire qui cite sa page LibraryUI, et l'élément racine de chaque composant porte un attribut `data-libraryui` visible dans l'inspecteur du navigateur.

| # | Composant LibraryUI | Style | Dossier | Utilisé pour |
| --- | --- | --- | --- | --- |
| 1 | [Navbar Menu](https://www.libraryui.com/components/bootstrap/main-menu) | Default | `navbar-default` | Navigation (menu burger ajouté pour le mobile) |
| 2 | [Hero](https://www.libraryui.com/components/bootstrap/hero) | Hero v-2 | `hero-v2` | Ouverture de l'accueil |
| 3 | [Kpi Cards](https://www.libraryui.com/components/bootstrap/kpi-card) | Kpi basic | `kpi-cards-basic` | Indicateurs d'impact (accueil, tableau de bord) |
| 4 | [Graphe repartition](https://www.libraryui.com/components/bootstrap/graphe-repartition) | Bar chart | `graphe-repartition` | Km par mode, CO₂ par campus |
| 5 | [Historique des activités](https://www.libraryui.com/components/bootstrap/activity-history) | Historique | `activity-history` | Historique des trajets |
| 6 | [Modal](https://www.libraryui.com/components/bootstrap/modal) | V1 | `modal-1` | Formulaire de trajet et confirmation |
| 7 | [User List](https://www.libraryui.com/components/bootstrap/user-list) | list | `user-list` | Classement des étudiants |
| 8 | [Cards](https://www.libraryui.com/components/bootstrap/cards) | Event card | `event-card` | Cartes de défis |
| 9 | [Faq](https://www.libraryui.com/components/bootstrap/faq) | Frequently Asked Questions | `faq-minimal` | Questions fréquentes |
| 10 | [Call to action](https://www.libraryui.com/components/bootstrap/call-to-action) | V1 | `call-to-action-1` | Bandeau final de l'accueil |
| 11 | [Footer](https://www.libraryui.com/components/bootstrap/footer) | Full footer | `full-footer` | Pied de page |

### Ce qui a été adapté

- **Données réelles de l'app** : les composants reçoivent leurs données par `input()` au lieu de données d'exemple codées en dur.
- **Interactions branchées** : filtres, recherche, pagination, « charger plus », inscription aux défis, copie de lien, encouragements dans le classement.
- **Charte commune** : les couleurs indigo d'origine sont remplacées par les variables CSS de MoovCampus (`src/styles.scss`), pour un rendu cohérent d'un composant à l'autre.
- **Responsive** : menu burger, colonnes du classement masquées progressivement, grilles qui passent sur une colonne, boutons pleine largeur sur mobile.
- **Accessibilité** : rôles `dialog`, `aria-expanded`, `aria-pressed`, `aria-live`, fermeture des modales avec Échap, focus visible, `prefers-reduced-motion` respecté.

## Stack

- Angular 20 (composants standalone, signals, nouveau control flow `@if` / `@for`)
- Bootstrap 5.3 + Bootstrap Icons (variante « Angular × Bootstrap » de LibraryUI)
- SCSS, polices Bricolage Grotesque et Figtree
- Déploiement automatique sur GitHub Pages via GitHub Actions

## Lancer le projet

```bash
npm install
npm start            # http://localhost:4200
npm run build        # build de production dans dist/moovcampus
```

## Auteur

**Cheick Mohamed Diakite**

Les données affichées (étudiants, campus, trajets) sont fictives.

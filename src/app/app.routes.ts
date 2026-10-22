import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'MoovCampus · Chaque trajet vers le campus compte',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'tableau-de-bord',
    title: 'Mon tableau de bord · MoovCampus',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'communaute',
    title: 'Classement et défis · MoovCampus',
    loadComponent: () => import('./pages/community/community.page').then(m => m.CommunityPage)
  },
  {
    path: 'composants',
    title: 'Composants LibraryUI utilisés · MoovCampus',
    loadComponent: () => import('./pages/components/components.page').then(m => m.ComponentsPage)
  },
  { path: '**', redirectTo: '' }
];

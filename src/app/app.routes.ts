import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Aplicacao } from './components/aplicacao/aplicacao';
import { authGuard } from './guards/auth-guard';
import { LoginGuard } from './guards/login-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login, canActivate: [LoginGuard]},
    {path: 'register', component: Register},
    {path: 'app', component: Aplicacao, canActivate: [authGuard],children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', loadComponent: () => import('./components/aplicacao/dashboard/dashboard').then(m => m.Dashboard)},
        {path: 'invoices', loadComponent: () => import('./components/aplicacao/invoices/invoices').then(m => m.Invoices)},
        {path: 'activity', loadComponent: () => import('./components/aplicacao/activity/activity').then(m => m.Activity)},
        {path: 'reports', loadComponent: () => import('./components/aplicacao/reports/reports').then(m => m.Reports)},
        {path: 'wallet', loadComponent: () => import('./components/aplicacao/wallet/wallet').then(m => m.Wallet)},
        {path: 'settings', loadComponent: () => import('./components/aplicacao/settings/settings').then(m => m.Settings)},
        {path: 'help', loadComponent: () => import('./components/aplicacao/help/help').then(m => m.Help)},
        {path: '**', redirectTo: 'dashboard'},
    ]},
    {path: '**', redirectTo: ''}
];

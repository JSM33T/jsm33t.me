import { Routes } from '@angular/router';

export const ABOUT_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'contact',
		loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
	},
	{
		path: 'faq',
		loadComponent: () => import('./faq/faq.component').then((m) => m.FaqComponent),
	},
	{
		path: 'attributions',
		loadComponent: () => import('./attributions/attributions.component').then((m) => m.AttributionsComponent),
	},
];

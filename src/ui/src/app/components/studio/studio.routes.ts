import { Routes } from '@angular/router';

export const STUDIO_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'the-coffeeroom-bootleg',
		loadComponent: () => import('./album/coffeeroomalbum/coffeeroomalbum.component').then((m) => m.CoffeeroomalbumComponent),
	},
    {
		path: 'singularity',
		loadComponent: () => import('./single/singularity/singularity.component').then((m) => m.SingularityComponent),
	},
    {
		path: 'features',
		loadComponent: () => import('./features/features.component').then((m) => m.FeaturesComponent),
	},
];

import { Route } from '@angular/router';

export const routes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'about',
		loadComponent: () => import('./components/about/about.component').then((m) => m.AboutComponent),
		loadChildren: () => import('./components/about/about.routes').then((m) => m.ABOUT_ROUTES),
	},
	{
		path: 'blogs',
		loadComponent: () => import('./components/blogs/blog.component').then((m) => m.BlogComponent),
	},
	{
		path: 'blog/:year/:slug',
		loadComponent: () => import('./components/blogs/view/view.component').then((m) => m.ViewComponent),
	},
	{
		path: 'artifacts',
		loadComponent: () => import('./components/artifacts/artifacts.component').then((m) => m.ArtifactsComponent),
	},
	{
		path: 'artifact/:type/:slug',
		loadComponent: () => import('./components/artifacts/view/view.component').then((m) => m.ViewComponent),
	},
	{
		path: 'studio',
		loadComponent: () => import('./components/studio/studio.component').then((m) => m.StudioComponent),
	},
	{
		path: 'studio/:slug',
		loadComponent: () => import('./components/studio/view/view.component').then((m) => m.ViewComponent),
	},
	{
		path: 'account',
		loadComponent: () => import('./components/account/account.component').then((m) => m.AccountComponent),
		loadChildren: () => import('./components/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
	},

	{ path: '**', redirectTo: '/' },
];

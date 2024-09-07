import { Component, OnInit, Renderer2 } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import acLogout from '../../../library/modals/logout.modal';

interface UserClaims {
	username: string;
	pfp: string;
	firstname: string;
}

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule, NgClass, NgIf, NgFor],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
	constructor(
		private renderer: Renderer2,
		private router: Router,
	) {}

	user: UserClaims = {
		username: '',
		pfp: '',
		firstname: '',
	};

	logout() {
		localStorage.removeItem('token');
		this.reloadComponent(true, '/');
	}

	isLoggedIn: boolean = false;

	ngOnInit(): void {
		initializeThemeSwitcher();
		this.navToggler();
		const token = localStorage.getItem('token'); // Retrieve your JWT token from local storage
		if (token) {
			const decodedToken = jwtDecode(token) as any;
			console.log(decodedToken);
			this.user.username = decodedToken.username; // Extract username from the decoded token
			this.user.pfp = decodedToken.profilePicture; // Extract profile picture from the decoded token
			this.isLoggedIn = true;
		} else {
			this.isLoggedIn = false;
		}
	}

	navToggler() {
		const button = document.querySelector('button.navbar-toggler') as HTMLButtonElement;
		if (button.getAttribute('aria-expanded') === 'true') {
			const bb = document.querySelector('.navbar-toggler') as HTMLButtonElement;
			bb.click();
		}
	}

	reloadComponent(self: boolean, urlToNavigateTo?: string) {
		//skipLocationChange:true means dont update the url to / when navigating
		console.log('Current route I am on:', this.router.url);
		const url = self ? this.router.url : urlToNavigateTo;
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.router.navigate([`/${url}`]).then(() => {
				console.log(`After navigation I am on:${this.router.url}`);
			});
		});
	}
}

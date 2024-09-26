import { Component, OnInit, Renderer2 } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import acLogout from '../../../library/modals/logout.modal';
import { environment } from '../../../../environment/environment';

interface UserClaims {
	username: string;
	pfp: string;
	firstname: string;
    authMode : string;
}

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule, NgClass, NgIf, NgFor],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
	webassets: string = environment.cdnUrl;

	constructor(
		private renderer: Renderer2,
		private router: Router,
	) {}

	user: UserClaims = {
		username: '',
		pfp: environment.cdnUrl + '/webassets/images/avatars/default.png',
		firstname: '',
        authMode : 'email'
	};

	logout() {
		localStorage.removeItem('token');
        window.location.reload();
		//this.reloadComponent(true, '/');
	}

	isLoggedIn: boolean = false;

	ngOnInit(): void {
		initializeThemeSwitcher();
		this.navToggler();
		const token = localStorage.getItem('token'); // Retrieve your JWT token from local storage
		if (token) {
			const decodedToken = jwtDecode(token) as any;
			this.user.username = decodedToken.username;            
            if(decodedToken.authMode == "google" || decodedToken.authMode == "both")
            {
                this.user.pfp = decodedToken.avatar;
            }
            else
            {
                this.user.pfp = environment.cdnUrl + '/webassets/images/avatars/' + decodedToken.avatar + '.png'
            }
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


    redirectToLogin() {
        const returnUrl = this.router.url; // Capture current route
        this.router.navigate(['/account/login'], { queryParams: { returnUrl } }); // Pass it as a param
     }
}

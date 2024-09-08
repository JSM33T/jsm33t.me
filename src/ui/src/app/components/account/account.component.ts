import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-account',
	standalone: true,
	imports: [RouterOutlet,RouterModule],
	templateUrl: './account.component.html',
	styleUrl: './account.component.css',
})
export class AccountComponent {}

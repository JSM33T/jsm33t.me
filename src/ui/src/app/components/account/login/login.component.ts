import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { HttpService } from '../../../services/http.service';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, HomeButtonComponent,RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	isLoading: boolean = false;
	loginForm!: FormGroup;

	constructor(private httpService: HttpService, private fb: FormBuilder,private router:Router, private responseHandler: ResponseHandlerService) {
		this.loginForm = this.fb.group({
			username: new FormControl(''),
			password: new FormControl(''),
		});
	}

	onSubmit(): void {
		this.isLoading = true;
		const response$: Observable<APIResponse<any>> = this.httpService.post('api/account/login', this.loginForm.value);

		this.responseHandler.handleResponse(response$, true).subscribe({
			next: (response) => {
				console.log(response);
				this.isLoading = false;
				if (response.status == 200) {
					console.log(response.data.token);
					localStorage.setItem('token', response.data.token);
                    this.router.navigate(['/'])
				}
			},
			error: (error) => {
				console.log(error.error);
				this.isLoading = false;
			},
		});
	}
}

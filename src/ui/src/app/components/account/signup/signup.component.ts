import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HomeButtonComponent,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    isLoading: boolean = false;
	sigupForm!: FormGroup;


    constructor(private httpService: HttpService, private fb: FormBuilder,private router:Router, private responseHandler: ResponseHandlerService) {
		this.sigupForm = this.fb.group({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            userName: new FormControl(''),
			email: new FormControl(''),
			password: new FormControl(''),
            confirmPassword: new FormControl(''),
		});
	}

    onSubmit(): void {
		this.isLoading = true;
        console.log(this.sigupForm.value);
		const response$: Observable<APIResponse<any>> = this.httpService.post('api/account/signup', this.sigupForm.value);

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

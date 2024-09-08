import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { HttpService } from '../../../services/http.service';

@Component({
	selector: 'app-otp',
	standalone: true,
	imports: [ReactiveFormsModule, RouterModule],
	templateUrl: './otp.component.html',
	styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
	username: string = '';
	otpForm!: FormGroup;

	constructor(
		private httpService: HttpService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private responseHandler: ResponseHandlerService,
	) {
		this.otpForm = this.fb.group({
			username: new FormControl(''),
			otp: new FormControl(''),
		});
	}

	ngOnInit(): void {
		this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
		if (this.username != '') {
			this.otpForm.patchValue({
				username: this.username,
			});
		}
	}

	onSubmit(): void {
		console.log(this.otpForm.value);
		const response$: Observable<APIResponse<any>> = this.httpService.post('api/account/verify', this.otpForm.value);

		this.responseHandler.handleResponse(response$, true).subscribe({
			next: (response) => {
				console.log(response);

				if (response.status == 200) {
					console.log(response.data.token);
					localStorage.setItem('token', response.data.token);
					this.router.navigate(['/account']);
					this.router.navigate(['/account/login'], {
						queryParams: { username: this.otpForm.get('username')?.value },
					});
				}
			},
			error: (error) => {
				console.log(error.error);
			},
		});
	}
}

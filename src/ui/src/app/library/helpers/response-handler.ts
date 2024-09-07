import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import acToast from '../modals/notification-modal';
import { APIResponse } from '../interfaces/api-response.model';
import { ToastService } from '../../services/toast.service';
import acToaster from '../modals/toast.modal';

@Injectable({
	providedIn: 'root',
})
export class ResponseHandlerService {
	constructor(private toastService: ToastService) {}

	handleResponse(observable: Observable<APIResponse<any>>, showToast: boolean = false): Observable<APIResponse<any>> {
		return observable.pipe(
			tap((response) => {
				if (showToast) {
					this.toastService.showToast(response);
				}
			}),
			catchError((error) => {
				if (error.error == undefined) {
					//acToast('Error', 'API not reachable: some parts of the app will not work as expected');
				} else {
					if (showToast) {
						this.toastService.showToast(error.error);
					}
				}
				return of(error);
			}),
		);
	}

	handleResponseToast(observable: Observable<APIResponse<any>>, showToast: boolean = false): Observable<APIResponse<any>> {
		return observable.pipe(
			tap((response) => {
				if (showToast) {
					acToaster('Notification', response.message);
				}
			}),
			catchError((error) => {
				if (error.error == undefined) {
				} else {
					if (showToast) {
						acToaster('Notification', error.error.message);
					}
				}
				return of(error);
			}),
		);
	}
}

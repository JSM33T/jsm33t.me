// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
// 	constructor() {}

// 	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		const token = localStorage.getItem('token');

// 		if (token) {
// 			const authReq = req.clone({
// 				setHeaders: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 				// withCredentials : true
// 			});
// 			return next.handle(authReq);
// 		} else {
// 			return next.handle(req);
// 		}
// 	}
// }

// token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	// Replace 'YOUR_TOKEN_HERE' with the actual token or a method to retrieve it
	const token = localStorage.getItem('token');
	if (token) {
		const clonedReq = req.clone({
			setHeaders: { Authorization: `Bearer ${token}` },
		});
		return next(clonedReq);
	}

	return next(req);
};

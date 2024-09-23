import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { routes } from './app.routes';
import { tokenInterceptor } from './interceptors/token.interceptor';

// Import the necessary modules for Google Sign-In
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            LoadingBarHttpClientModule,
            LoadingBarRouterModule,
        ),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([tokenInterceptor])),
        
        // Add the SocialAuthServiceConfig provider
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('881148390473-8ie9hsg4a04qobhalnpfp8ibo5h3cn6n.apps.googleusercontent.com') // Replace with your actual Google Client ID
                    }
                ]
            } as SocialAuthServiceConfig
        }
    ],
};
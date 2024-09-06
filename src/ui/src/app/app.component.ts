import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { initBackToTop } from './library/invokers/back-to-top';
import { SidePanelComponent } from './components/shared/side-panel/side-panel.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BackToTopComponent } from './components/shared/back-to-top/back-to-top.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import setTheme from './library/invokers/settheme';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { MetaTagManagerService } from './services/metaservice.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    RouterOutlet,
    BackToTopComponent,
    FooterComponent,
    NavbarComponent,
    SidePanelComponent,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private metaTagManagerService: MetaTagManagerService,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        this.shouldRenderNavbar();
        this.metaTagManagerService.initializeMetaTags();
      });
  }

  ngOnInit(): void {
    //setTheme();
    this.metaTagManagerService.initializeMetaTags();

    initBackToTop();
  }
  shouldRenderNavbar(): boolean {
    return !this.router.url.includes('account/');
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  constructor(private router: Router) {}

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`);
      });
    });
  }
}

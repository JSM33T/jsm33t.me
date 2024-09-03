import { Component, OnInit } from '@angular/core';
import { initializeThemeSwitcher } from '../../../library/invokers/theme-switcher';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { jwtDecode } from "jwt-decode";


interface UserClaims {
    username: string;
    pfp: string;
    firstname : string;
  }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgClass,NgIf,NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    user: UserClaims = {
        username: '',
        pfp: '',
        firstname: ''
      };

      isLoggedIn : boolean = false;

  ngOnInit(): void {
    initializeThemeSwitcher();
    this.navToggler();
    const token = localStorage.getItem('token'); // Retrieve your JWT token from local storage
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      console.log(decodedToken);
      this.user.username = decodedToken.username; // Extract username from the decoded token
      this.user.pfp = decodedToken.profilePicture; // Extract profile picture from the decoded token
      this.isLoggedIn = true;
    }
    else
    {this.isLoggedIn = false;}
  }

  navToggler()
  {
    const button = document.querySelector('button.navbar-toggler') as HTMLButtonElement;
    if (button.getAttribute('aria-expanded') === 'true') {
      const bb = document.querySelector('.navbar-toggler') as HTMLButtonElement;
      bb.click();
    }
  }

}

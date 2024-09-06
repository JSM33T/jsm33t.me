import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeButtonComponent } from "./home-button/home-button.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, HomeButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}

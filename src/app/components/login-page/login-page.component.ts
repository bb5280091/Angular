import { Component, OnInit } from '@angular/core';
import { AdoptionService } from 'src/app/service/adoption.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private adoptionService: AdoptionService) {}
  ngOnInit(): void {}

  /**
   *
   */
  redirectToOAuthProvider(): void {
    console.log('觸發');
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}

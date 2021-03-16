import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async loginCallback(formValues: { email: string; password: string }) {
    try {
      console.log('LOGIN CALLBACK');
      if (formValues) {
        const user = await this.authService.signInWithEmail(
          formValues.email,
          formValues.password
        );
        if (user) {
          this.router.navigate(['/']);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

}

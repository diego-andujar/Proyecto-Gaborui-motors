import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  authForm: FormGroup;
  @Output() sendFormEvent = new EventEmitter();
  @Input() isRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createAuthForm;
  }

  createAuthForm(): void {
    this.authForm = this.fb.group({
      displayName: "",
      email: "",
      password: "",
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async onSubmit() {
    const formValues = {
      displayName: this.authForm.get('displayName').value,
      email: this.email.value,
      password: this.authForm.get('password').value,
    };
    this.sendFormEvent.emit(formValues);
  }

  async googleLogin() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      this.router.navigate(['/posts']);
    }
  }

}

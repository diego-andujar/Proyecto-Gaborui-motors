import { User } from './../../models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  
  authForm!: FormGroup;
  @Output() sendFormEvent = new EventEmitter();
  @Input() isRegister: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      displayName: '' ,
      email: '',
      password: '',
    });
  }

  async googleLogin() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      this.router.navigate(['/']);
    }

  }

  async onSubmit() {
    const formValues = {
      displayName: this.authForm.get('displayName')?.value,
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    };
    this.sendFormEvent.emit(formValues);
    this.authForm.reset()
  }

  holaprueba(){
    const currentEmailToResetPassword = this.authForm.get('email')?.value;
    console.log(currentEmailToResetPassword)
    // en currentEmailToResetPassword yo tengo email que quiero mandar al servicio
    this.authService.resetPassword(currentEmailToResetPassword)
    const mensaje = "Hemos enviado un formulario para cambiar tu contraseña al correo  " + currentEmailToResetPassword;
    window.alert( mensaje )
    console.log(currentEmailToResetPassword, " es tu correo")
  
  }
}

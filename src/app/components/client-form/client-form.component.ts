import { Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  name: boolean;
  email: boolean;
  birth: boolean;
  cedula: boolean;
  phone: boolean;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem(JSON.stringify("CurrentUser"));
    if (this.user.name != null){
      this.name = true
    }
  
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      name: '' ,
      email: '',
      birthDate: '',
      cedula: '',
      phone: '',
      genero: '',
      direccion: '',
      ciudad: '',
      estado: '',
      postal: '',
    });
  }

  async onSubmit() {
    const formValues = {
      name: this.authForm.get('name'),
      email: this.authForm.get('email'),
      birthDate: this.authForm.get('birthDate'),
      cedula: this.authForm.get('cedula'),
      phone: this.authForm.get('phone'),
      genero: this.authForm.get('genero'),
      direccion: this.authForm.get('Direccion'),
      estado: this.authForm.get('estado'),
      ciudad: this.authForm.get('ciudad'),
      postal: this.authForm.get('postal'),
    };
    this.sendFormEvent.emit(formValues);
  }

}

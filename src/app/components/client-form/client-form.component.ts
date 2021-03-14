import { Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from "../../models/user"

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  user!: firebase.User;
  name: boolean;
  email: boolean;
  birth: boolean;
  cedula: boolean;
  phone: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user.displayName != null){
        this.name = true
      }
    })
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
      name: this.authForm.get('name').value,
      email: this.authForm.get('email').value,
      birthDate: this.authForm.get('birthDate').value,
      cedula: this.authForm.get('cedula').value,
      phone: this.authForm.get('phone').value,
      genero: this.authForm.get('genero').value,
      direccion: this.authForm.get('Direccion').value,
      estado: this.authForm.get('estado').value,
      ciudad: this.authForm.get('ciudad').value,
      postal: this.authForm.get('postal').value,
    };
    this.sendFormEvent.emit(formValues);
  }

}

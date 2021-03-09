import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import firebase from "firebase";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  user!: firebase.User;
  clientForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.createForm();
  }

  createForm(): void {
    this.clientForm = this.fb.group({
      name: '' ,
      email: '',
      username: '',
      edad: '',
      cedula: '',
      phoneNumber: '',
      genero: '',
      direction: '',
      city: '',
      state: '',
      postalCode: '',
    });
  }

  onSubmit(): void {
    const newUser: User = {
      id: this.user.uid,
      name: this.clientForm.get('name').value,
      email: this.clientForm.get('email').value,
      birthDate: this.clientForm.get('edad').value,
      cedula: this.clientForm.get('cedula').value,
      phoneNumber: this.clientForm.get('phoneNumber').value,
      address: this.clientForm.get('direction').value,
      city: this.clientForm.get('city').value,
      state: this.clientForm.get('state').value,
      postalCode: this.clientForm.get('postalCode').value,
    };
    this.createNewUser(newUser);
  }

  createNewUser(newPost: User): void {
    this.userService.createNewUser(newPost).then((response) => {
      console.log('response', JSON.stringify(response, null, 4));
    });
  }

}

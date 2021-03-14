import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import firebase from "firebase";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  userFire: any;
  user!: firebase.User;
  db = firebase.firestore();
  userFireId!: string;
  
  isName!: boolean;
  @Output() sendFormEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser"))
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFireId = localStorage.getItem("UserFireId");
  
    this.createForm();
    this.validateUsers();
    
  }

  validateUsers(){
    if(this.userFire.name == null){
      this.isName = false 
    } else { this.isName = true }
  }

  createForm(): void {
    this.authForm = this.fb.group({
      name: this.userFire.name,
      email: this.userFire.email,
      birthDate: this.userFire.birthDate,
      cedula: this.userFire.cedula,
      phone: this.userFire.phoneNumber,
      genero: this.userFire.genero,
      direccion: this.userFire.address,
      ciudad: this.userFire.city,
      estado: this.userFire.state,
      postal: this.userFire.postalCode,
    });
  }

  async onSubmit() {
    console.log(this.userFireId)
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
    } else {
      const formValues = {
        birthDate: this.authForm.get('birthDate'),
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        genero: this.authForm.get('genero'),
        direccion: this.authForm.get('Direccion'),
        estado: this.authForm.get('estado'),
        ciudad: this.authForm.get('ciudad'),
        postal: this.authForm.get('postal'),
        rol: this.authForm.get('rol'),
      };
      if (this.userFire.birthDate === undefined || this.userFire.birthDate.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({birthDate: formValues.birthDate?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.cedula === undefined || this.userFire.cedula.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.phoneNumber === undefined || this.userFire.phoneNumber.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({phoneNumber: formValues.phone?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.genero === undefined || this.userFire.genero.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({genero: formValues.genero?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.address === undefined || this.userFire.address.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({address: formValues.direccion?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.state === undefined || this.userFire.state.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({state: formValues.estado?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.city === undefined || this.userFire.city.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({city: formValues.ciudad?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.postalCode === undefined || this.userFire.postalCode.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({postalCode: formValues.postal?.value})
        this.userService.getUser(this.userFire.id);
      }
      if (this.userFire.rol === undefined || this.userFire.rol.length === 0){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({rol: formValues.rol?.value})
        this.userService.getUser(this.userFire.id);
      }
    }
  }

  validateForm(): boolean { 
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
      return false;
    } 
    
    return true;
  }

}

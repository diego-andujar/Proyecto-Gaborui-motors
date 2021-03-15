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
  userFireId!: string ;

  selectedValue!: string;
  selectedCar!: string;
  generos: any[] = [
    {value: 'masculino', viewValue: 'Masculino'},
    {value: 'femenino', viewValue: 'Femenino'},
    {value: 'nobinario', viewValue: 'No Binario'},
  ];
  
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
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
    } else {
      const formValues = {
        birthDate: this.authForm.get('birthDate'),
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        genero: this.authForm.get('genero'),
        direccion: this.authForm.get('direccion'),
        estado: this.authForm.get('estado'),
        ciudad: this.authForm.get('ciudad'),
        postal: this.authForm.get('postal'),
      };
      if ((this.userFire.birthDate === undefined || this.userFire.birthDate.length === 0) && formValues.birthDate?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({birthDate: formValues.birthDate?.value})
        
      }
      if ((this.userFire.cedula === undefined || this.userFire.cedula === null) && formValues.cedula?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
      }
      if ((this.userFire.phoneNumber === undefined || this.userFire.phoneNumber) === null && formValues.phone?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({phoneNumber: formValues.phone?.value})
      }
      if ((this.userFire.genero === undefined || this.userFire.genero === null) && formValues.genero?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({genero: formValues.genero?.value})
      }
      if ((this.userFire.address === undefined || this.userFire.address === null) && formValues.direccion?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({address: formValues.direccion?.value})
      }
      if ((this.userFire.state === undefined || this.userFire.state === null) && formValues.estado?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({state: formValues.estado?.value})
      }
      if ((this.userFire.city === undefined || this.userFire.city === null) && formValues.ciudad?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({city: formValues.ciudad?.value})
      }
      if ((this.userFire.postalCode === undefined || this.userFire.postalCode === null) && formValues.postal?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({postalCode: formValues.postal?.value})
      }
      console.log(formValues.genero?.value +  "   " + this.userFire.genero)
      this.userService.getUser(this.userFire.id);
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

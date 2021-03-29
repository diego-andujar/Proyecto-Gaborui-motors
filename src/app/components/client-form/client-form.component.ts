import { User } from 'src/app/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import firebase from "firebase";
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage'

// para fotos con firebase
interface FeaturedPhotosUrls{
  url1?: string;
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})

export class ClientFormComponent implements OnInit {

  // para fotos con firebase
  featuredPhotoStream: AngularFireObject<FeaturedPhotosUrls> | undefined

  authForm!: FormGroup;
  @Input() isRegister: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  userFire!: User;
  user!: firebase.User;
  db = firebase.firestore();
  userFireId!: string ;
  editarForm = false;
  startDate = new Date(2000, 0, 1)
  minDate = new Date(1910, 0, 1);
  maxDate = new Date(2005, 12, 31);

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
    private datePipe : DatePipe,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
    // para fotos firebase
    private storage: AngularFireStorage,
    private dab: AngularFireDatabase,
  ) {
    // para fotos firebase
    // this.featuredPhotoStream = this.db.object('/photos/imagen');
  }

  ngOnInit(): void {
    this.editarForm = false;
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser") || "{}")
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFireId = localStorage.getItem("UserFireId")!;
  
    this.createForm();
    this.validateUsers();
  }

  formatDates(date: Date): string{
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
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
    this.editarForm = false;
    if (this.authForm.pristine) {
      alert("Por favor todos los campos son requeridos!");
    } else {
      let birthDat;
      let sex;
      if (typeof this.authForm.get("birthDate")?.value != "string" && typeof this.authForm.get("birthDate")?.value != "undefined"){
        birthDat = this.datePipe.transform(this.authForm.get("birthDate")?.value, "dd-MM-yyyy");
      }
      if (typeof this.authForm.get("genero")?.value === "string" && typeof this.authForm.get("genero")?.value != "undefined"){
        sex = this.authForm.get("genero")?.value;
      }
      const formValues = {
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        direccion: this.authForm.get('direccion'),
        estado: this.authForm.get('estado'),
        ciudad: this.authForm.get('ciudad'),
        postal: this.authForm.get('postal'),
      };
      if (birthDat != undefined){
        this.userFire.birthDate = birthDat;
      }
      if (sex != undefined){
        this.userFire.genero = sex;
      }
      this.userFire.cedula = formValues.cedula?.value;
      this.userFire.phoneNumber = formValues.phone?.value;
      this.userFire.address = formValues.direccion?.value;
      this.userFire.state = formValues.estado?.value;
      this.userFire.city = formValues.ciudad?.value;
      this.userFire.postalCode = formValues.postal?.value;
      await this.userService.updateEntireUser(this.userFire, this.userFire.refId!);
      this.userService.getDoc(this.userFire.refId!).subscribe((user) => {
        this.userFire = user as User;
        localStorage.setItem("CurrentUser", JSON.stringify(user));
      })
      if (birthDat != undefined){
        this.createForm();
      }
      
      
      
      /*
      if ((this.userFire.birthDate === undefined || this.userFire.birthDate.length === 0) && formValues.birthDate?.valueOf != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({birthDate: formValues.birthDate}) 
      }
      if ((this.userFire.cedula === undefined || this.userFire.cedula === null) && formValues.cedula?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
      }
      if (formValues.phone?.value != null){
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
      this.userService.getUser(this.userFire.id);
      this.userService.getDoc(this.userFire.refId).subscribe((user) => {
        this.userFire = user;
      })
    }
    else {
      const formValues = {
        cedula: this.authForm.get('cedula'),
        phone: this.authForm.get('phone'),
        genero: this.authForm.get('genero'),
        direccion: this.authForm.get('direccion'),
        estado: this.authForm.get('estado'),
        ciudad: this.authForm.get('ciudad'),
        postal: this.authForm.get('postal'),
      };
      if ((this.userFire.cedula === undefined || this.userFire.cedula === null) && formValues.cedula?.value != null){
        const userRef = this.db.collection("users").doc(this.userFireId);
        userRef.update({cedula: formValues.cedula?.value})
      }
      if (formValues.phone?.value != null){
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
      this.userService.getUser(this.userFire.id);
      this.userService.getDoc(this.userFire.refId).subscribe((user) => {
        this.userFire = user;
      })*/
    }
  }

  validateForm(): boolean { 
    if (this.authForm.pristine) {
      alert("Please fill in all required fields!");
      return false;
    } 
    
    return true;
  }

  editar(){
    this.editarForm = !this.editarForm;
  }

  // para fotos firebase
  url = '';
  onSelectFile(event: any) {
    const file: File = event.target.files[0];
    const metaData = {'contentType': file.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1');
    const uploadTask: firebase.storage.UploadTask =  storageRef.put(file, metaData);
    console.log("uploading: ", file.name)

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log("Upload is complete")
      firebase.database().ref('/photos/featured/url1').set(uploadSnapshot.downloadURL);
    })
  }
}



export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

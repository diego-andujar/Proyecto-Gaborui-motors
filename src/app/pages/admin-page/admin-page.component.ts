import { Hijo } from './../../modelos';
import { FirestoreService } from './../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// -------TODO ESTO ES PARA EL ADMIN Y HACER CRUD EN CLIENTE, MECA Y GERENTE JHOEL--------
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  //Esto tiene peos por el ng model, deberia reconocer la variable 

  newHijo: Hijo = {
    nombre:"",
    username:"",
    rol:"",
    edad: 0,
    id:this.firestoreService.getId()
  };
  
  
  private path ='Hijos/';
  constructor(public firestoreService: FirestoreService ) {
    
   }
  ngOnInit(): void {
  }

  guardarHijo(){
    
    this.firestoreService.createDoc(this.newHijo,this.path,this.newHijo.id);
    console.log(this.newHijo)
  }
  
}

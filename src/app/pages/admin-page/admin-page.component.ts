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
  
  hijos:Hijo[]=[];
  newHijo: Hijo = {
    address:"",
    birthDate:"",
    cedula:0,
    city:"",
    email:"",
    genero:"",
    name:"",
    phoneNumber:0,
    postalCode:"",
    rol:"",
    state:"",
    id:this.firestoreService.getId()
  };
  
  enableNewHijo=false;
  
  private path ='Hijos/';
  constructor(public firestoreService: FirestoreService ) {
    
   }
  ngOnInit(): void {
    this.getHijos();
  }

  guardarHijo(){
    
    this.firestoreService.createDoc(this.newHijo,this.path,this.newHijo.id);
    console.log(this.newHijo)
  }
  
  getHijos(){
    this.firestoreService.getCollection<Hijo>(this.path).subscribe( res => {
     this.hijos=res;
    });
  }
  deleteHijo(hijo: Hijo){
    this.firestoreService.deleteDoc(this.path,hijo.id)
  }

  nuevo(){
    this.enableNewHijo=true;
    this.newHijo = {
      address:"",
      birthDate:"",
      cedula:0,
      city:"",
      email:"",
      genero:"",
      name:"",
      phoneNumber:0,
      postalCode:"",
      rol:"",
      state:"",
      id:this.firestoreService.getId()
    };
  }
}

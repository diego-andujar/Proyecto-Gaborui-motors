import { Roles } from '../../models/roles';
import { Hijo } from './../../modelos';
import { FirestoreService } from './../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// -------TODO ESTO ES PARA EL ADMIN Y HACER CRUD EN CLIENTE, MECA Y GERENTE JHOEL--------
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 5;
  usuarios:User[]=[];
  // hijos:Hijo[]=[];
  
  newUsuario: User = {
    id:"",
    address:"",
    birthDate:"",
    cedula:0,
    city:"",
    email:"",
    genero:"",
    name:"",
    phoneNumber:0,
    postalCode:0,
    // rol:Roles,
    state:"",
    refId:this.firestoreService.getrefId()
  };
  
  enablenewUsuario=false;
  
  private path ='users/';
  constructor(public firestoreService: FirestoreService ) {
    
   }
  ngOnInit(): void {
    this.getUsuarios();
  }

  guardarUsuario(){
    
    this.firestoreService.createDoc(this.newUsuario,this.path,this.newUsuario.refId, this.newUsuario.name,this.newUsuario.email,"JavierNoTeArreches");
    console.log(this.newUsuario)
  }
  
  getUsuarios(){
    this.firestoreService.getCollection<User>(this.path).subscribe( res => {
     this.usuarios=res;
    });
  }
  deleteUsuario(users: User){
    console.log(users.refId);
    this.firestoreService.deleteDoc(this.path,users.refId)
    
  }

  nuevo(){
    this.enablenewUsuario=true;
    this.newUsuario = {
      address:"",
      birthDate:"",
      cedula:0,
      city:"",
      email:"",
      genero:"",
      name:"",
      phoneNumber:0,
      postalCode:0,
      // rol:Roles,
      state:"",
      refId:this.firestoreService.getrefId()
    };
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  

  pageSize: number = 1;
  pageNumber: number = 1;
}

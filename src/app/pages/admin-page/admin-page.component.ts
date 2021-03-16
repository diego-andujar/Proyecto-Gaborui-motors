import { UsersService } from 'src/app/services/users.service';
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

  selectedValue!: string;
  selectedRol!:string;

  roles: any [] = [
    { value : 'cliente' , viewValue : 'Cliente' },
    { value : 'mecanico' , viewValue : 'Mecanico' },
    { value : 'gerente' , viewValue : 'Gerente' },
    { value : 'admin' , viewValue : 'Admin' }
  ];


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
    rol:({}),
    state:"",
    refId:this.firestoreService.getrefId()
  };
  
  enablenewUsuario=false;
  
  private path ='users/';
  constructor(public firestoreService: FirestoreService, private userService: UsersService ) {
    
   }
  ngOnInit(): void {
    this.getUsuarios();
  }

  guardarUsuario(){
    
    this.firestoreService.createDoc(this.newUsuario,this.path,this.newUsuario.refId);
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
      rol:({}),
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

  public listaClientes(){
    this.usuarios=this.userService.getClientUser();
    console.log(this.usuarios)
  }
  public listaMecanicos(){
    this.usuarios=this.userService.getMechanicUser();
    console.log(this.usuarios)
  }
  public listaGerentes(){
    this.usuarios=this.userService.getManagerUser();
    console.log(this.usuarios)
  }

  setRol(rol:string){
    if(rol==="cliente"){
      // this.newUsuario.rol?.client=true;
      // this.newUsuario.rol?.mechanic=false;
      // this.newUsuario.rol?.manager=false;
      // this.newUsuario.rol?.admin=false;
      let rol:Roles = {
        client:true
      }
      
      this.newUsuario.rol=rol;
      console.log("hola " + this.newUsuario.rol)
    }
    if(rol==="mecanico"){
      // this.newUsuario.rol?.client=true;
      // this.newUsuario.rol?.mechanic=false;
      // this.newUsuario.rol?.manager=false;
      // this.newUsuario.rol?.admin=false;
      let rol:Roles = {
        mechanic:true
      }
      
      this.newUsuario.rol=rol;
      console.log("hola " + this.newUsuario.rol)
    }
    if(rol==="gerente"){
      // this.newUsuario.rol?.client=true;
      // this.newUsuario.rol?.mechanic=false;
      // this.newUsuario.rol?.manager=false;
      // this.newUsuario.rol?.admin=false;
      let rol:Roles = {
        manager:true
      }
      
      this.newUsuario.rol=rol;
      console.log("hola " + this.newUsuario.rol)
    }
    if(rol==="admin"){
      // this.newUsuario.rol?.client=true;
      // this.newUsuario.rol?.mechanic=false;
      // this.newUsuario.rol?.manager=false;
      // this.newUsuario.rol?.admin=false;
      let rol:Roles = {
        admin:true
      }
      
      this.newUsuario.rol=rol;
      console.log("hola " + this.newUsuario.rol)
    }
  }
}

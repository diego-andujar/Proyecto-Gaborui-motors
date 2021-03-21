import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  closeResult = '';
  userForm!: FormGroup;
  idFirebaseActualizar!: string;
  actualizar!: boolean;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private dataService: DataService
    ) {}

  config: any;
  collection = {count:0, data:[] as any []}

  ngOnInit(): void {
    this.idFirebaseActualizar = '';
    this.actualizar = false;

    this.config = {
      itemsPerPage: 1,
      currentPage: 1,
      totalItems: this.collection.count
   }

    this.userForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      user: ['', Validators.required],
      age: ['', Validators.required],
      ci: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      cp: ['', Validators.required]
    })

    this.dataService.getUser().subscribe(resp=>{
      this.collection.data = resp.map((e:any) =>{
        return{
          idFirebase: e.payload.doc.id,
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          email: e.payload.doc.data().email,
          user: e.payload.doc.data().user,
          age: e.payload.doc.data().age,
          ci: e.payload.doc.data().ci,
          gender: e.payload.doc.data().gender,
          address: e.payload.doc.data().address,
          cp: e.payload.doc.data().cp
        }
      })
    },
    error=>{
      console.log(error)
    }
    )
  }

  actualizarUser(){

    if(!isNullOrUndefined(this.idFirebaseActualizar)){
      this.dataService.updateUser(this.idFirebaseActualizar , this.userForm.value).then(resp=>{
        this.userForm.reset();
        this.modalService.dismissAll();
    }).catch(error=>{
      console.log(error)
    })
    }
    
  }

  eliminar(item: any): void {
    this.dataService.deleteUser(item.idFirebase);
  }

  guardarUser():void{
    this.dataService.createUser(this.userForm.value).then(resp => {
      this.userForm.reset();
    this.modalService.dismissAll();
    }).catch(error => {
      console.log(error)
    })
    // this.collection.data.push(this.userForm.value);
    
  }

  openEditar(content: any, item: any) {
    this.userForm.setValue({
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      user: item.user,
      age: item.age,
      ci: item.ci,
      gender: item.gender,
      address: item.address,
      cp: item.cp
    })

    this.idFirebaseActualizar = item.idFirebase;
    this.actualizar = true;


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content: any) {
    this.actualizar = false,
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  // public contactForm: FormGroup;

  // // tslint:disable-next-line: max-line-length
  // private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  // constructor(private dbData: DataService) {
  //   this.contactForm = this.createForm();
  // }

  // get name() { return this.contactForm.get('name'); }
  // get user() { return this.contactForm.get('user'); }
  // get age() { return this.contactForm.get('age'); }
  // get ci() { return this.contactForm.get('ci'); }
  // get gender() { return this.contactForm.get('gender'); }
  // get address() { return this.contactForm.get('address'); }
  // get cp() { return this.contactForm.get('cp'); }
  // get email() { return this.contactForm.get('email'); }
  // get message() { return this.contactForm.get('message'); }

  // createForm() {
  //   return new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
  //     name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //     user: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //     age: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //     ci: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //     gender: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //     address: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //     cp: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   });
  // }

  // onResetForm(): void {
  //   this.contactForm.reset();
  // }

  // onSaveForm(): void {
  //   // if (this.contactForm.valid) {
  //     this.dbData.saveMessage(this.contactForm.value);
  //     this.onResetForm();
  //   // }
  // }

}



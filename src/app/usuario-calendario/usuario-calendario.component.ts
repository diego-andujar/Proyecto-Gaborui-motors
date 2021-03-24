import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-usuario-calendario',
  templateUrl: './usuario-calendario.component.html',
  styleUrls: ['./usuario-calendario.component.scss']
})
export class UsuarioCalendarioComponent implements OnInit {

  events!:[];
  closeResult = '';
  idFirebaseActualizar!: string;
  actualizar!: boolean;

  userDate!: FormGroup | any;
  submitted = false;

   //Add user form actions
   get f() { return this.userDate.controls; }
  
 ngbModal!:NgbModal;
 constructor(
   private formBuilder: FormBuilder,
   private modalService: NgbModal,
   private db: AngularFirestore,
   private dataService: DataService
   ){}

   
   title = 'angularadmintemplates';
   calendarOptions!: CalendarOptions;
   config: any;
   collection = {count:0, data:[] as any []}
   ngOnInit() {
    this.config = {
      itemsPerPage: 1,
      currentPage: 1,
      totalItems: this.collection.count
   }

    this.userDate = this.formBuilder.group({
      title: ['', Validators.required],
      dp: ['', Validators.required],
    })

    this.dataService.getUserDate().subscribe(resp=>{
      this.collection.data = resp.map((e:any) =>{
        return{
          idFirebase: e.payload.doc.id,
          title: e.payload.doc.data().title,
          dp: e.payload.doc.data().dp,
        }
      })
    },
    error=>{
      console.log(error)
    }
    )


     this.calendarOptions = {
       initialView: 'dayGridMonth',
       dateClick: this.handleDateClick.bind(this),
       events: [
         {
           
         }
       ]
   };
   
  
 }

 //Show Modal with Forn on dayClick Event
 open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
 }

 handleDateClick( arg) {
  
  // this.modalService.open('modal-title')

   $("#myModal").modal("show");
   $(".modal-basic-title, .eventstarttitle").text("");
   $(".modal-basic-title").text("Add Event at : "+arg.dateStr);
   $(".eventstarttitle").text(arg.dateStr);
  
 }
 //Hide Modal PopUp and clear the form validations
 hideForm(){
   this.userDate.patchValue({ title : ""});
   this.userDate.get('title').clearValidators();
   this.userDate.get('title').updateValueAndValidity();
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

  guardar():void{
    this.dataService.createUserDate(this.userDate.value).then(resp => {
      this.userDate.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.log(error)
    })
    // this.collection.data.push(this.userDate.value);
    
  }

  onSubmit() {
   
    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.userDate.get('title').setValidators([Validators.required]);
    this.userDate.get('title').updateValueAndValidity();
    if (this.userDate.invalid) {
        return;
    }
  }

  openEditar(content: any, item: any) {
    this.userDate.setValue({
      title: item.title,
      dp: item.dp
    })

    this.idFirebaseActualizar = item.idFirebase;
    this.actualizar = true;


    $("#myModal").modal("show");
  //  $(".modal-basic-title, .eventstarttitle").text("");
  //  $(".modal-basic-title").text("Add Event at : "+arg.dateStr);
  //  $(".eventstarttitle").text(arg.dateStr);
  }

  actualizarUser(){

    if(!isNullOrUndefined(this.idFirebaseActualizar)){
      this.dataService.updateUserDate(this.idFirebaseActualizar , this.userDate.value).then(resp=>{
        this.userDate.reset();
        this.modalService.dismissAll();
    }).catch(error=>{
      console.log(error)
    })
    }
    
  }

  eliminar(item: any): void {
    this.dataService.deleteUserDate(item.idFirebase);
  }
  
}
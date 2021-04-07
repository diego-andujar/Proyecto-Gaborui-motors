import { FormGroup, FormBuilder } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import emailjs, {EmailJSResponseStatus} from 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {
  contactform!: FormGroup;
  @Output() sendFormEvent= new EventEmitter();


  constructor(private fb:FormBuilder){

  }

  ngOnInit():void{
    this.createForm();
  }

  createForm(){
    this.contactform=this.fb.group({
      nombre:"",
      email:"",
      telefono:"",
      mensaje:"",
    })
  }

  onSubmit(){
    const formValues={
      nombre:this.contactform.get("nombre")?.value,
      email:this.contactform.get("email")?.value,
      telefono:this.contactform.get("telefono")?.value,
      mensaje:this.contactform.get("mensaje")?.value
    }
    this.sendFormEvent.emit(formValues)
    const values={
      from_name:formValues.nombre,
      input_email:formValues.email,
      from_number:formValues.telefono,
      message:formValues.mensaje

    }
    emailjs.send("contact_service","idformhome",values,"user_XWdrDn6QKZanPmZRRCZ3f")
    .then(function(response){
      console.log("logrado",response.status, response.text);
    }
    ,function(error){
      console.log("f mano", error)
    }
    )
    this.createForm();
    alert("su mensaje fue enviado con exito")
  }
  
}

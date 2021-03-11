import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  ngOnInit(): void {
  }

  public contactForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private dbData: DataService) {
    this.contactForm = this.createForm();
  }

  get name() { return this.contactForm.get('name'); }
  get user() { return this.contactForm.get('user'); }
  get age() { return this.contactForm.get('age'); }
  get ci() { return this.contactForm.get('ci'); }
  get gender() { return this.contactForm.get('gender'); }
  get address() { return this.contactForm.get('address'); }
  get cp() { return this.contactForm.get('cp'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      user: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.minLength(2)]),
      ci: new FormControl('', [Validators.required, Validators.minLength(5)]),
      gender: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cp: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onResetForm(): void {
    this.contactForm.reset();
  }

  onSaveForm(): void {
    // if (this.contactForm.valid) {
      this.dbData.saveMessage(this.contactForm.value);
      this.onResetForm();
    // }
  }

}



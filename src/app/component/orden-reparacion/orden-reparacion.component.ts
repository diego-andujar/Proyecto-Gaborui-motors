import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-orden-reparacion',
  templateUrl: './orden-reparacion.component.html',
  styleUrls: ['./orden-reparacion.component.scss']
})
export class OrdenReparacionComponent implements OnInit {

  authForm!: FormGroup;
  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      displayName: '' ,
      email: '',
      password: '',
      date: "",
    });
  }
}

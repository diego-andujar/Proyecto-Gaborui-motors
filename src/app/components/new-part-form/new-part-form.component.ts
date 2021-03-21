import { Part } from 'src/app/models/part';
import { OrdersService } from './../../services/orders.service';
import { Order } from './../../models/order';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrdenReparacionComponent } from 'src/app/component/orden-reparacion/orden-reparacion.component';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-new-part-form',
  templateUrl: './new-part-form.component.html',
  styleUrls: ['./new-part-form.component.scss']
})
export class NewPartFormComponent implements OnInit {

  authForm!: FormGroup;
  @Output() sendFormEvent = new EventEmitter();
  @Input() app: Appointment | undefined;
  @Input() order!: Order;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      displayName: '' ,
      cost: '',
    });
  }


  async onSubmit() {
    const part: Part = {
      item: this.authForm.get('displayName')?.value,
      cost: this.authForm.get('cost')?.value,
    };
    this.order.parts?.push(part);
    const parts = {parts: this.order.parts}
    this.orderService.updateOrder(parts, this.app?.appId, this.order.refId);
    this.authForm.reset();
    alert("Se ha agregado con exito el repuesto");
  }
}

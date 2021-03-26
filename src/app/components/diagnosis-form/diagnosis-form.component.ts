import { OrdersService } from './../../services/orders.service';
import { AppointmentServiceService } from './../../services/appointment-service.service';
import { Appointment } from './../../models/appointment';
import { Order } from './../../models/order';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss']
})
export class DiagnosisFormComponent implements OnInit {

  @Input() order!: Order;
  @Input() ordenCerrada: boolean = false;
  @Input() appointment: Appointment | undefined;
  diagnosisForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.diagnosisForm = this.fb.group({
      diagnosis: this.order.diagnosis,
    });
  }

  async onSubmit() {
    const formValues = {
      diagnosis: this.diagnosisForm.get('diagnosis')?.value,
    };
    const diag = {diagnosis: formValues.diagnosis};
    this.orderService.updateOrder(diag, this.appointment?.appId, this.order.refId);
    alert("Se ha actualizado el diagnostico")
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.order = doc[0];
    })
    this.createForm();
  }
}

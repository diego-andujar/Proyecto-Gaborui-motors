import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { Order } from 'src/app/models/order';
import { Part } from 'src/app/models/part';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { CarsService } from 'src/app/services/cars.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  displayedColumns = ['item', 'cost', 'actions'];
  appointment: Appointment | undefined;
  transactions: Part[] = [];
  procesos: Part[] = [];
  orderForm!: FormGroup;
  orden!: Order;
  car!: Car;
  escanear: boolean = false;
  verOrden: boolean = false;
  addPart: boolean = false;
  addProcess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppointmentServiceService,
    private carService: CarsService,
    private orderService: OrdersService,
    ) { }

  ngOnInit(): void {
    this.verOrden = false;
  }

  getCar(id: string){
    this.appService.getSpecificApp(id).subscribe( doc => {
      this.appointment = doc;
      this.carService.getCarById(doc.car).subscribe( doc => {
        this.car = doc;
      })
    })
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  getTotalProcessCost() {
    if(this.procesos == undefined || this.procesos.length < 1){
      return 0;
    }
    return this.procesos.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  newPart(){
    this.addPart = !this.addPart;
  }

  newProcess(){
    this.addProcess = !this.addProcess;
  }

  reLoadPartsList(){
    this.addPart = !this.addPart;
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.transactions = this.orden.parts;
    })
  }

  reLoadProcessList(){
    this.addProcess = !this.addProcess;
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.procesos = this.orden.processes;
    })
  }

  onEdit(row){
    const index = this.transactions.indexOf(row, 0);
    if(index > -1){
      this.transactions.splice(index,1);
      const parts = {parts: this.transactions};
      this.orderService.updateOrder(parts, this.appointment?.appId, this.orden.refId);
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.transactions = this.orden.parts;
      })
    }
    alert("!se ha eliminado el repuesto con exito!")
  }

  onEditProcess(row){
    const index = this.procesos.indexOf(row, 0);
    if(index > -1){
      this.procesos.splice(index,1);
      const parts = {parts: this.procesos};
      this.orderService.updateOrder(parts, this.appointment?.appId, this.orden.refId);
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.procesos = this.orden.processes;
      })
    }
    alert("!se ha eliminado el procedimiento con exito!")
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      ownerName: '' ,
      mechanicName: '',
      managerName: '',
      diagnosis: '',
      partsNeeded: '',
      prices: '',
      processes: '',
      finalCost: '',
      date: "",
    });
  }
}

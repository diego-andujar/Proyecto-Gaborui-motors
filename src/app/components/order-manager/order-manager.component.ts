import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { Order } from 'src/app/models/order';
import { Part } from 'src/app/models/part';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { CarsService } from 'src/app/services/cars.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss']
})
export class OrderManagerComponent implements OnInit {

  displayedColumns = ['item', 'cost', 'actions'];
  appointment!: Appointment;
  transactions: Part[] = [];
  procesos: Part[] = [];
  orderForm!: FormGroup;
  @Input() event: string = "hola";
  @Input() app!: Appointment;
  orden!: Order;
  car!: Car;
  scannerEnabled: boolean = true;
  escanear: boolean = false;
  qrResultString: string | null = "";
  information: string = "No se ha detectado informacion de ningun codigo. Muestre un Qr para que sea escaneado"
  verOrden: boolean = false;
  addPart: boolean = false;
  addProcess: boolean = false;
  ordenCerrada: boolean = false;

  constructor(
    private datePipe : DatePipe,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private appService: AppointmentServiceService,
    private carService: CarsService,
    private orderService: OrdersService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.verOrden = false;
    this.onCodeResult(this.app.appId!);
    this.createForm();
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.transactions = [];
    this.qrResultString = resultString;
    this.getCar(resultString);
    this.orderService.getOrder(resultString).then( doc => {
        this.orden = doc[0];
        if (this.orden.parts != undefined){
          this.transactions = this.orden.parts;
        } if (this.orden.processes != undefined){
          this.procesos = this.orden.processes;
        }
        /*if (this.orden.endedRepair){
          this.ordenCerrada = true;
          alert("!Esta orden ya se cerro, solo el gerente puede editarla!")
          return;
        }*/
        this.verOrden = true;
        return;
      })

  }

  endOrder(){
    let today = new Date();
    let dateEnded = this.datePipe.transform(today, "dd-MM-yyyy");
    let status =  "cerrada";
    this.appService.endApp(this.appointment.appId, dateEnded!, status);
    this.orderService.getOrder(this.appointment.appId).then( doc => {
      this.orden = doc[0];
    });
    this.ordenCerrada = true;
    alert("La orden ha sido cerrada con exito\nSe ha enviado un correo al cliente con los datos de la factura")
  }

  public scanSuccessHandler($event: any){
    this.scannerEnabled = false;
    this.information = "Espera, recuperando informacion...";
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "no se ha detectado informacion"
  }

  getCar(id: string){
    this.appService.getSpecificApp(id).subscribe( doc => {
      this.appointment = doc as Appointment;
      this.carService.getCarById(this.appointment.car).subscribe( doc => {
        this.car = doc as Car;
      })
    })
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc! + value!, 0);
  }

  getTotalProcessCost() {
    if(this.procesos == undefined || this.procesos.length < 1){
      return 0;
    }
    return this.procesos.map(t => t.cost).reduce((acc, value) => acc! + value!, 0);
  }

  newPart(){
    this.addPart = !this.addPart;
  }

  newProcess(){
    this.addProcess = !this.addProcess;
  }

  reLoadPartsList(){
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.transactions = this.orden.parts!;
    })
  }

  reLoadProcessList(){
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.procesos = this.orden.processes!;
    })
  }

  async onEdit(row: any){
    const index = this.transactions.indexOf(row, 0);
    if(index > -1){
      this.transactions.splice(index,1);
      const parts = {parts: this.transactions};
      this.orderService.updateOrder(parts, this.appointment?.appId, this.orden.refId);
    }
    alert("!se ha eliminado el repuesto con exito!")
    await this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.transactions = this.orden.parts!;
    });
  }

  async onEditProcess(row: any){
    const index = this.procesos.indexOf(row, 0);
    if (index > -1){
      this.procesos.splice(index,1);
      console.log(this.procesos)
      const procc = {processes: this.procesos};
      this.orderService.updateOrder(procc, this.appointment?.appId, this.orden.refId);
    }
    alert("!se ha eliminado el procedimiento con exito!")
    await this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.procesos = this.orden.processes!;
    })
  }

  async onSubmitedPart(bool: boolean){
    if (bool){
      this.addPart = !this.addPart;
      await this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.transactions = this.orden.parts!;
      })
    } else {
      this.addProcess = !this.addProcess;
      await this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.procesos = this.orden.processes!;
      })
    }
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

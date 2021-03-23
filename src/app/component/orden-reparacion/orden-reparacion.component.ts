import { NewPartFormComponent } from './../../components/new-part-form/new-part-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment';
import { Car } from 'src/app/models/car';
import { Order } from './../../models/order';
import { OrdersService } from './../../services/orders.service';
import { CarsService } from 'src/app/services/cars.service';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Part } from 'src/app/models/part';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-orden-reparacion',
  templateUrl: './orden-reparacion.component.html',
  styleUrls: ['./orden-reparacion.component.scss']
})
export class OrdenReparacionComponent implements OnInit {

  displayedColumns = ['item', 'cost', 'actions'];
  appointment: Appointment | undefined;
  transactions: Part[] = [];
  procesos: Part[] = [];
  orderForm!: FormGroup;
  @Input() event: string = "hola";
  orden!: Order;
  car!: Car;
  scannerEnabled: boolean = true;
  escanear: boolean = false;
  qrResultString: string | null = "";
  information: string = "No se ha detectado informacion de ningun codigo. Muestre un Qr para que sea escaneado"
  verOrden: boolean = false;
  addPart: boolean = false;
  addProcess: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private appService: AppointmentServiceService,
    private carService: CarsService,
    private orderService: OrdersService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.verOrden = false;
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
      })
    this.verOrden = true;
    alert("!Se ha encontrado la orden!")
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
    let app: any;
    let carr: any;
    this.appService.getSpecificApp(id).subscribe( doc => {
      app =  doc;
      this.carService.getCarById(app?.car!).subscribe( doc => {
        carr = doc;
        this.car = carr;
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

  onEdit(row: Part){
    const index = this.transactions.indexOf(row, 0);
    if(index > -1){
      this.transactions.splice(index,1);
      const parts = {parts: this.transactions};
      this.orderService.updateOrder(parts, this.appointment?.appId, this.orden.refId);
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.transactions = this.orden.parts!;
      })
    }
    alert("!se ha eliminado el repuesto con exito!")
  }

  onEditProcess(row: Part){
    const index = this.procesos.indexOf(row, 0);
    if (index > -1){
      this.procesos.splice(index,1);
      console.log(this.procesos)
      const procc = {processes: this.procesos};
      this.orderService.updateOrder(procc, this.appointment?.appId, this.orden.refId);
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.procesos = this.orden.processes!;
      })
    }
    alert("!se ha eliminado el procedimiento con exito!")
  }

  async onSubmitedPart(bool: boolean){
    if (bool){
      console.log("hola")
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

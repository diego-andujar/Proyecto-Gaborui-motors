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
import firebase from "firebase";
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-orden-reparacion',
  templateUrl: './orden-reparacion.component.html',
  styleUrls: ['./orden-reparacion.component.scss']
})
export class OrdenReparacionComponent implements OnInit {
  username!:User;
  user!: firebase.User;
  userFire!: any;
  displayedColumns = ['item', 'cost', 'actions'];
  appointment!: Appointment;
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
  ordenCerrada: boolean = false;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private appService: AppointmentServiceService,
    private carService: CarsService,
    private orderService: OrdersService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })

    this.username=JSON.parse(localStorage.getItem("CurrentUser")!);
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    })
    this.userFire = JSON.parse(localStorage.getItem("CurrentUser")!);
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
        if (this.orden.endedRepair){
          this.ordenCerrada = true;
          alert("!Esta orden ya se cerro, solo el gerente puede editarla!")
          return;
        }
        this.verOrden = true;
        return;
      })

  }

  endOrder(){
    let data = {
      endedRepair: true
    }
    this.orderService.updateOrder(data, this.appointment.appId, this.orden.refId);
    this.orderService.getOrder(this.appointment.appId).then( doc => {
      this.orden = doc[0];
    });
    this.ordenCerrada = true;
    alert("La reparacion ha sido cerrada y la orden sera verificada por el gerente\nYa no se podra editar desde esta ventana")
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

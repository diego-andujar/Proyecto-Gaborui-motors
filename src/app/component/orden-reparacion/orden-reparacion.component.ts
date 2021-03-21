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

  displayedColumns = ['item', 'cost'];
  appointment: Appointment | undefined;
  transactions: Part[] = [];
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
    this.qrResultString = resultString;
    this.getCar(resultString);
    this.orderService.getOrder(resultString).then( doc => {
        this.orden = doc[0];
        this.transactions = this.orden.parts;
      })
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
      this.appointment = doc;
      this.carService.getCarById(doc.car).subscribe( doc => {
        this.car = doc;
      })
    })
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  newPart(){
    this.addPart = !this.addPart;
    this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.transactions = this.orden.parts;
    })
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

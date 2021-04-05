import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { element } from 'protractor';
import { CurrencyPipe, DatePipe } from '@angular/common';
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
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss'],
  providers: [CurrencyPipe],
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
  user!: User;
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
    private currencyPipe: CurrencyPipe,
    private datePipe : DatePipe,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private appService: AppointmentServiceService,
    private carService: CarsService,
    private orderService: OrdersService,
    private dialog: MatDialog,
    private userService: UsersService,
    ) { }

  ngOnInit(): void {
    this.userService.getUserId(this.app.userid!).subscribe( doc => {
      this.user = doc as User;
    })
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
    /*
    let today = new Date();
    let dateEnded = this.datePipe.transform(today, "dd-MM-yyyy");
    let status =  "cerrada";
    this.appService.endApp(this.appointment.appId, dateEnded!, status);
    this.orderService.getOrder(this.appointment.appId).then( doc => {
      this.orden = doc[0];
    });
    this.ordenCerrada = true;
    alert("La orden ha sido cerrada con exito\nSe ha enviado un correo al cliente con los datos de la factura")*/
    this.getParts();
  }

  async getParts(){
    let cost = 0;
    let parts = "";
    let partsCost = "";
    const partsList = this.orden.parts!;
    partsList.forEach((element, y) => {
      if (y == partsList.length - 1){
        let money: number = element.cost!;
        let moneys = money.toFixed(2);
        let item = this.toTitleCase(element.item!) 
        parts += item + " = $" + moneys + "\n"
        cost += element.cost!;
      } else {
        let money: number = element.cost!;
        let moneys = money.toFixed(2);
        let item = this.toTitleCase(element.item!) 
        parts += item + " = $" + moneys + "  +  \n"
        cost += element.cost!;
      }
      
    });
    partsCost += `\nTotal Repuestos = $${cost}\n`

    let costRepair = 0;
    let processes = "";
    let processesCost = "";
    const processlist = this.orden.processes!;
    processlist.forEach((element, x) => {
      if (x == processlist.length - 1){
        let money: number = element.cost!;
        let moneys = money.toFixed(2);
        let item = this.toTitleCase(element.item!) 
        processes += item + " = $" + moneys + "\n"
        cost += element.cost!;
        costRepair += element.cost!;
      } else {
        let money: number = element.cost!;
        let moneys = money.toFixed(2);
        let item = this.toTitleCase(element.item!) 
        processes += item + " = $" + moneys + "  +  \n"
        cost += element.cost!;
        costRepair += element.cost!;
      }
      
    });
    processesCost += `\nTotal Procesos = $${costRepair}\n`
    let total = `$${cost}\n`
    const values = {
      to_name: this.app.userName,
      message: parts,
      car: this.app.carInfo,
      to_email: this.user.email,
      repuestos: parts,
      total_repuestos: partsCost,
      procedimientos: processes,
      total_procedimientos: processesCost,
      total: total,
    }
    emailjs.send('gmail_service', 'orden_cerrada', values, 'user_fVTGTMmtshFdcHgTabhho')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Se ha enviado un correo al cliente \ncon los datos de la reparacion")
    }, function(error) {
        console.log('FAILED...', error);
    });
    
  }

  toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
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
      await this.orderService.updateOrder(parts, this.appointment?.appId, this.orden.refId);
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
      await this.orderService.updateOrder(procc, this.appointment?.appId, this.orden.refId);
    }
    alert("!se ha eliminado el procedimiento con exito!")
    await this.orderService.getOrder(this.appointment?.appId).then( doc => {
      this.orden = doc[0];
      this.procesos = this.orden.processes!;
    })
  }

  onSubmitedPart(bool: boolean){
    if (bool){
      this.addPart = !this.addPart;
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
        this.orden = doc[0];
        this.transactions = this.orden.parts!;
      })
    } else {
      this.addProcess = !this.addProcess;
      this.orderService.getOrder(this.appointment?.appId).then( doc => {
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

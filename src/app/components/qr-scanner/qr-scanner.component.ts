import { AppointmentServiceService } from 'src/app/services/appointment-service.service';
import { Appointment } from 'src/app/models/appointment';
import { CarsService } from 'src/app/services/cars.service';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  scannerEnabled: boolean = true;
  escanear: boolean = false;
  car!: any;
  appointment!: any;
  qrResultString: string | null = "";
  information: string = "No se ha detectado informacion de ningun codigo. Muestre un Qr para que sea escaneado"
  @Output() qrRead = new EventEmitter<string>();

  constructor(
    private cd: ChangeDetectorRef,
    private carService: CarsService,
    private appService: AppointmentServiceService,
  ) { }

  ngOnInit(): void {
  }


  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.getCar(resultString)
    this.qrRead.emit(resultString);
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
      this.carService.getCarById(doc.car).subscribe( doc => {
        this.car = doc;
      })
    })
  }

}

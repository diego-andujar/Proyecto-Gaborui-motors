import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  scannerEnabled: boolean = true;
  escanear: boolean = false;
  qrResultString: string | null = "";
  information: string = "No se ha detectado informacion de ningun codigo. Muestre un Qr para que sea escaneado"
  constructor(
    private cd: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
  }


  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  public scanSuccessHandler($event: any){
    this.scannerEnabled = false;
    this.information = "Espera, recuperando informacion...";

  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "no se ha detectado informacion"
  }
}

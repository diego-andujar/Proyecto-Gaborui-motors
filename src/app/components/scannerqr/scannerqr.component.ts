import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'app-scannerqr',
  templateUrl: './scannerqr.component.html',
  styleUrls: ['./scannerqr.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
 
  constructor( ) {  }
 
  // @ViewChild(QrScannerComponent, { static:false }) qrScannerComponent: QrScannerComponent ;

  ngOnInit() {
     
  }

  // ngAfterViewIniti(): void {
  //   this.qrScannerComponent.getMediaDevices().then(devices => {
  //     console.log(devices);
  //     const videoDevices: MediaDeviceInfo[] = [];
  //     for (const device of devices) {
  //         if (device.kind.toString() === 'videoinput') {
  //             videoDevices.push(device);
  //         }
  //     }
  //     if (videoDevices.length > 0){
  //         let choosenDev;
  //         for (const dev of videoDevices){
  //             if (dev.label.includes('front')){
  //                 choosenDev = dev;
  //                 break;
  //             }
  //         }
  //         if (choosenDev) {
  //             this.qrScannerComponent.chooseCamera.next(choosenDev);
  //         } else {
  //             this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
  //         }
  //     }
  // });

  // this.qrScannerComponent.capturedQr.subscribe(result => {
  //     console.log(result);
  // });
  // }
}

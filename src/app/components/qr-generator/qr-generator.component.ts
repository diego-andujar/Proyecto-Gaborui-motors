import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { QRCodeComponent } from 'angular2-qrcode';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit {

  @Input() element!: string;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  link!: string

  @ViewChild("qrcode", {static : true}) qrcode!: QRCodeComponent | any;

  constructor() { }

  ngOnInit(): void {
  }

  dlDataUrlBin(){
    this.link = this.qrcode.qrcElement.nativeElement.firstChild.src;
  }

}

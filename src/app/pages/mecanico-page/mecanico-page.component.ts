import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mecanico-page',
  templateUrl: './mecanico-page.component.html',
  styleUrls: ['./mecanico-page.component.scss']
})
export class MecanicoPageComponent implements OnInit {
  public myAngularxQrCode: string = "";
  constructor() {
   
    this.myAngularxQrCode = 'Jhoel Blanco en qr que loco';
   }

  ngOnInit(): void {
  }

}

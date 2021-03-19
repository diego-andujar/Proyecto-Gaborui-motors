import { Component, OnInit } from '@angular/core';
import { OrdenService } from './../../orden.service';
import { Orden } from './../../models/orden';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {
  ordenes!: Orden[];

  constructor(private orden: OrdenService) { }

  ngOnInit(): void {
    
  }

}

import { Car } from '../../models/car';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit {

  @Input() car = {} as Car;
  @Input() user!: User;
  @Input() userType!: string;
  verSolicitud = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  

}

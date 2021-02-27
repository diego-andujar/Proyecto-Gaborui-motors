import { Car } from '../../models/car';
import { Component, Input, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit(): void {
  }
  

}

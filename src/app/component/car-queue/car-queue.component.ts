import { Car } from './../../models/car';
import { CarsService } from './../../services/cars.service';
import { Car } from '../../models/car';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-car-queue',
  templateUrl: './car-queue.component.html',
  styleUrls: ['./car-queue.component.scss']
})
export class CarQueueComponent implements OnInit {

  lowValue: number = 0;
  highValue: number = 1;

  cars: Array<Car> = [];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  

  pageSize: number = 1;
  pageNumber: number = 1;
}

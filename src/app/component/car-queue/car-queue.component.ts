import { CarsService } from './../../services/cars.service';
import { Car } from '../../models/car';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-car-queue',
  templateUrl: './car-queue.component.html',
  styleUrls: ['./car-queue.component.scss']
})
export class CarQueueComponent implements OnInit {

  @Input() carList: Array<Car> = [];
  @Input() user!: User;
  userType!: string;
  lowValue: number = 0;
  highValue: number = 1;

  cars: Array<Car> = [];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    /*this.carsService.getUsCarsForManager(this.user.id!).then( doc => {
      this.carList = doc as Array<Car>;
    })*/
    this.cars = this.carsService.getAllCars();
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }
  

  pageSize: number = 1;
  pageNumber: number = 1;
}

import { CarsService } from 'src/app/services/cars.service';
import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manager-client-view',
  templateUrl: './manager-client-view.component.html',
  styleUrls: ['./manager-client-view.component.scss']
})
export class ManagerClientViewComponent implements OnInit {

  @Input() user!: User;
  carList: Array<Car> = [];
  userType = "manager";
  pageSize: number = 1;
  pageNumber: number = 1;
  lowValue: number = 0;
  highValue: number = 1;
  authForm!: FormGroup;
  verCarros = false;

  constructor(
    private carService: CarsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    /*this.carService.getUsCarsForManager(this.user.id!).then( doc => {
      console.log(doc)
      this.carList.push(doc as Car);
    })*/
    //this.getCars();
  }

  createForm(): void {
    this.authForm = this.fb.group({
      name: this.user.name,
      email: this.user.email,
      birthDate: this.user.birthDate,
      cedula: this.user.cedula,
      phone: this.user.phoneNumber,
      genero: this.user.genero,
      direccion: this.user.address,
      ciudad: this.user.city,
      estado: this.user.state,
      postal: this.user.postalCode,
    });
  }

  async getCars(){
    this.verCarros = true;
    await this.carService.getUsCars(this.user.id!).then( doc => {
      this.carList = doc;
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    return event;
  }

}

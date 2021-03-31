import { CarsService } from 'src/app/services/cars.service';
import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-manager-client-view',
  templateUrl: './manager-client-view.component.html',
  styleUrls: ['./manager-client-view.component.scss']
})
export class ManagerClientViewComponent implements OnInit {

  @Input() user!: User;
  carList!: Array<Car>;
  userType = "manager";
  constructor(
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.carService.getUsCarsForManager(this.user.id!).then( doc => {
      console.log(doc)
      this.carList = doc as Array<Car>;
    })
  }

}

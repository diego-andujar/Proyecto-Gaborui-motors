import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-reports-clients',
  templateUrl: './reports-clients.component.html',
  styleUrls: ['./reports-clients.component.scss']
})
export class ReportsClientsComponent implements OnInit {

  usuarios!: Array<User>;
  columnsToDisplay = ['name', 'date joined', 'email'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  expandedElement!: Appointment | null;
  selectedValue!: string;
  
  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.usuarios = this.userService.getClientUser();
    console.log(this.usuarios)
  }

  changeList(num: number){
    if (num === 0){
      this.usuarios = this.userService.getClientUser();
    } else if (num == 1) {
      this.usuarios = this.userService.getMechanicUser();
    }
  }

}

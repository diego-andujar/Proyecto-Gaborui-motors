import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-reports-clients',
  templateUrl: './reports-clients.component.html',
  styleUrls: ['./reports-clients.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportsClientsComponent implements OnInit {

  usuarios!: Array<User> | any;
  columnsToDisplay = ['name', 'date joined', 'email'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  expandedElement!: Appointment | null;
  selectedValue!: string;
  
  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    
    this.userService.getClientUserr().then( doc => {
      this.usuarios = doc;
    });
    console.log("hola")
  }

  async fillList(){
    await this.userService.getClientUserForManager().then( doc => {
      console.log(doc as Array<User>)
      this.usuarios = doc;
    })
  }

  changeList(num: number){
    if (num === 0){
      this.usuarios = this.userService.getClientUser();
    } else if (num == 1) {
      this.usuarios = this.userService.getMechanicUser();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-usuario-calendario',
  templateUrl: './usuario-calendario.component.html',
  styleUrls: ['./usuario-calendario.component.scss']
})
export class UsuarioCalendarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

}

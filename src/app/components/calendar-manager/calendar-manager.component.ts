import { Appointment } from './../../models/appointment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';

@Component({
  selector: 'app-calendar-manager',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.scss']
})
export class CalendarManagerComponent implements OnInit {



  calendarEl!: HTMLElement;
  calendar!: Calendar;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  eventsList!: Array<Appointment>;
  calendarOptions: CalendarOptions = {
    locales: [esLocale],
    timeZone: 'America/Venezuela',
    initialView: 'dayGridMonth',
    weekends: false, 
  };
  

  constructor(
    private appService: AppointmentServiceService,
  ) { 
  }

  ngOnInit(): void {
    this.calendarEl = document.getElementById('calendar')!;
    this.calendar = new Calendar(this.calendarEl, {
      locales: [esLocale],
      timeZone: 'America/Venezuela',
      initialView: 'dayGridMonth',
      weekends: false, 
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          duration: { days: 3 },
          buttonText: '3 day'
        }
      },
    });
    this.llenarLista();
    this.calendar.render()
  }

  transformDateForCalendar(date: string): string{
    const [day, month, year]: string[] = date.split('-');
    return`${year}-${month}-${day}`
  }

  llenarLista(){
    this.eventsList = [];
    this.appService.getEnEsperaApp().then( res => {
      this.eventsList.push(res as Appointment);
    })
    this.appService.getEnProcesoApp().then( doc => {
      this.eventsList.push(doc as Appointment);
    })
    this.appService.getTerminadaApp().then( list => {
      this.eventsList.push(list as Appointment);
    })
    this.llenarCalendario();
  }

  llenarCalendario(){
    this.eventsList.forEach(element => {
      const date = this.transformDateForCalendar(element.date!);
      this.calendar.addEvent({ // this object will be "parsed" into an Event Object
      title: element.carInfo, // a property!
      start: date, // a property!
    })
    });
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  /*toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }*/

}

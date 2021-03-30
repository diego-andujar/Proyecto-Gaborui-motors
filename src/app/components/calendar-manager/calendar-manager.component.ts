import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-manager',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.scss']
})
export class CalendarManagerComponent implements OnInit {




  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  eventsList!: [
    { title: 'event 1', date: '2021-03-30' },
    { title: 'event 2', date: '2021-03-31' }
  ]
  
  calendarOptions: CalendarOptions = {
    locales: [esLocale],
    timeZone: 'America/Venezuela',
    initialView: 'dayGridMonth',
    weekends: false, 
  };
  

  constructor() { 
  }

  ngOnInit(): void {
    let calendarEl: HTMLElement = document.getElementById('calendar')!;

   let calendar = new Calendar(calendarEl, {
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

    calendar.addEvent({ // this object will be "parsed" into an Event Object
      title: 'The Title', // a property!
      start: '2021-03-29', // a property!
    })
    calendar.render()
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  /*toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }*/

}

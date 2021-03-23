import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mechanics-page',
  templateUrl: './mechanics-page.component.html',
  styleUrls: ['./mechanics-page.component.scss']
})
export class MechanicsPageComponent implements OnInit {

  public clickedEvent: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  childEventClicked(event: string){
    this.clickedEvent = event;
  }

}

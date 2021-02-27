import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

}

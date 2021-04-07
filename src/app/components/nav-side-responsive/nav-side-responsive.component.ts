import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-side-responsive',
  templateUrl: './nav-side-responsive.component.html',
  styleUrls: ['./nav-side-responsive.component.scss']
})
export class NavSideResponsiveComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  
  constructor() { }
  ngOnInit() {
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}

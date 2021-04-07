import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-responsive',
  templateUrl: './navbar-responsive.component.html',
  styleUrls: ['./navbar-responsive.component.scss']
})
export class NavbarResponsiveComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

}

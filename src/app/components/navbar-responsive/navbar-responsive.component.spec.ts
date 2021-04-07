import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarResponsiveComponent } from './navbar-responsive.component';

describe('NavbarResponsiveComponent', () => {
  let component: NavbarResponsiveComponent;
  let fixture: ComponentFixture<NavbarResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarResponsiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

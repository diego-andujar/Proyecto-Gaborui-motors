import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSideResponsiveComponent } from './nav-side-responsive.component';

describe('NavSideResponsiveComponent', () => {
  let component: NavSideResponsiveComponent;
  let fixture: ComponentFixture<NavSideResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSideResponsiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSideResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

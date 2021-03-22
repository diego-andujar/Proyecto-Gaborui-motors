import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDinamicComponent } from './appointment-dinamic.component';

describe('AppointmentDinamicComponent', () => {
  let component: AppointmentDinamicComponent;
  let fixture: ComponentFixture<AppointmentDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDinamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

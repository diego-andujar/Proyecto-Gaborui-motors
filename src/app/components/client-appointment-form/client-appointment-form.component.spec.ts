import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentFormComponent } from './client-appointment-form.component';

describe('ClientAppointmentFormComponent', () => {
  let component: ClientAppointmentFormComponent;
  let fixture: ComponentFixture<ClientAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAppointmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

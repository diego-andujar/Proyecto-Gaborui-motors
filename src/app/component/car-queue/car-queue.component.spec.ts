import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarQueueComponent } from './car-queue.component';

describe('CarQueueComponent', () => {
  let component: CarQueueComponent;
  let fixture: ComponentFixture<CarQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

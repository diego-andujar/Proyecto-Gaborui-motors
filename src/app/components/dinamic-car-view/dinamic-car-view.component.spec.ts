import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicCarViewComponent } from './dinamic-car-view.component';

describe('DinamicCarViewComponent', () => {
  let component: DinamicCarViewComponent;
  let fixture: ComponentFixture<DinamicCarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamicCarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicCarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

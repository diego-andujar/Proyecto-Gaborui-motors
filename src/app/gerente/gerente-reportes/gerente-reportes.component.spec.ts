import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteReportesComponent } from './gerente-reportes.component';

describe('GerenteReportesComponent', () => {
  let component: GerenteReportesComponent;
  let fixture: ComponentFixture<GerenteReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

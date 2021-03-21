import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteStatusComponent } from './gerente-status.component';

describe('GerenteStatusComponent', () => {
  let component: GerenteStatusComponent;
  let fixture: ComponentFixture<GerenteStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGnrlManagerComponent } from './vista-gnrl-manager.component';

describe('VistaGnrlManagerComponent', () => {
  let component: VistaGnrlManagerComponent;
  let fixture: ComponentFixture<VistaGnrlManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaGnrlManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaGnrlManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

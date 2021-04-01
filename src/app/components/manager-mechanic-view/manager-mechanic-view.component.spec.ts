import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMechanicViewComponent } from './manager-mechanic-view.component';

describe('ManagerMechanicViewComponent', () => {
  let component: ManagerMechanicViewComponent;
  let fixture: ComponentFixture<ManagerMechanicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerMechanicViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMechanicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

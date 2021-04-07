import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMechanicComponent } from './select-mechanic.component';

describe('SelectMechanicComponent', () => {
  let component: SelectMechanicComponent;
  let fixture: ComponentFixture<SelectMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMechanicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

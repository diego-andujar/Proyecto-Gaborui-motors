import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicsPageComponent } from './mechanics-page.component';

describe('MechanicsPageComponent', () => {
  let component: MechanicsPageComponent;
  let fixture: ComponentFixture<MechanicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

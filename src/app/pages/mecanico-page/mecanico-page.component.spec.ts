import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoPageComponent } from './mecanico-page.component';

describe('MecanicoPageComponent', () => {
  let component: MecanicoPageComponent;
  let fixture: ComponentFixture<MecanicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

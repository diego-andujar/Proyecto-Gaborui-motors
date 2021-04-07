import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicCarImagesComponent } from './mechanic-car-images.component';

describe('MechanicCarImagesComponent', () => {
  let component: MechanicCarImagesComponent;
  let fixture: ComponentFixture<MechanicCarImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicCarImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicCarImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

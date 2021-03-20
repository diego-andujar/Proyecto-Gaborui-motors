import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerygridComponent } from './gallerygrid.component';

describe('GallerygridComponent', () => {
  let component: GallerygridComponent;
  let fixture: ComponentFixture<GallerygridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerygridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

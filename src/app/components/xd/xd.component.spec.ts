import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XdComponent } from './xd.component';

describe('XdComponent', () => {
  let component: XdComponent;
  let fixture: ComponentFixture<XdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

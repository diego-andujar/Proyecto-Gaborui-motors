import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClientViewComponent } from './manager-client-view.component';

describe('ManagerClientViewComponent', () => {
  let component: ManagerClientViewComponent;
  let fixture: ComponentFixture<ManagerClientViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerClientViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

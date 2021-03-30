import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameBarComponent } from './username-bar.component';

describe('UsernameBarComponent', () => {
  let component: UsernameBarComponent;
  let fixture: ComponentFixture<UsernameBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

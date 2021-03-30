import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartFormComponent } from './new-part-form.component';

describe('NewPartFormComponent', () => {
  let component: NewPartFormComponent;
  let fixture: ComponentFixture<NewPartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPartFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrompCompComponent } from './promp-comp.component';

describe('PrompCompComponent', () => {
  let component: PrompCompComponent;
  let fixture: ComponentFixture<PrompCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrompCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrompCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameGerenteComponent } from './username-gerente.component';

describe('UsernameGerenteComponent', () => {
  let component: UsernameGerenteComponent;
  let fixture: ComponentFixture<UsernameGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameGerenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

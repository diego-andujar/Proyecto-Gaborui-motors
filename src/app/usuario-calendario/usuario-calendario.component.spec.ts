import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCalendarioComponent } from './usuario-calendario.component';

describe('UsuarioCalendarioComponent', () => {
  let component: UsuarioCalendarioComponent;
  let fixture: ComponentFixture<UsuarioCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

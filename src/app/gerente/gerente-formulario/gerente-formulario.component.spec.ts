import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteFormularioComponent } from './gerente-formulario.component';

describe('GerenteFormularioComponent', () => {
  let component: GerenteFormularioComponent;
  let fixture: ComponentFixture<GerenteFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

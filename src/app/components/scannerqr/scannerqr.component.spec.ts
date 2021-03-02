import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerqrComponent } from './scannerqr.component';

describe('ScannerqrComponent', () => {
  let component: ScannerqrComponent;
  let fixture: ComponentFixture<ScannerqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

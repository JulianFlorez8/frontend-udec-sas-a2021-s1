import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegacionLateralComponent } from './barra-navegacion-lateral.component';

describe('BarraNavegacionLateralComponent', () => {
  let component: BarraNavegacionLateralComponent;
  let fixture: ComponentFixture<BarraNavegacionLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraNavegacionLateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNavegacionLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

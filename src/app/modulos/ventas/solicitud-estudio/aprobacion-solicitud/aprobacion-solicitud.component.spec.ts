import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionSolicitudComponent } from './aprobacion-solicitud.component';

describe('AprobacionSolicitudComponent', () => {
  let component: AprobacionSolicitudComponent;
  let fixture: ComponentFixture<AprobacionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

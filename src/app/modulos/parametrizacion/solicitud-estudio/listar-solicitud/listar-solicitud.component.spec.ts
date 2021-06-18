import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudComponent } from './listar-solicitud.component';

describe('ListarSolicitudComponent', () => {
  let component: ListarSolicitudComponent;
  let fixture: ComponentFixture<ListarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

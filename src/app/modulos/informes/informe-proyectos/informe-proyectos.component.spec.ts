import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeProyectosComponent } from './informe-proyectos.component';

describe('InformeProyectosComponent', () => {
  let component: InformeProyectosComponent;
  let fixture: ComponentFixture<InformeProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

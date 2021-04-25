import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePagosComponent } from './informe-pagos.component';

describe('InformePagosComponent', () => {
  let component: InformePagosComponent;
  let fixture: ComponentFixture<InformePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformePagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

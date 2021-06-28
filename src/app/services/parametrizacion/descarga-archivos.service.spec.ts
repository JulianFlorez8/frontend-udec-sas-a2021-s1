import { TestBed } from '@angular/core/testing';

import { DescargaArchivosService } from './descarga-archivos.service';

describe('DescargaArchivosService', () => {
  let service: DescargaArchivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargaArchivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

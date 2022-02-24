import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ViaCepResponse } from './check-cep.models';
import { CheckCepService } from './check-cep.service';

describe('CheckCepService', () => {
  let service: CheckCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CheckCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return cep details', (done) => {
    const CEP: ViaCepResponse = {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '1004',
    };

    service.getCep(CEP.cep).subscribe((cep) => {
      expect(cep).toEqual(CEP);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${CEP.cep}${service.JSON_EXTENSION}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(CEP);
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepResponse } from './check-cep.models';

@Injectable({
  providedIn: 'root',
})
export class CheckCepService {
  readonly BASE_URL = 'https://viacep.com.br/ws/';
  readonly JSON_EXTENSION = '/json';
  constructor(private httpClient: HttpClient) {}

  getCep(cep: string) {
    return this.httpClient.get<ViaCepResponse>(
      `${this.BASE_URL}${cep}${this.JSON_EXTENSION}`
    );
  }
}

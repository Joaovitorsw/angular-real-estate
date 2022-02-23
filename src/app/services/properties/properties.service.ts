import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  readonly BASE_URL = 'http://localhost:3000';
  readonly PROPERTIES_ENDPOINT = '/api/v1/properties-types';
  readonly DISTRICT_ENDPOINT = '/api/v1/districts';
  readonly LOCATIONS_ENDPOINT = '/api/v1/locations';
  constructor(private http: HttpClient) {}

  getTypesProperties(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.BASE_URL}${this.PROPERTIES_ENDPOINT}`
    );
  }

  getDistricts() {
    return this.http.get<string[]>(`${this.BASE_URL}${this.DISTRICT_ENDPOINT}`);
  }

  getLocations() {
    return this.http.get<string[]>(
      `${this.BASE_URL}${this.LOCATIONS_ENDPOINT}`
    );
  }
}

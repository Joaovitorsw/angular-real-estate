import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property, PropertyResponse } from 'app';
import { Observable } from 'rxjs';
import {
  ParcialPropertiesQueryParams,
  PropertiesQueryParams,
} from './properties.models';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  readonly BASE_URL = 'http://localhost:3000';
  readonly PROPERTIES_TYPES_ENDPOINT = '/api/v1/properties-types';
  readonly DISTRICT_ENDPOINT = '/api/v1/districts';
  readonly LOCATIONS_ENDPOINT = '/api/v1/locations';
  readonly PROPERTY_END_POINT = '/api/v1/properties';
  constructor(private http: HttpClient) {}

  getTypesProperties(
    queryParams?: ParcialPropertiesQueryParams
  ): Observable<string[]> {
    const QUERY_STRING = this.getQueryString(queryParams ?? {});

    return this.http.get<string[]>(
      `${this.BASE_URL}${this.PROPERTIES_TYPES_ENDPOINT}?${QUERY_STRING}`
    );
  }

  getDistricts(queryParams?: ParcialPropertiesQueryParams) {
    const QUERY_STRING = this.getQueryString(queryParams ?? {});
    return this.http.get<string[]>(
      `${this.BASE_URL}${this.DISTRICT_ENDPOINT}?${QUERY_STRING}`
    );
  }

  getLocations(queryParams?: ParcialPropertiesQueryParams) {
    const QUERY_STRING = this.getQueryString(queryParams ?? {});
    return this.http.get<string[]>(
      `${this.BASE_URL}${this.LOCATIONS_ENDPOINT}?${QUERY_STRING}`
    );
  }

  getProperties(queryParams: PropertiesQueryParams) {
    const QUERY_STRING = this.getQueryString(queryParams);

    return this.http.get<Property[]>(
      `${this.BASE_URL}${this.PROPERTY_END_POINT}?${QUERY_STRING}`
    );
  }

  postProperty(property: PropertyResponse) {
    return this.http.post<PropertyResponse>(
      `${this.BASE_URL}${this.PROPERTY_END_POINT}`,
      property
    );
  }

  deleteProperty(id: string | number) {
    return this.http.delete<Property[]>(
      `${this.BASE_URL}${this.PROPERTY_END_POINT}/${id}`
    );
  }

  getQueryString(queryParams: { [key: string]: any }) {
    const queryEntries = Object.entries(queryParams);
    const filtredQuery = queryEntries.filter(([key, value]) => !!value);
    return filtredQuery
      .map(([key, value]) => {
        if (value === 'null') return '';
        return `${key}=${value}`;
      })
      .join('&');
  }
}

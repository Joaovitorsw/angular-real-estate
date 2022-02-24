import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Property, PropertyResponse } from 'app';
import {
  SALE_DISTRICTS,
  SALE_LOCATIONS,
  SALE_PROPERTIES_TYPES,
} from 'app/mocks/properties-service/requests.mock';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PropertiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return properties types', (done) => {
    const kindService = 'sale';
    service.getTypesProperties({ kindService }).subscribe((types) => {
      expect(types).toEqual(SALE_PROPERTIES_TYPES);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.PROPERTIES_TYPES_ENDPOINT}?kindService=${kindService}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(SALE_PROPERTIES_TYPES);
  });

  it('should return properties districts', (done) => {
    const kindService = 'sale';
    service.getDistricts({ kindService }).subscribe((districts) => {
      expect(districts).toEqual(SALE_DISTRICTS);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.DISTRICT_ENDPOINT}?kindService=${kindService}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(SALE_DISTRICTS);
  });

  it('should return properties locations', (done) => {
    const kindService = 'sale';
    service.getLocations({ kindService }).subscribe((locations) => {
      expect(locations).toEqual(SALE_LOCATIONS);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.LOCATIONS_ENDPOINT}?kindService=${kindService}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(SALE_LOCATIONS);
  });

  it('should return properties', (done) => {
    const queryParams = {
      kindService: 'sale' as 'sale',
      propertyType: 'apartment',
      district: 'centro',
      location: 'centro',
    };

    const expectedProperties = [
      {
        id: 1,
        title: 'Apartamento',
        description: 'Apartamento com 3 quartos',
        price: 'R$ 1.000,00',
        type: 'apartment',
        district: 'centro',
        location: 'centro',
      },
      {
        id: 2,
        title: 'Apartamento',
        description: 'Apartamento com 3 quartos',
        price: 'R$ 1.000,00',
        type: 'apartment',
        district: 'centro',
        location: 'centro',
      },
    ] as any as Property[];

    service.getProperties(queryParams).subscribe((properties) => {
      expect(properties).toEqual(expectedProperties);
      done();
    });

    const QUERY_STRING = service.getQueryString(queryParams);

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.PROPERTY_END_POINT}?${QUERY_STRING}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedProperties);
  });

  it('should post new property', (done) => {
    const expectedProperty: PropertyResponse = {
      id: 1,
      area: 100,
      bedrooms: 3,
      bathrooms: 2,
      condominium: 200,
      dateAnnouncement: '2020-01-01',
      furnished: true,
      name: 'Apartamento Campo Verde',
      owner: {
        name: 'João',
      },
      rent: false,
      sale: true,
      type: 'apartment',
      value: 1000,
      ownerId: 1,
      address: {
        district: 'centro',
        number: '1',
        street: 'rua',
      },
    };

    service.postProperty(expectedProperty).subscribe((property) => {
      expect(property).toEqual(expectedProperty);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.PROPERTY_END_POINT}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(expectedProperty);
  });

  it('should return query string', () => {
    const queryParams = {
      kindService: 'sale',
      propertyType: 'apartment',
      district: 'centro',
      location: 'centro',
    };

    const QUERY_STRING = service.getQueryString(queryParams);

    expect(QUERY_STRING).toBe(
      `kindService=sale&propertyType=apartment&district=centro&location=centro`
    );
  });
});

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Property } from 'app';
import { PropertiesService } from 'app/services/properties/properties.service';
import {
  BehaviorSubject,
  debounceTime,
  Observable,
  ReplaySubject,
  tap,
} from 'rxjs';

@Component({
  templateUrl: './view-properties.page.html',
  styleUrls: ['./view-properties.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPropertiesPage {
  kindService: 'sale' | 'rent';
  minPrices$ = new ReplaySubject<number[]>(1);
  maxPrices$ = new ReplaySubject<number[]>(1);
  propertiesTypes$: Observable<string[]>;
  districts$: Observable<string[]>;
  locationOptions$ = new ReplaySubject<string[]>(1);
  bedroomsOptions$ = new ReplaySubject<number[]>(1);
  properties$: BehaviorSubject<Property[]>;
  filtersGroup: FormGroup;
  bathroomsOptions$ = new ReplaySubject<number[]>(1);
  minArea$ = new ReplaySubject<number[]>(1);
  maxArea$ = new ReplaySubject<number[]>(1);
  constructor(
    public propertiesService: PropertiesService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.kindService = this.route.url.match(/rent|sale/)![0] as 'sale' | 'rent';

    this.activeRoute.queryParams.subscribe((params) => {
      this.propertiesTypes$ = this.propertiesService.getTypesProperties({
        kindService: this.kindService,
      });
      const queryParamsObject = {
        kindService: this.kindService,
        ...params,
      };

      this.propertiesService
        .getProperties(queryParamsObject)
        .pipe(
          tap((propertiesFiltered) => {
            const prices = this.mapAndSort(propertiesFiltered, 'value');

            this.minPrices$.next(prices);
            this.maxPrices$.next(prices);

            const address = propertiesFiltered.map(
              (property) => property.address
            );

            const bedRooms = this.mapAndSort(propertiesFiltered, 'bedrooms');

            const districts = address.map((address) => address.district);

            this.locationOptions$.next(districts);
            this.bedroomsOptions$.next(bedRooms);

            const bathrooms = this.mapAndSort(propertiesFiltered, 'bathrooms');

            const area = this.mapAndSort(propertiesFiltered, 'area');

            this.maxArea$.next(area);
            this.minArea$.next(area);

            this.bathroomsOptions$.next(bathrooms);
            this.properties$ = new BehaviorSubject(propertiesFiltered);
          })
        )
        .subscribe();
    });

    this.createFiltersGroup();
  }

  createFiltersGroup() {
    this.filtersGroup = new FormGroup({
      propertyType: new FormControl(null),
      location: new FormControl(null),
      minPrice: new FormControl(null),
      maxPrice: new FormControl(null),
      bedrooms: new FormControl(null),
      bathrooms: new FormControl(null),
      minArea: new FormControl(null),
      maxArea: new FormControl(null),
    });

    this.filtersGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        ({
          propertyType,
          location,
          minPrice,
          maxPrice,
          bedrooms,
          bathrooms,
          minArea,
          maxArea,
        }) => {
          this.propertiesService
            .getProperties({
              kindService: this.kindService,
              propertyType,
              location,
              minPrice,
              maxPrice,
              bedrooms,
              bathrooms,
              minArea,
              maxArea,
            })
            .subscribe((properties) => {
              const address = properties.map((property) => property.address);

              const districtsOptions = address.map(
                (address) => address.district
              );

              const streetOptions = address.map(
                (address) => address.street + ' ' + address.number
              );
              const hasDistrict = this.someIncludeValues(
                districtsOptions,
                location
              );
              const hasStreet = this.someIncludeValues(streetOptions, location);

              if (hasStreet) {
                this.locationOptions$.next(streetOptions);
              }

              if (hasDistrict) {
                this.locationOptions$.next(districtsOptions);
              }

              this.locationOptions$.next([
                ...districtsOptions,
                ...streetOptions,
              ]);

              const maxPriceOptions = this.mapAndSort(properties, 'value');

              this.maxPrices$.next(maxPriceOptions);

              const minPriceOptions = this.mapAndSort(properties, 'value');
              this.minPrices$.next(minPriceOptions);

              const bedroomsOptions = this.mapAndSort(properties, 'bedrooms');

              this.bedroomsOptions$.next(bedroomsOptions);

              const bathroomsOptions = this.mapAndSort(properties, 'bathrooms');

              this.bathroomsOptions$.next(bathroomsOptions);

              const minAreaOptions = this.mapAndSort(properties, 'area');

              this.minArea$.next(minAreaOptions);

              const maxAreaOptions = this.mapAndSort(properties, 'area');

              this.maxArea$.next(maxAreaOptions);

              this.properties$.next(properties);
            });
        }
      );
  }

  someIncludeValues(array: string[], includeValues: string) {
    return array.some((value) => value.includes(includeValues));
  }

  mapAndSort(properties: Property[], propertyKey: string): any[] {
    const mapped = properties
      .map((property) => property[propertyKey])
      .sort(this.sortNumbers);

    return [...new Set(mapped)];
  }

  sortNumbers(firstNumber: number, secondNumber: number) {
    return firstNumber - secondNumber;
  }

  updateProperty(property: Property) {
    this.propertiesService.deleteProperty(property.id).subscribe((response) => {
      this.properties$.next(response);
      this.toast.success(
        `My congratulations you just ${this.kindService} a ${property.type}`
      );
    });
  }
}

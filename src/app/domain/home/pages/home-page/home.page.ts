import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParcialPropertiesQueryParams } from 'app/services/properties/properties.models';
import { PropertiesService } from 'app/services/properties/properties.service';
import { combineLatest, ReplaySubject } from 'rxjs';
@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor(
    private propertiesService: PropertiesService,
    private route: Router
  ) {}
  searchGroup: FormGroup;
  propertiesTypesOptions$ = new ReplaySubject<any>(1);
  districtsOptions$ = new ReplaySubject<any>(1);
  locationOptions$ = new ReplaySubject<any>(1);

  ngOnInit(): void {
    this.createSearchGroup();
  }

  createSearchGroup() {
    this.searchGroup = new FormGroup({
      type: new FormControl('', Validators.required),
      propertyType: new FormControl(''),
      district: new FormControl(''),
      location: new FormControl(''),
    });

    const updateOptions = (queryParams: ParcialPropertiesQueryParams) => {
      const properties$ =
        this.propertiesService.getTypesProperties(queryParams);

      const districts$ = this.propertiesService.getDistricts(queryParams);

      const locations$ = this.propertiesService.getLocations(queryParams);

      const options = combineLatest([properties$, districts$, locations$]);

      options.subscribe(([properties, districts, locations]) => {
        this.propertiesTypesOptions$.next(properties);
        this.districtsOptions$.next(districts);
        this.locationOptions$.next(locations);
      });
    };

    this.searchGroup.controls['type'].valueChanges.subscribe((type) => {
      if (type) updateOptions({ kindService: type });
    });

    this.searchGroup.valueChanges.subscribe(
      ({ type, propertyType, district, location }) => {
        if (propertyType || district || location) {
          updateOptions({
            kindService: type,
            ...(propertyType && { propertyType }),
            ...(district && { district }),
            ...(location && { location }),
          });
        }
      }
    );
  }

  submitForm() {
    if (this.searchGroup.invalid) return;
    const { type, propertyType, district, location } = this.searchGroup.value;

    this.route.navigate([`/${type}`], {
      queryParams: {
        ...(propertyType && { propertyType }),
        ...(district && { district }),
        ...(location && { location }),
      },
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PropertiesService } from 'app/services/properties/properties.service';
@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(public propertiesService: PropertiesService) {}
  propertiesTypes$ = this.propertiesService.getTypesProperties();
  districts$ = this.propertiesService.getDistricts();
  locations$ = this.propertiesService.getLocations();
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Immobile } from '..';
import MOCK_DATA from '../../../../database/MOCK_DATA.json';
@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  MOCK_DATA = MOCK_DATA;
  LOCATIONS = [
    ...new Set(MOCK_DATA.map((immobile: Immobile) => immobile.address.city)),
  ];
  DISTRICTS = [
    ...new Set(
      MOCK_DATA.map((immobile: Immobile) => immobile.address.district)
    ),
  ];
  BEDROOMS = [
    ...new Set(MOCK_DATA.map((immobile: Immobile) => immobile.bedrooms)),
  ];
  VALUES = [
    ...new Set(MOCK_DATA.map((immobile: Immobile) => immobile.value)),
  ].sort((a, b) => a - b);

  propertiesTypes = [
    'Apartment',
    'Home',
    'Triplex house',
    'Duplex house',
    'Family Farm',
  ];

  constructor() {}

  ngOnInit(): void {}
}

import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { PROPERTY } from 'app/mocks/properties-service/property.mock';
import { ViewPropertiesDomainModule } from '../../view-properties.domain.module';
import { PropertyCardComponent } from './property-card.component';

describe('PropertyCardComponent', () => {
  it('should render property card', async () => {
    await render(PropertyCardComponent, {
      imports: [ViewPropertiesDomainModule],
      componentProperties: {
        property: PROPERTY,
      },
    });

    const $propertyImage =
      screen.getByTestId<HTMLImageElement>('property-image');

    expect($propertyImage.src).toEqual(PROPERTY.image!);
    const $propertyName = screen.getByTestId<HTMLTitleElement>('property-name');

    expect($propertyName.innerText).toEqual(PROPERTY.name);

    const $propertyAddress =
      screen.getByTestId<HTMLTitleElement>('property-address');

    const addressExpected = 'location_on 98756 Donald Lane 505 - Utah, Newark';

    expect($propertyAddress.textContent?.trim()).toEqual(addressExpected);

    const $propertyArea =
      screen.getByTestId<HTMLParagraphElement>('property-area');
    const expectedArea = 'crop_din553 m² of area';

    expect($propertyArea.textContent?.trim()).toEqual(expectedArea);

    const $propertyValue =
      screen.getByTestId<HTMLParagraphElement>('property-value');

    const expectedValue = 'attach_money $6,828,606.00';

    expect($propertyValue.textContent?.trim()).toEqual(expectedValue);

    const $propertyCondominium = screen.getByTestId<HTMLParagraphElement>(
      'property-condominium'
    );

    const expectedCondominium = 'payments Condominium : 641.23';

    expect($propertyCondominium.textContent?.trim()).toEqual(
      expectedCondominium
    );

    const $propertyBedrooms =
        screen.getByTestId<HTMLParagraphElement>('property-bedrooms'),
      expectedBedrooms = 'single_bed11 bedrooms';

    expect($propertyBedrooms.textContent?.trim()).toEqual(expectedBedrooms);

    const $propertyBathrooms =
        screen.getByTestId<HTMLParagraphElement>('property-bathrooms'),
      expectedBathrooms = 'bathroom 2 bathrooms';

    expect($propertyBathrooms.textContent?.trim()).toEqual(expectedBathrooms);

    const $propertyFurnished =
        screen.getByTestId<HTMLParagraphElement>('property-furnished'),
      expectedFurnished = 'living Furnished : No';

    expect($propertyFurnished.textContent?.trim()).toEqual(expectedFurnished);

    const $propertyAnnounced =
      screen.getByTestId<HTMLParagraphElement>('property-announced');

    const expectedAnnounced = 'announcementAnnounced By : Cletis';

    expect($propertyAnnounced.textContent?.trim()).toEqual(expectedAnnounced);

    const $propertyDate =
        screen.getByTestId<HTMLParagraphElement>('property-date'),
      expectedDate = 'todayDate Announcement : Aug 19, 2021';

    expect($propertyDate.textContent?.trim()).toEqual(expectedDate);
  });
});

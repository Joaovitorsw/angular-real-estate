export class PropertyPredicateBuilder {
  private static readonly PREDICATES = {
    kindService: (property, kind) => property[kind],
    propertyType: (property, type) => property.type === type,
    minPrice: (property, min) => property.value >= +min,
    maxPrice: (property, max) => property.value <= +max,
    minArea: (property, min) => property.area >= +min,
    maxArea: (property, max) => property.area <= +max,
    bedrooms: (property, bedrooms) => property.bedrooms === +bedrooms,
    bathrooms: (property, bathrooms) => property.bathrooms === +bathrooms,
    district: (property, district) => property.address.district === district,
    location: (property, location) =>
      property.address.city === location ||
      property.address.street + ' ' + property.address.number === location ||
      property.address.district === location,
  };

  static build(query) {
    const queryEntries = Object.entries(query);

    return queryEntries.map(([key, value]) => {
      const predicate = this.PREDICATES[key];
      return (property) => predicate(property, value);
    });
  }
}

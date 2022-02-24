export interface PropertiesQueryParams {
  kindService: 'sale' | 'rent';
  propertyType?: string;
  location?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
}

export interface ParcialPropertiesQueryParams {
  kindService: string;
  propertyType?: string;
  district?: string;
  location?: string;
}

import PROPERTIES from '../database/properties.json';

export interface Property extends Record<string, any> {
  id: number;
  type: string;
  address: Address;
  rent: boolean;
  sale: boolean;
  name: string;
  value: number;
  condominium: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  area: number;
  dateAnnouncement: string;
  image?: string;
  ownerId: number;
  owner: Owner;
}

export interface PropertyResponse {
  id?: number;
  type: string;
  address: Partial<Address>;
  rent: boolean;
  sale: boolean;
  name: string;
  value: number;
  condominium: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  area: number;
  dateAnnouncement: string;
  image?: string;
  ownerId?: number;
  owner: Partial<Owner>;
}
export interface Address {
  street: string;
  addressID: number;
  number: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
}
export interface Owner {
  name: string;
  ownerId: number;
  immobileId: number;
}

export class PropertyValidation {
  static validate(property: Property): Property | PropertyNotFoundError {
    if (!property.address || !property) return new PropertyNotFoundError();
    property.id = PROPERTIES[PROPERTIES.length - 1].id + 1;
    property.address.addressID =
      PROPERTIES[PROPERTIES.length - 1].address.addressID + 1;
    property.ownerId = PROPERTIES[PROPERTIES.length - 1].ownerId + 1;
    property.owner.immobileId =
      PROPERTIES[PROPERTIES.length - 1].owner.immobileId + 1;
    property.owner.ownerId =
      PROPERTIES[PROPERTIES.length - 1].owner.ownerId + 1;

    return property;
  }
}

export class PropertyNotFoundError extends Error {
  constructor() {
    super('The invalid property object. Please, try again.');
  }
}

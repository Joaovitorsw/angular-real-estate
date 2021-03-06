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

import { Property } from 'app';

export const PROPERTY: Property = {
  id: 1,
  type: 'Duplex house',
  address: {
    street: '98756 Donald Lane',
    addressID: 1,
    number: '505',
    district: 'Utah',
    city: 'Newark',
    state: 'NJ',
    postalCode: '30912800',
  },
  rent: true,
  sale: false,
  name: 'Duplex house for ren in 98756 Donald Lane',
  value: 6828606,
  condominium: 641.23,
  bedrooms: 11,
  bathrooms: 2,
  furnished: false,
  area: 553,
  dateAnnouncement: '2021-08-19T21:48:40Z',
  image:
    'https://images.unsplash.com/photo-1434025697302-54853b8da166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDQ3ODJ8MHwxfGNvbGxlY3Rpb258MXw4NzQwNzd8fHx8fDJ8fDE2NDU2NTA0MTI&ixlib=rb-1.2.1&q=80&w=1080',
  ownerId: 1,
  owner: { name: 'Cletis', ownerId: 1, immobileId: 1 },
};

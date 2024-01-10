export interface Accomodation {
  placeId: number;
  title: string,
  mainImage: string,
  address: Address,
  guestsAllowed: number,
  checkIn: any,
  checkOut: any,
  petsAllowed: boolean,
  parking: boolean,
  rooms: number,
  toilets: number,
  description: string,
  conveniences: Conveniences[],
  images: Image[]
  initialDate: Date;
  finalDate: Date;
  guests: number;
  cleaningFee: number,
  totalCleaningFee: number,
  dailyRate: number,
  totalDailyRate: number,
  quantityDaily: number;
  amount: number;
}

export interface Image {
  itemImage: string,
  alt: string,
}

export interface Login {
  username: string,
  password: string
}

export interface Address {
  street: string,
  number: number,
  complement: string,
  postalCode: string,
  city: string,
  uf: string,
  country: string
}

export interface Conveniences {
  id: number,
  name: string
}



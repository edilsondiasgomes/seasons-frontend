export interface Accommodation {
  id: number;
  title: string,
  mainImage: any,
  address: Address,
  guestsAllowed: number,
  checkIn: any,
  checkOut: any,
  petsAllowed: boolean,
  parking: boolean,
  rooms: number,
  toilets: number,
  description: string,
  conveniencesPlace: Conveniences[],
  files: any[],
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

export interface Login {
  username: string,
  password: string
}

export interface Address {
  street: string,
  number: number,
  complement: string,
  district: string,
  postalCode: string,
  city: string,
  uf: string,
  country: string
}

export interface Conveniences {
  id: number,
  name: string
}



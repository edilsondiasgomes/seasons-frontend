export interface Accommodation {
  id: number;
  title: string,
  mainImage: any,
  address: Address,
  guestsAllowed: number,
  checkIn: any,
  checkOut: any,
  rooms: number,
  toilets: number,
  description: string,
  conveniencesPlace: Convenience[],
  files: any[],
  initialDate: Date;
  finalDate: Date;
  cleaningFee: number,
  dailyRate: number,
}

export interface Reservation {
  accommodationId: number,
  initialDate: Date,
  finalDate: Date,
  guests: number,
  quantityDaily: number,
  totalDailyRate: number,
  totalCleaningFee: number
  amount: number
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

export interface Convenience {
  id: number,
  name: string
}

export interface Registration {
  name: string,
  cpf: string,
  birthday: Date,
  address: Address
}



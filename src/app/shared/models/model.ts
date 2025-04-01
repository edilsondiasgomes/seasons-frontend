export interface Accommodation {
  id: number;
  title: string,
  typeSelected: string;
  // mainImage: any,
  street: string,
  houseNumber: string,
  complement: string,
  district: string,
  postalCode: string,
  city: string,
  uf: string,
  country: string
  guestsAllowed: number,
  checkIn: string,
  checkOut: string,
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

export interface TypeAccomodation {
  name: string;
  id: string;
}


export interface Convenience {
  id: number,
  name: string
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

export interface Registration {
  id: number,
  name: string,
  cpf: string,
  birthday: Date,
  street: string,
  number: number,
  complement: string,
  district: string,
  postalCode: string,
  city: string,
  uf: string,
}

export interface SearchFilter {
  inputSearch: string;
  minDate: Date;
  maxDate: Date;
  guests: number;
}
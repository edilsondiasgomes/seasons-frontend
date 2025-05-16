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
  registrationId: number,
  initialDate: Date,
  finalDate: Date,
  quantityDaily: number,
  amount: number
  guests: number,
  totalDailyRate: number,
  totalCleaningFee: number
}

export interface Login {
  email: string,
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
  email: string,
  password: string
}

export interface SearchFilter {
  inputSearch: string;
  minDate: Date | null;
  maxDate: Date | null;
  guests: number | null;
}
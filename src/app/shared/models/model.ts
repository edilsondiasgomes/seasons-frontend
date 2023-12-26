export interface Property {
  placeId: number;
  title: string,
  mainImage: string,
  stateUF: string,
  guestsAllowed: number,
  checkIn: any,
  checkOut: any,
  petsAllowed: boolean,
  parking: boolean,
  rooms: number,
  toilets: number,
  description: string,
  conveniences: string[],
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



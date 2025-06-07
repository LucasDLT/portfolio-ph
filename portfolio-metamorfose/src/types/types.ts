export interface Ifotos {
  id?: number;
  title: string;
  history?: string;
  url: string;
  createdAt?: string;
  active?: boolean;
  category?: ICategory | null | undefined;
  globalOrder: number;
  categoryOrder?: number;
}

export interface ICategory {
  id: number;
  name: string;
  images: Ifotos[];
}

export interface IMail {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Ierror {
  name: string;
  email: string;
  phone: string;
  message: string;
}
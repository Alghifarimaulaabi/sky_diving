export type ProductIconType =
  | 'mask'
  | 'snorkel'
  | 'fins'
  | 'wetsuit'
  | 'belt'
  | 'neck'
  | 'knife'
  | 'buoy'
  | 'watch';

export interface ProductOption {
  key: string;
  label: string;
  choices: string[];
}

export interface Product {
  id: string;
  name: string;
  cat: string;
  level: 'Pemula' | 'Lanjut';
  icon: ProductIconType;
  price: number | null;
  photo: string | null;
  short: string;
  fn: string;
  tip: string;
  options: ProductOption[];
}

export interface Pack {
  id: string;
  name: string;
  desc: string;
  items: string[];
}

export interface Discipline {
  code: string;
  name: string;
  desc: string;
}

export interface EventItem {
  id: string;
  day: string;
  month: string;
  datetime: string;
  title: string;
  desc: string;
  location: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface KitLine {
  id: string;
  v: Record<string, string>;
  qty: number;
}

export interface WhoInfo {
  name: string;
  city: string;
  note: string;
}

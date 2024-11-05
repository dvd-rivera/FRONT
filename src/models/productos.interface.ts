interface Theme {
  name: Array<string>;
}
// los temas son un array de string ya que pueden estar en diferentes idiomas pero se refieren al mismo tema.

export interface Diary {
  price: number;
  personalized_price: number;
  description: string;
  theme: Theme;
  gr: number;
  sheets: number;
  tamaño: string;
  img: string;
  sheet_type: string;
  laminate: string;
  stock: number;
}

export interface Notebook {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  gr: number;
  sheets: number;
  tamaño: string;
  img: string;
  sheet_type: string;
  laminate: string;
  stock: number;
}

export interface Drawing_Notebook {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  sheets: number;
  tamaño: string;
  img: string;
  laminate: string;
  stock: number;
}

export interface Keychain_Sticky_Notes {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Bookmarks_Set {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Stickers_Set {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Wall_Calendar {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Magnet_Calendar {
  size: string;
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Magnetic_Fridge {
  price: number;
  theme: Theme;
  size: string;
  stock: number;
}

export interface Painting {
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Resined_painting {
  size: string;
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
}

export interface Happy_Box {
  size: string;
  price: number;
  personalized_price: number;
  theme: Theme;
  description: string;
  stock: number;
  content: Array<string>;
}

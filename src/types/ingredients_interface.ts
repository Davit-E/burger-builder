interface KeyAsString {
  [key: string]: any;
}

export interface Ingredients extends KeyAsString{
  salad: number;
  tomato: number;
  onion: number;
  cheese: number;
  meat: number;
}
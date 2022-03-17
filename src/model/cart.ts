import { Ingredient } from './ingredient';

export interface Cart {
  items: Ingredient[],
  totalPrice: number,
}

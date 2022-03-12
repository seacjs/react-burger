import { Ingredient } from '../model/ingredient';
import React from 'react';

export interface cartData {
  items: Ingredient[];
  totalPrice: number;
} 

const CartContext = React.createContext<any>({}); 
export default CartContext;
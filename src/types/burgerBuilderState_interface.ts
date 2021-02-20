import actionTypes from '../store/actions/actionTypes';
import { Ingredients } from './ingredients_interface';

interface KeyAsString {
  [key: string]: any;
}

export interface BurgerBuilderState extends KeyAsString {
  ingredients: Ingredients | null;
  totalPrice: number;
  error: boolean;
  building: boolean;
  ordering: boolean;
}

export interface BurgerBuilderActionType {
  type: actionTypes;
  ingredients?: Ingredients;
  ingredientName?: string;
}

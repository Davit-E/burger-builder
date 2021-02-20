import { Ingredients } from './ingredients_interface';
import {OrderForm} from './form_interface';

export interface OrderInterface {
  ingredients: Ingredients;
  price: string;
  userId: string;
  orderData: OrderForm;
}
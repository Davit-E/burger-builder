import { Ingredients } from "./ingredients_interface";

interface KeyAsString {
  [key: string]: any;
}

interface FormProperty extends KeyAsString {
  elemType: string;
  elemConfig: {
    type?: string;
    placeholder?: string;
    options?: {}[];
  };
  value: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  isValid?: boolean;
  touched?: boolean;
}

interface FormTemplate<T> extends KeyAsString {
  name: T;
  email: T;
  street: T;
  zipCode: T;
  deliveryMetod: T;
}

export interface Form extends FormTemplate<FormProperty> {}
export interface OrderForm extends FormTemplate<string> {}

export interface Order {
  ingredients: Ingredients;
  price: string;
  userId: string;
  orderData: OrderForm;
}
import actionTypes from '../actions/actionTypes';
import {
  BurgerBuilderState,
  BurgerBuilderActionType,
} from '../../types/burgerBuilderState_interface';
import { Ingredients } from '../../types/ingredients_interface';

const initialState: BurgerBuilderState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
  ordering: false,
};

const INGREDIENT_PRICES: Ingredients = {
  salad: 0.3,
  cheese: 0.8,
  meat: 1.3,
  tomato: 0.5,
  onion: 0.3,
};

const addIngredient = (
  state: BurgerBuilderState,
  action: BurgerBuilderActionType,
  newIngredients: Ingredients,
  newPrice: number
) => {
  newIngredients[action.ingredientName!]++;
  newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName!];
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: newPrice,
    building: true,
  };
};
const deleteIngredient = (
  state: BurgerBuilderState,
  action: BurgerBuilderActionType,
  newIngredients: Ingredients,
  newPrice: number
) => {
  if (state.ingredients![action.ingredientName!] <= 0) {
    return;
  }
  newIngredients[action.ingredientName!]--;
  newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName!];
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: newPrice,
  };
};

const reducer = (state = initialState, action: BurgerBuilderActionType) => {
  const newIngredients = { ...state.ingredients! };
  let newPrice = 0;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(
        state,
        action,
        newIngredients,
        newPrice
      ) as BurgerBuilderState;
    case actionTypes.REMOVE_INGREDIENT:
      return deleteIngredient(
        state,
        action,
        newIngredients,
        newPrice
      ) as BurgerBuilderState;
    case actionTypes.INIT_INGREDIENTS:
      return {
        totalPrice: 4,
        ingredients: action.ingredients,
        error: false,
        building: false,
        ordering: false,
      } as BurgerBuilderState;
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: action.ingredients,
        error: true,
      } as BurgerBuilderState;
    case actionTypes.ORDERING:
      return {
        ...state,
        ingredients: state.ingredients,
        ordering: true,
      } as BurgerBuilderState;
    case actionTypes.NOT_ORDERING:
      return {
        ...state,
        ingredients: null,
        ordering: false,
      } as BurgerBuilderState;
    default:
      return state;
  }
};

export default reducer;

import actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { AppThunk } from '../../types/appThunk';

interface KeyAsString {
  [key: string]: any;
}

export const addIngredient = (ingName: string) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName: string) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const initIngredients = (): AppThunk => (dispatch) => {
  let ingredients: KeyAsString = {};
  axios
    .get('/ingredients/some.json')
    .then((res) => {
      let arr = res.data;
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        ingredients[Object.keys(el)[0]] = Object.values(el)[0];
      }

      dispatch({
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        ingredients: ingredients,
      });
    });
};

export const ordering = () => {
  return {
    type: actionTypes.ORDERING,
  };
};
export const notOrdering = () => {
  return {
    type: actionTypes.NOT_ORDERING,
  };
};

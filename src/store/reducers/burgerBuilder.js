import actionTypes from '../actions/actionTypes';

let initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
  ordering: false,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.8,
  meat: 1.3,
  tomato: 0.5,
  onion: 0.3,
};

const addIngredient = (state, action, newIngredients, newPrice) => {
  newIngredients[action.ingredientName]++;
  newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: newPrice,
    building: true,
  };
};
const deleteIngredient = (state, action, newIngredients, newPrice) => {
  if (state.ingredients[action.ingredientName] <= 0) {
    return;
  }
  newIngredients[action.ingredientName]--;
  newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
  return {
    ...state,
    ingredients: newIngredients,
    totalPrice: newPrice,
  };
};

const reducer = (state = initialState, action) => {
  const newIngredients = { ...state.ingredients };
  let newPrice = 0;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action, newIngredients, newPrice);
    case actionTypes.REMOVE_INGREDIENT:
      return deleteIngredient(state, action, newIngredients, newPrice);
    case actionTypes.INIT_INGREDIENTS:
      return {
        totalPrice: 4,
        ingredients: action.ingredients,
        error: false,
        building: false,
        ordering: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: action.ingredients,
        error: true,
      };
    case actionTypes.ORDERING:
      return {
        ...state,
        ingredients: state.ingredients,
        ordering: true,
      };
    case actionTypes.NOT_ORDERING:
      return {
        ...state,
        ingredients: null,
        ordering: false,
      };
    default:
      return state;
  }
};

export default reducer;

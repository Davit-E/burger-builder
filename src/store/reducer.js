import ACTIONS from './actions';

let initialState = {
  ingredients: {
    salad: 0,
    tomato: 0,
    onion: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.8,
  meat: 1.3,
  tomato: 0.5,
  onion: 0.3,
};

const reducer = (state = initialState, action) => {
  const newIngredients = { ...state.ingredients };
  let newPrice = 0;
  switch (action.type) {
    case ACTIONS.ADD_INGREDIENT:
      newIngredients[action.ingredientName]++;
      newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
      return { ingredients: newIngredients, totalPrice: newPrice };

    case ACTIONS.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] <= 0) {
        return;
      }
			newIngredients[action.ingredientName]--;
      newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
      return { ingredients: newIngredients, totalPrice: newPrice };

    default:
      return state;
  }
};

export default reducer;

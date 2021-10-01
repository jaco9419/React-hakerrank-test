const initialState = {
  citiesArray: [],
  counter: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CITIES":
      return {
        ...state,
        citiesArray: action.cities,
      };
    case "INCREASE_COUNTER":
      return {
        ...state,
        counter: action.isTemperatureInRange ? state.counter + 1 : state.counter,
      };
    default:
      return state;
  }
};

export default reducer;

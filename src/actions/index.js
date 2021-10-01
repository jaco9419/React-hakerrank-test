export const loadCities = (cities) => {
  return {
    type: "LOAD_CITIES",
    cities,
  };
};

export const increaseCounter = (isTemperatureInRange) => {
  return {
    type: "INCREASE_COUNTER",
    isTemperatureInRange,
  };
};

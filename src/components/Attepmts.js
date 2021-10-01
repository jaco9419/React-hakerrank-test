import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseCounter } from "../actions";

const Attepmts = ({ temperature, index }) => {
  const citiesArray = useSelector((state) => state.citiesArray);
  const dispatch = useDispatch();

  const isTemperatureInRange = (temperature, index) => {
    return (
      Number(temperature) <= Number(citiesArray[index]?.temperature) + 5 &&
      Number(temperature) >= Number(citiesArray[index]?.temperature) - 5
    );
  };

  useEffect(() => {
    dispatch(increaseCounter(isTemperatureInRange(temperature, index)));
  }, []);
  return (
    <div key={index} className="attempt">
      <h2>{citiesArray[index]?.city}</h2>
      <p>Your guess:</p>
      <strong
        style={
          isTemperatureInRange(temperature, index)
            ? { color: "green" }
            : { color: "red" }
        }
      >
        {temperature}
      </strong>
      <p>Correct:</p>
      <strong style={{ color: "blue" }}>
        {citiesArray[index]?.temperature}
      </strong>
    </div>
  );
};

export default Attepmts;

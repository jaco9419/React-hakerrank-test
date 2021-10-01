import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCities } from "../actions";
import Attepmts from "./Attepmts";
import GuessTemperatureBox from "./GuessTemperatureBox";

const MainAreaBox = () => {
  const cities = ["Madrid", "London", "Buenos Aires", "New York", "Beijing"];

  const citiesArray = useSelector((state) => state.citiesArray);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedTemperature, setGuessedTemperature] = useState("");
  const [guessedTemperaturesArray, setGuessedTemperaturesArray] = useState([]);

  useEffect(() => {
    let array = [];
    const fetchCityTemperature = async (city) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5976801edb3b5e3dcd98c32c226cab84&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        const temperature = data.main.temp;
        array = [...array, { city, temperature }];
        dispatch(loadCities(array));
      } catch (error) {
        console.log("error", error);
      }
    };
    cities.forEach((city) => {
      fetchCityTemperature(city);
    });
  }, []);

  const goToNextCity = () => {
    setCurrentCityIndex(currentCityIndex + 1);
    setGuessedTemperaturesArray([
      ...guessedTemperaturesArray,
      guessedTemperature,
    ]);
    setGuessedTemperature("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentCityIndex < citiesArray.length - 1) {
      goToNextCity();
    } else if (currentCityIndex === citiesArray.length - 1) {
      setGuessedTemperaturesArray([
        ...guessedTemperaturesArray,
        guessedTemperature,
      ]);
      setIsGameOver(true);
    }
  };

  const currentCity = citiesArray[currentCityIndex];
  return (
    <div className="MainAreaBox">
      {currentCity && !isGameOver && (
        <GuessTemperatureBox
          guessedTemperature={guessedTemperature}
          setGuessedTemperature={setGuessedTemperature}
          currentCity={currentCity}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="attempts__container">
        {guessedTemperaturesArray &&
          guessedTemperaturesArray.map((temperature, index) => (
            <Attepmts temperature={temperature} index={index} />
          ))}
      </div>

      {isGameOver && (
        <>
          <h2>Game Over</h2>
          <p>You guessed: {counter}/{citiesArray.length}</p>
        </>
      )}
    </div>
  );
};

export default MainAreaBox;

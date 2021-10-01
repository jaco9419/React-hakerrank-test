import React from "react";

const GuessTemperatureBox = ({
  guessedTemperature,
  setGuessedTemperature,
  currentCity,
  handleSubmit,
}) => {
  return (
    <div className="temperature__container">
      <h1>{currentCity.city}</h1>
      <form className="temperature__form">
        <label htmlFor="temperature">
          Please, submit the temperature you think
          <strong> {currentCity.city} </strong>
          has now:<br/>
          <span>(Margin Error: +-5)</span>
        </label>
        <input
          className="temperature__input"
          id="temperature"
          type="number"
          name="temperature"
          value={guessedTemperature}
          placeholder="Enter your guess in Celsius"
          onChange={(event) => setGuessedTemperature(event.target.value)}
          required
        />
        <button
          className="submit__button"
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Make your guess
        </button>
      </form>
    </div>
  );
};

export default GuessTemperatureBox;

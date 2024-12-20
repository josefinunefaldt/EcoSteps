import React, { useState } from "react";
import CarbonCalculater from "../helper/carbonCalculater";

const Form = () => {
  const [travelMethod, setTravelMethod] = useState("");
  const [carType, setCarType] = useState("");
  const [weeklyDistance, setWeeklyDistance] = useState(0);
  const [flies, setFlies] = useState(false);
  const [flightsPerYear, setFlightsPerYear] = useState(0);
  const [flightType, setFlightType] = useState("");
  const [redMeatFrequency, setRedMeatFrequency] = useState(0);
  const [plantBasedFrequency, setPlantBasedFrequency] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!travelMethod) {
      alert("Please select a travel method.");
      return;
    }

    if (flies && (!flightsPerYear || !flightType)) {
      alert("Please fill in your flight details.");
      return;
    }

    const formData = {
      travelMethod,
      carType,
      weeklyDistance,
      flies,
      flightsPerYear,
      flightType,
      redMeatFrequency,
      plantBasedFrequency,
    };

    const result = CarbonCalculater(formData);
    console.log("Carbon Footprint:", result);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <label
          htmlFor="travel-method"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How do you travel to work?
        </label>
        <select
          id="travel-method"
          value={travelMethod}
          onChange={(e) => setTravelMethod(e.target.value)}
          className="select select-bordered w-full mb-4"
          required
        >
          <option value="" disabled>
            Select your main method
          </option>
          <option value="Car">Car</option>
          <option value="Underground">Underground</option>
          <option value="Tram">Tram</option>
          <option value="Bike">Bike</option>
          <option value="Walk">Walk</option>
        </select>

        <label
          htmlFor="weekly-distance"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How many kilometers per week do you travel?
        </label>
        <input
          id="weekly-distance"
          type="number"
          min={0}
          value={weeklyDistance}
          onChange={(e) => setWeeklyDistance(Number(e.target.value))}
          placeholder="Distance per week"
          className="input input-bordered w-full mb-4"
        />

        {travelMethod === "Car" && (
          <>
            <label
              htmlFor="car-type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              What type of car do you own?
            </label>
            <select
              id="car-type"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="select select-bordered w-full mb-4"
            >
              <option value="" disabled>
                Select car type
              </option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </>
        )}

        <label
          htmlFor="flies"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Do you travel by airplane?
        </label>
        <select
          id="flies"
          value={flies ? "yes" : "no"}
          onChange={(e) => setFlies(e.target.value === "yes")}
          className="select select-bordered w-full mb-4"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        {flies && (
          <>
            <label
              htmlFor="airplane-travel"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              How many times a year do you fly?
            </label>
            <input
              id="airplane-travel"
              type="number"
              min={0}
              value={flightsPerYear}
              onChange={(e) => setFlightsPerYear(Number(e.target.value))}
              placeholder="Number of flights"
              className="input input-bordered w-full mb-4"
            />
            <label
              htmlFor="flight-type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Are these flights mostly short-haul or long-haul?
            </label>
            <select
              id="flight-type"
              value={flightType}
              onChange={(e) => setFlightType(e.target.value)}
              className="select select-bordered w-full mb-4"
            >
              <option value="" disabled>
                Select flight type
              </option>
              <option value="Short-haul">Short-haul (&lt; 3 hours)</option>
              <option value="Long-haul">Long-haul (&gt; 3 hours)</option>
            </select>
          </>
        )}

        <label
          htmlFor="red-meat-consumption"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How many days per week do you eat red meat?
        </label>
        <input
          id="red-meat-consumption"
          type="number"
          min={0}
          max={7}
          value={redMeatFrequency}
          onChange={(e) => setRedMeatFrequency(Number(e.target.value))}
          placeholder="Days per week"
          className="input input-bordered w-full mb-4"
        />

        <label
          htmlFor="plant-based-consumption"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How many days per week do you eat plant-based meals?
        </label>
        <input
          id="plant-based-consumption"
          type="number"
          min={0}
          max={7}
          value={plantBasedFrequency}
          onChange={(e) => setPlantBasedFrequency(Number(e.target.value))}
          placeholder="Days per week"
          className="input input-bordered w-full mb-4"
        />

        <button type="submit" className="btn btn-primary w-full mt-4">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Form;

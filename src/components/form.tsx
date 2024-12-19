import React, { useState } from "react";

const Form = () => {
  const [travelMethod, setTravelMethod] = useState("");
  const [redMeatFrequency, setRedMeatFrequency] = useState(0);
  const [flightsPerYear, setFlightsPerYear] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Travel Method:", travelMethod);
    console.log("Red Meat Frequency:", redMeatFrequency);
    console.log("Flights Per Year:", flightsPerYear);
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
          htmlFor="red-meat-consumption"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How often do you eat red meat?
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
          htmlFor="airplane-travel"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How many times a year do you fly?
        </label>
        <input
          id="airplane-travel"
          type="number"
          min={0}
          max={365}
          value={flightsPerYear}
          onChange={(e) => setFlightsPerYear(Number(e.target.value))}
          placeholder="Number of flights"
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

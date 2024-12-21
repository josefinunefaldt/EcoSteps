import React, { useState } from "react";
import CarEmissionCalculator from "../helper/carEmissionCalculator";
import UndergroundEmissionCalculator from "../helper/undergroudEmissionCalc";
import CommuterTrainCalculator from "../helper/commuterTrainCalculator";
import CalculateFlightEmissions from "../helper/flightEmissionCalculator";

const Form = () => {
  const [travelMethod, setTravelMethod] = useState("");
  const [carType, setCarType] = useState("");
  const [weeklyDistance, setWeeklyDistance] = useState(0);
  const [flies, setFlies] = useState(false);
  const [flightsPerYear, setFlightsPerYear] = useState(0);
  const [flightType, setFlightType] = useState("");
  const [redMeatFrequency, setRedMeatFrequency] = useState(0);
  const [plantBasedFrequency, setPlantBasedFrequency] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [electricPercentage, setElectricPercentage] = useState(0);
  const [hybridFuelType, setHybridFuelType] = useState("");
  const [annualEmission, setAnnualEmission] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const carFormData = {
      carType,
      weeklyDistance,
      fuelConsumption,
      energyConsumption,
      electricPercentage,
      hybridFuelType,
    };

    const distanceFormData = {
      weeklyDistance,
    };

    const flightFormData = {
      flies,
      flightType,
      flightsPerYear,
    };
    let commuteEmission = 0;
    let flightEmission = 0;

    if (!travelMethod) {
      alert("Please select a travel method.");
      return;
    }

    switch (travelMethod) {
      case "Car": {
        if (!carType || !fuelConsumption) {
          alert("Please provide car type and fuel consumption.");
          return;
        }

        commuteEmission = CarEmissionCalculator(carFormData);
        break;
      }

      case "Underground": {
        if (weeklyDistance <= 0) {
          alert("Please provide a weekly distance.");
          return;
        }
        commuteEmission = UndergroundEmissionCalculator(distanceFormData);
        break;
      }

      case "Commuter train": {
        if (weeklyDistance <= 0) {
          alert("Please provide a weekly distance.");
          return;
        }

        commuteEmission = CommuterTrainCalculator(distanceFormData);
        break;
      }

      case "Walk":
      case "Bike": {
        commuteEmission = 0;
        break;
      }

      default: {
        alert("Invalid travel method");
        return;
      }
    }
    if (flies) {
      flightEmission = CalculateFlightEmissions(flightFormData);
    }
    setAnnualEmission(Number(commuteEmission.toFixed(2)) + flightEmission);
  };

  const handleReset = () => {
    setTravelMethod("");
    setCarType("");
    setWeeklyDistance(0);
    setFlies(false);
    setFlightsPerYear(0);
    setFlightType("");
    setRedMeatFrequency(0);
    setPlantBasedFrequency(0);
    setFuelConsumption(0);
    setEnergyConsumption(0);
    setElectricPercentage(0);
    setHybridFuelType("");
    setAnnualEmission(0);
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
          <option value="Commuter train">Commuter train</option>
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

            {carType === "Gasoline" ||
            carType === "Diesel" ||
            carType === "Hybrid" ? (
              <>
                <label
                  htmlFor="fuel-consumption"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  What is your car's fuel consumption (L/100 km)?
                </label>
                <input
                  id="fuel-consumption"
                  type="number"
                  min={0}
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(Number(e.target.value))}
                  placeholder="Fuel consumption (L/100 km)"
                  className="input input-bordered w-full mb-4"
                />
              </>
            ) : null}

            {carType === "Hybrid" && (
              <>
                <label
                  htmlFor="electric-percentage"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  What percentage of your distance is powered by electricity?
                </label>
                <input
                  id="electric-percentage"
                  type="number"
                  min={0}
                  max={100}
                  value={electricPercentage}
                  onChange={(e) =>
                    setElectricPercentage(Number(e.target.value))
                  }
                  placeholder="Percentage of distance on electricity"
                  className="input input-bordered w-full mb-4"
                />

                <label
                  htmlFor="hybrid-fuel-type"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  What type of fuel does your hybrid car use for non-electric
                  driving?
                </label>
                <select
                  id="hybrid-fuel-type"
                  value={hybridFuelType}
                  onChange={(e) => setHybridFuelType(e.target.value)}
                  className="select select-bordered w-full mb-4"
                >
                  <option value="" disabled>
                    Select fuel type for hybrid
                  </option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </>
            )}

            {carType === "Electric" && (
              <>
                <label
                  htmlFor="energy-consumption"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  What is your car's energy consumption (kWh/100 km)?
                </label>
                <input
                  id="energy-consumption"
                  type="number"
                  min={0}
                  value={energyConsumption}
                  onChange={(e) => setEnergyConsumption(Number(e.target.value))}
                  placeholder="Energy consumption (kWh/100 km)"
                  className="input input-bordered w-full mb-4"
                />
              </>
            )}
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

        <div className="flex flex-col justify-between">
          <button type="submit" className="btn btn-primary w-full mb-4">
            Calculate Emissions
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary w-full mb-4"
          >
            Reset
          </button>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold">Annual Carbon Emissions:</h3>
          <p className="text-xl text-gray-800">{annualEmission.toFixed(2)}</p>
        </div>
      </form>
    </div>
  );
};

export default Form;

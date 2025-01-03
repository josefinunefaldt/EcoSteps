import React, { useState } from "react";
import CalculateCarEmissions from "../helper/calculateCarEmissions";
import CalculateUndergroundEmissions from "../helper/calculateUndergroundEmissions";
import CalculateCommuterTrainEmissions from "../helper/calculateCommuterTrainEmissions";
import CalculateFlightEmissions from "../helper/calculateFlightEmissions";
import CalculateRedMeatEmissions from "../helper/calculateRedMeatEmissions";
import CalculatePlantbasedEmissions from "../helper/calculatePlantbasedEmissions";
import Background from "../assets/forest.jpg";
import Modal from "./modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errors, setErrors] = useState({
    travelMethod: "",
    carType: "",
    weeklyDistance: "",
    fuelConsumption: "",
    flightsPerYear: "",
    redMeatFrequency: "",
    plantBasedFrequency: "",
    electricPercentage: "",
    hybridFuelType: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      travelMethod: "",
      carType: "",
      weeklyDistance: "",
      fuelConsumption: "",
      flightsPerYear: "",
      redMeatFrequency: "",
      plantBasedFrequency: "",
      electricPercentage: "",
      hybridFuelType: "",
    };

    if (!travelMethod) {
      newErrors.travelMethod = "* Please select a travel method.";
      isValid = false;
    }

    if (travelMethod === "Car") {
      if (!carType) {
        newErrors.carType = "* Please select a car type.";
        isValid = false;
      }
      if (
        (carType === "Gasoline" ||
          carType === "Diesel" ||
          carType === "Hybrid") &&
        fuelConsumption == 0
      ) {
        newErrors.fuelConsumption =
          "* Please provide fuel consumption (L/100 km).";
        isValid = false;
      }
      if (carType === "Hybrid" && electricPercentage == 0) {
        newErrors.electricPercentage = "* Please provide Electric percentage.";
        isValid = false;
      }
    }

    if (
      travelMethod === "Underground" ||
      travelMethod === "Commuter train" ||
      travelMethod == "Car"
    ) {
      if (weeklyDistance == 0) {
        newErrors.weeklyDistance = "* Please provide a weekly distance.";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (!isValid) return;

    const carFormData = {
      carType,
      weeklyDistance,
      fuelConsumption,
      energyConsumption,
      electricPercentage,
      hybridFuelType,
    };

    const distanceFormData = { weeklyDistance };
    const flightFormData = { flies, flightType, flightsPerYear };
    const redMeatFormData = { redMeatFrequency };
    const plantbasedFormData = { plantBasedFrequency };

    let commuteEmission = 0;
    let flightEmission = 0;
    let redMeatEmission = 0;
    let plantbasedEmission = 0;

    switch (travelMethod) {
      case "Car":
        commuteEmission = CalculateCarEmissions(carFormData);
        break;
      case "Underground":
        commuteEmission = CalculateUndergroundEmissions(distanceFormData);
        break;
      case "Commuter train":
        commuteEmission = CalculateCommuterTrainEmissions(distanceFormData);
        break;
      case "Walk":
      case "Bike":
        commuteEmission = 0;
        break;
      default:
        break;
    }

    if (flies) {
      flightEmission = CalculateFlightEmissions(flightFormData);
    }

    if (redMeatFrequency > 0) {
      redMeatEmission = CalculateRedMeatEmissions(redMeatFormData);
    }

    if (plantBasedFrequency > 0) {
      plantbasedEmission = CalculatePlantbasedEmissions(plantbasedFormData);
    }

    setAnnualEmission(
      Number(commuteEmission.toFixed(2)) +
        flightEmission +
        redMeatEmission +
        plantbasedEmission
    );
    setIsModalOpen(true);
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
    setErrors({
      travelMethod: "",
      carType: "",
      weeklyDistance: "",
      fuelConsumption: "",
      flightsPerYear: "",
      redMeatFrequency: "",
      plantBasedFrequency: "",
      electricPercentage: "",
      hybridFuelType: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover  bg-center"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg max-w-lg w-full mb-24 sm:mb-0"
        style={{ backgroundColor: "#A5C882" }}
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
          <option value="Commuter train">Commuter train</option>
          <option value="Bike">Bike</option>
          <option value="Walk">Walk</option>
        </select>
        {errors.travelMethod && (
          <p className="text-red-600 text-sm font-semibold -mt-4">
            {errors.travelMethod}
          </p>
        )}

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
        {errors.weeklyDistance && (
          <p className="text-red-600 text-sm font-semibold -mt-4">
            {errors.weeklyDistance}
          </p>
        )}

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
            {errors.carType && (
              <p className="text-red-600 text-sm font-semibold -mt-4">
                {errors.carType}
              </p>
            )}

            {["Gasoline", "Diesel", "Hybrid"].includes(carType) && (
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
                {errors.fuelConsumption && (
                  <p className="text-red-600 text-sm font-semibold -mt-4">
                    {errors.fuelConsumption}
                  </p>
                )}
              </>
            )}
            {carType === "Hybrid" && (
              <>
                <label
                  htmlFor="electric-percentage"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  What percentage of your hybrid car uses electricity?
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
                  placeholder="Electric percentage"
                  className="input input-bordered w-full mb-4"
                />
                {errors.electricPercentage && (
                  <p className="text-red-600 text-sm font-semibold -mt-4 ">
                    {errors.electricPercentage}
                  </p>
                )}
              </>
            )}
          </>
        )}

        <label
          htmlFor="red-meat-frequency"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          How many days per week do you eat red meat?
        </label>
        <input
          id="red-meat-frequency"
          type="number"
          min={0}
          max={7}
          value={redMeatFrequency}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value + plantBasedFrequency <= 7) {
              setRedMeatFrequency(value);
            }
          }}
          placeholder="0-7 days"
          className="input input-bordered w-full mb-4"
        />
        {errors.redMeatFrequency && (
          <p className="text-red-600 text-sm font-semibold -mt-4">
            {errors.redMeatFrequency}
          </p>
        )}

        <label
          htmlFor="plant-based-frequency"
          className="block mb-2 text-sm font-medium text-gray-700 border-0"
        >
          How many days per week do you eat plant-based meals?
        </label>
        <input
          id="plant-based-frequency"
          type="number"
          min={0}
          max={7}
          value={plantBasedFrequency}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value + redMeatFrequency <= 7) {
              setPlantBasedFrequency(value);
            }
          }}
          placeholder="0-7 days"
          className="input input-bordered w-full mb-4"
        />
        {errors.plantBasedFrequency && (
          <p className="text-red-600 text-sm font-semibold -mt-4">
            {errors.plantBasedFrequency}
          </p>
        )}

        <button
          type="submit"
          className="btn w-full mb-4 text-white border-0"
          style={{ backgroundColor: "#093824" }}
        >
          Calculate Emissions
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn w-full border-0"
          style={{ backgroundColor: "#F7DD72" }}
        >
          Reset
        </button>
      </form>
      {isModalOpen && (
        <Modal
          annualEmission={annualEmission}
          redMeatFrequency={redMeatFrequency}
          plantBasedFrequency={plantBasedFrequency}
          closeModal={closeModal}
          updateEmissions={(newEmission) => setAnnualEmission(newEmission)}
          updateRedMeatFrequency={(newFrequency) =>
            setRedMeatFrequency(newFrequency)
          }
          updatePlantBasedFrequency={(newFrequency) =>
            setPlantBasedFrequency(newFrequency)
          }
        />
      )}
    </div>
  );
};

export default Form;

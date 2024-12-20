import { formData } from "../types/formdata";

const gasolineEmissionPerLiter = 2.31;
const dieselEmissionPerLiter = 2.68;
const swedenGridEmissionFactor = 0.019;
// const polandGridEmissionFactor = 0.65;  keep for later.

const carEmissionCalculator = (
  input: formData,
  emissionPerLiter: number
): number => {
  const result =
    (input.weeklyDistance * input.fuelConsumption * emissionPerLiter * 47) /
    100;
  return result;
};

const hybridCarCalculator = (input: formData): number => {
  const electricDistance =
    (input.weeklyDistance * input.electricPercentage) / 100;
  const fuelDistance = input.weeklyDistance - electricDistance;
  let fuelEmissions;
  const electricEmissions =
    (electricDistance / 100) *
    input.energyConsumption *
    swedenGridEmissionFactor;
  if (input.hybridFuelType == "Diesel") {
    fuelEmissions =
      (fuelDistance / 100) * input.fuelConsumption * dieselEmissionPerLiter;
  }
  if (input.hybridFuelType == "Gasoline") {
    fuelEmissions =
      (fuelDistance / 100) * input.fuelConsumption * gasolineEmissionPerLiter;
  }

  const result = electricEmissions! + fuelEmissions!;
  const yearlyResult = result * 47;
  const roundedResult = Number(yearlyResult.toFixed(2));

  return roundedResult;
};

export const calculateCarbonFootprint = (inputs: formData): number => {
  let carbonFootprint = 0;

  if (inputs.carType) {
    if (inputs.carType === "Gasoline") {
      carbonFootprint = carEmissionCalculator(inputs, gasolineEmissionPerLiter);
    }
    if (inputs.carType === "Diesel") {
      carbonFootprint = carEmissionCalculator(inputs, dieselEmissionPerLiter);
    }
    if (inputs.carType === "Hybrid") {
      carbonFootprint = hybridCarCalculator(inputs);
    }
  }
  console.log(carbonFootprint, "THIS IS YOUR RESULT PER YEAR");

  return carbonFootprint;
};

export default calculateCarbonFootprint;

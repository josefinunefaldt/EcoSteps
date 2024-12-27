import CarFormType from "../types/carFormType";

const gasolineEmissionPerLiter = 2.31;
const dieselEmissionPerLiter = 2.68;
const swedenGridEmissionFactor = 0.041;
const workingWeeks = 47;

const carCalculator = (
  input: CarFormType,
  emissionPerLiter: number
): number => {
  const result =
    (input.weeklyDistance *
      input.fuelConsumption *
      emissionPerLiter *
      workingWeeks) /
    100;
  return result;
};

const electricCarCalculator = (input: CarFormType): number => {
  const electricityConsumed =
    (input.weeklyDistance / 100) * input.energyConsumption;

  const electricEmissions = electricityConsumed * swedenGridEmissionFactor;
  const annualEmissions = electricEmissions * workingWeeks;

  return annualEmissions;
};

const hybridCarCalculator = (input: CarFormType): number => {
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
  const yearlyResult = result * workingWeeks;

  return yearlyResult;
};

export const calculateTransportEmissions = (inputs: CarFormType): number => {
  let carbonFootprint = 0;
  switch (inputs.carType) {
    case "Gasoline":
      carbonFootprint = carCalculator(inputs, gasolineEmissionPerLiter);
      break;
    case "Diesel":
      carbonFootprint = carCalculator(inputs, dieselEmissionPerLiter);
      break;
    case "Hybrid":
      carbonFootprint = hybridCarCalculator(inputs);
      break;
    case "Electric":
      carbonFootprint = electricCarCalculator(inputs);
      break;
    default:
      carbonFootprint = 0;
      break;
  }
  console.log("Carbon footprint with car:", carbonFootprint);

  return Number(carbonFootprint.toFixed(2));
};

export default calculateTransportEmissions;

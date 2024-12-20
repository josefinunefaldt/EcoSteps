import { formData } from "../types/formdata";

const gasolineEmissionPerLiter = 2.31;

const calcGasolineEmissions = (input: formData): number => {
  const result =
    (input.weeklyDistance *
      input.fuelConsumption *
      gasolineEmissionPerLiter *
      47) /
    100;
  return result;
};

export const calculateCarbonFootprint = (inputs: formData): number => {
  let carbonFootprint = 0;

  if (inputs.carType) {
    if (inputs.carType === "Gasoline") {
      carbonFootprint = calcGasolineEmissions(inputs);
    }
  }
  console.log(carbonFootprint, "THIS IS YOUR RESULT PER YEAR with gasoline");

  return carbonFootprint;
};

export default calculateCarbonFootprint;

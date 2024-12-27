import RedMeatFormType from "../types/redMeatFormType";

const calculateRedMeatEmissions = (frequency: RedMeatFormType): number => {
  const emissionFactor = 6.5;
  return frequency.redMeatFrequency * emissionFactor * 52;
};

export default calculateRedMeatEmissions;

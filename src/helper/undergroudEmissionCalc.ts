import underGroundFormType from "../types/underGroundType";

const workingWeeks = 47;
const swedenUndergroundEmissionFactor = 2.28;

const calculateUndergroundEmissions = (input: underGroundFormType): number => {
  const emissionsInGrams =
    input.weeklyDistance * swedenUndergroundEmissionFactor;
  const emissionsInKg = emissionsInGrams / 1000;
  const yearlyResult = emissionsInKg * workingWeeks;
  return Number(yearlyResult.toFixed(2));
};

export default calculateUndergroundEmissions;

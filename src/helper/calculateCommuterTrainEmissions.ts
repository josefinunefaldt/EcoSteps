import DistanceType from "../types/distanceType";

const workingWeeks = 47;
const swedenCommuterTrainEmissionFactor = 0.003;

const calculateCommuterTrainEmissions = (input: DistanceType): number => {
  const emissionsInKg =
    input.weeklyDistance * swedenCommuterTrainEmissionFactor;
  const yearlyResult = emissionsInKg * workingWeeks;
  return Number(yearlyResult.toFixed(2));
};

export default calculateCommuterTrainEmissions;

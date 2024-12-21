import flightType from "../types/flightFormType";

export const calculateFlightEmissions = (input: flightType): number => {
  const averageShortHaulDistance = 1000;
  const averageLongHaulDistance = 6000;

  const averageShortHaulEmissionFactor = 0.2;
  const averageLongHaulEmissionFactor = 0.12;

  let totalEmission = 0;

  if (input.flightType === "Short-haul") {
    totalEmission =
      input.flightsPerYear *
      averageShortHaulDistance *
      averageShortHaulEmissionFactor;
  } else if (input.flightType === "Long-haul") {
    totalEmission =
      input.flightsPerYear *
      averageLongHaulDistance *
      averageLongHaulEmissionFactor;
  }

  return totalEmission;
};
export default calculateFlightEmissions;

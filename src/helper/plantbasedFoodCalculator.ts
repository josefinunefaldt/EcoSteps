import PlantbasedFormType from "../types/plantbasedFormType";

const calculatePlantbasedEmissions = (
  frequency: PlantbasedFormType
): number => {
  const emissionFactor = 0.5;
  return frequency.plantBasedFrequency * emissionFactor * 52;
};

export default calculatePlantbasedEmissions;

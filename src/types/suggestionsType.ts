type SuggestionsProps = {
  annualEmission: number;
  redMeatFrequency: number;
  plantBasedFrequency: number;
  updateEmissions: (newEmission: number) => void;
  updateRedMeatFrequency: (newFrequency: number) => void;
  updatePlantBasedFrequency: (newFrequency: number) => void;
};
export default SuggestionsProps;

type modalType = {
  annualEmission: number;
  redMeatFrequency: number;
  plantBasedFrequency: number;
  closeModal: () => void;
  updateEmissions: (newEmission: number) => void;
  updateRedMeatFrequency: (newFrequency: number) => void;
  updatePlantBasedFrequency: (newFrequency: number) => void;
};

export default modalType;

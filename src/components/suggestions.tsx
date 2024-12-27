import React from "react";
import calculatePlantbasedEmissions from "../helper/calculatePlantbasedEmissions";
import calculateRedMeatEmissions from "../helper/calculateRedMeatEmissions";
import SuggestionsProps from "../types/suggestionsType";

const Suggestions: React.FC<SuggestionsProps> = ({
  annualEmission,
  redMeatFrequency,
  plantBasedFrequency,
  updateEmissions,
  updateRedMeatFrequency,
  updatePlantBasedFrequency,
}) => {
  const handleReduceRedMeat = () => {
    const newRedMeatFrequency = Math.max(0, redMeatFrequency - 1);
    const newPlantBasedFrequency = Math.min(7, plantBasedFrequency + 1);

    const reducedRedMeatEmission = calculateRedMeatEmissions({
      redMeatFrequency: newRedMeatFrequency,
    });
    const increasedPlantBasedEmission = calculatePlantbasedEmissions({
      plantBasedFrequency: newPlantBasedFrequency,
    });

    const newAnnualEmission =
      annualEmission -
      calculateRedMeatEmissions({ redMeatFrequency }) +
      reducedRedMeatEmission +
      increasedPlantBasedEmission;

    updateEmissions(Number(newAnnualEmission.toFixed(2)));
    updateRedMeatFrequency(newRedMeatFrequency);
    updatePlantBasedFrequency(newPlantBasedFrequency);
  };

  return (
    <div className="bg-blue-50 p-4 mt-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Reduce your footprint</h2>

      {redMeatFrequency > 0 && (
        <div className="mb-4">
          <p>
            You consume red meat {redMeatFrequency} day(s) per week. Swap to one
            plantbased day
          </p>
          <button
            onClick={handleReduceRedMeat}
            className="btn btn-primary mt-2"
          >
            Swap
          </button>
        </div>
      )}

      {plantBasedFrequency === 7 && (
        <p>You're eating plant-based meals every day. Keep it up!</p>
      )}
    </div>
  );
};

export default Suggestions;

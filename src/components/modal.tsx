import React from "react";
import Logo from "../assets/recycle.png";
import ModalType from "../types/modalType";
import Suggestions from "./suggestions";

const Modal: React.FC<ModalType> = ({
  annualEmission,
  redMeatFrequency,
  plantBasedFrequency,
  closeModal,
  updateEmissions,
  updateRedMeatFrequency,
  updatePlantBasedFrequency,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div
        className="p-6 rounded-lg shadow-lg w-96"
        style={{ backgroundColor: "#A5C882" }}
      >
        <p className="text-xl mb-4 text-center font-semibold">
          Your estimated annual carbon emissions are {annualEmission} kg CO2
        </p>
        <img src={Logo} className="w-40 m-auto" alt="Recycle Logo" />
        {redMeatFrequency > 0 && (
          <Suggestions
            annualEmission={annualEmission}
            redMeatFrequency={redMeatFrequency}
            plantBasedFrequency={plantBasedFrequency}
            updateEmissions={updateEmissions}
            updateRedMeatFrequency={updateRedMeatFrequency}
            updatePlantBasedFrequency={updatePlantBasedFrequency}
          />
        )}
        <button
          onClick={closeModal}
          className="btn w-full border-0 text-black"
          style={{ backgroundColor: "#F7DD72" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

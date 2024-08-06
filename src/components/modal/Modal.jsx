import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative w-3/5 h-[95%] bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 transform hover:scale-125 transition duration-300 ease-in-out"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="h-full flex flex-col">
          <div className="w-full  p-4 flex flex-row justify-between gap-2">
            <div className="w-1/2 h-full">
              <p className="text-base font-bold text-center">True Color</p>
              <img
                src="/modalImage.png"
                alt="Modal Image"
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-1/2 h-full">
              <p className="text-base font-bold text-center">NDVI</p>
              <img
                src="/modalImage.png"
                alt="Modal Image"
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="w-full p-4 overflow-y-auto">
            <h2 className="text-xl font-bold">Crop Details</h2>
            <ul className="mt-2 space-y-2">
              <li>Min: 0.015251798555254936</li>
              <li>Max: 0.015251798555254936</li>
              <li>Mean: 0.015251798555254936</li>
              <li>StDev: 0</li>
              <li>Sample Count: 1</li>
              <li>No Data Count: 0</li>
              <li>Time Stamp: 2024-08-05T06:17:52.183Z</li>
              <li>Yield in Tons: 1.51</li>
              <li>Moisture Content in Percentage: 13</li>
              <li>Cultivated Land: No</li>
              <li>Age of Crop in Months: 7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

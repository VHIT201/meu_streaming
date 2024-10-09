// Spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6  md:w-10 md:h-10 border-2 border-t-transparent border-white border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

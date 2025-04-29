import React from "react";

interface SubmitInputProps {
  children: string;
}

const SubmitInput: React.FC<SubmitInputProps> = ({ children }) => {
  return (
    <input
      value={children}
      type="submit"
      className="flex items-center justify-center text-white cursor-pointer bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
    />
  );
};

export default SubmitInput

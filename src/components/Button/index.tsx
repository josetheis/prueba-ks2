import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  const styles =
    "flex items-center justify-center cursor-pointer focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 " +
    (type === "primary"
      ? "bg-blue-500 text-white hover:bg-primary-800"
      : "bg-gray-800 text-gray-400 border border-gray-600 hover:text-white hover:bg-gray-700");
  return (
    <button onClick={onClick} type="button" className={styles}>
      {children}
    </button>
  );
};

export default Button;

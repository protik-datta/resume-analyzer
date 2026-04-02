import React from "react";

const Button = ({ children, classname = "" }) => {
  return (
    <button
      className={`bg-[#22c55e] text-white px-6 py-2 rounded-[10px] hover:bg-green-600 transition ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;

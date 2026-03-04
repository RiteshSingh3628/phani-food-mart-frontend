"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`
        w-full bg-[#EAAA2A] hover:bg-[#d49925] text-black font-semibold py-3 rounded-md
        transition-colors duration-200 flex cursor-pointer items-center justify-center gap-2 mt-2
        ${className}
      `}
      {...props}
    >
      {children} <ArrowRight size={18} />
    </button>
  );
};

export default Button;

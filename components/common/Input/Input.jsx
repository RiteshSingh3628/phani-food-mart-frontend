"use client";

import React, { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", icon: Icon, rightIcon: RightIcon, onRightIconClick, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      {label && (
        <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-[#A3A3A3]">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full bg-transparent border-[1.5px] border-[#252253] hover:border-[#EAAA2A] rounded-md py-3 text-white text-sm
            transition-colors duration-200 focus:outline-none focus:border-[#EAAA2A]
            ${Icon ? "pl-10" : "pl-4"}
            ${RightIcon ? "pr-10" : "pr-4"}
            ${error ? "border-red-500" : ""}
          `}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            className="absolute right-3 text-[#A3A3A3] hover:text-white transition-colors"
            onClick={onRightIconClick}
          >
            <RightIcon size={18} />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

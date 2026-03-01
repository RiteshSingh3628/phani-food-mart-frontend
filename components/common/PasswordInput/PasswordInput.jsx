"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  label = "Password",
  error = "",
  register,
  ...props
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      {label && (
        <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1">{label}</label>
      )}

      <div className="relative flex items-center">
        <div className="absolute left-3 text-[#A3A3A3]">
            <Lock size={18}/>
        </div>

        {/* Input */}
        <input
          type={show ? "text" : "password"}
          className={`w-full bg-transparent border-[1.5px] border-[#252253] hover:border-[#EAAA2A] rounded-md py-3 px-10 text-white text-sm
            transition-colors duration-200 focus:outline-none focus:border-[#EAAA2A] 
            ${error ? "border-red-500" : " "}
          `}
          {...register}
          {...props}
        />

        {/* Right Icon */}
        <div
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-3 cursor-pointer"
        >
          {show ? (
            <Eye className="w-5 h-5 text-gray-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
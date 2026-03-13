"use client";

import { Marquee } from "@/components/ui/marquee";
import React from "react";

export default function MarqueeStrip({ data = [], speed = 20 }) {

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] bg-linear-to-r from-amber-950 to-amber-400">
        {data.map((item,index) => (
          <div key={index} className="whitespace-nowrap text-white font-bold text-2xl p-2">
            {item}
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background"></div>
    </div>
  );
}
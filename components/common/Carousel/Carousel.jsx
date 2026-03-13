"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Carousel (props) {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide || 0);

  const next = useCallback(() => {
    setactiveSlide((prevSlide) => (prevSlide + 1) % props.data.length);
  }, [props.data.length]);

  const prev = useCallback(() => {
    setactiveSlide((prevSlide) => (prevSlide === 0 ? props.data.length - 1 : prevSlide - 1));
  }, [props.data.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const getStyles = (index) => {
    let distance = index - activeSlide;
    const length = props.data.length;
    const half = Math.floor(length / 2);
    
    // Smooth infinite wrapping distance
    if (distance > half) distance -= length;
    else if (distance < -half) distance += length;

    if (distance === 0)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10
      };
    else if (distance === -1)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9
      };
    else if (distance === 1)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9
      };
    else if (distance === -2)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8
      };
    else if (distance === 2)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8
      };
    else if (distance < -2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7
      };
    else if (distance > 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7
      };
  };

  return (
    <>
      {/* carousel */}
      <div className="w-full bg-linear-to-b from-orange-200 via-orange-400 to-orange-600 h-[90vh] overflow-hidden">
      <div className=" relative slideC">
        {props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <div
              className="slide"
              style={{
                backgroundImage: item.img ? `url("${item.img}")` : 'none',
                backgroundColor: item.bgColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i)
              }}
            >
              {/* <SliderContent {...item} /> */}
            </div>
          </React.Fragment>
        ))}
      </div>
      </div>
      {/* carousel */}

      <div className="btns">
        {/* <FontAwesomeIcon
          className="btn"
          onClick={prev}
          icon={faChevronLeft}
          color="#fff"
          size="2x"
        />
        <FontAwesomeIcon
          className="btn"
          onClick={next}
          icon={faChevronRight}
          color="#fff"
          size="2x"
        /> */}
      </div>
    </>
  );
};

const SliderContent = (props) => {
  return (
    <div className="sliderContent">
      {props.icon}
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};

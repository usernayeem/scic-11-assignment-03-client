import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export const Banner = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center absolute bottom-6 left-1/2 -translate-x-1/2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 cursor-pointer" />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  // Slide data
  const slides = [
    {
      id: 1,
      title: "Discover Your Perfect Stay",
      description:
        "Experience luxury and comfort in our premium hotel rooms with world-class amenities and exceptional service.",
      gradient: "from-blue-600 via-blue-700 to-blue-800",
      buttonText: "Explore Rooms",
    },
    {
      id: 2,
      title: "Luxury Redefined",
      description:
        "Indulge in unparalleled comfort with our exquisite accommodations designed for the modern traveler.",
      gradient: "from-slate-600 via-slate-700 to-gray-800",
      buttonText: "View Suites",
    },
    {
      id: 3,
      title: "Unforgettable Experiences",
      description:
        "Create lasting memories with our premium hospitality services and breathtaking accommodations.",
      gradient: "from-indigo-600 via-purple-600 to-blue-700",
      buttonText: "Book Now",
    },
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[70vh] md:h-[80vh] outline-none"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 translate-y-1/2"></div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-center items-center h-full px-4 md:px-6 text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed opacity-90 max-w-2xl">
                {slide.description}
              </p>
              <Link
                to="/rooms"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white px-8 py-4 text-lg font-semibold transition-colors duration-200"
              >
                {slide.buttonText}
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 bg-white opacity-5 rounded-full"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-white/20`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
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
      className={`${className} absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-white/20`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
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
    speed: 800,
    fade: true,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50" />
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

  // Slide data with background images
  const slides = [
    {
      id: 1,
      title: "Unforgettable Experiences",
      subtitle: "Create Lasting Memories",
      description:
        "Premium hospitality services and breathtaking accommodations await you.",
      imageUrl:
        "https://images.pexels.com/photos/14036450/pexels-photo-14036450.jpeg",
      buttonText: "Book Now",
    },
    {
      id: 2,
      title: "Discover Your Perfect Stay",
      subtitle: "Premium Hotel Experience",
      description:
        "Experience luxury and comfort with world-class amenities and exceptional service.",
      imageUrl:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Explore Rooms",
    },
    {
      id: 3,
      title: "Luxury Redefined",
      subtitle: "Exceptional Accommodations",
      description:
        "Indulge in unparalleled comfort designed for the modern traveler.",
      imageUrl:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      buttonText: "View Suites",
    },
  ];

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[88vh] outline-none">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center brightness-75"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
              }}
            />

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

            {/* Content Container */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-24">
                <div className="max-w-2xl">
                  {/* Subtitle */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-blue-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to="/rooms"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                  >
                    {slide.buttonText}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

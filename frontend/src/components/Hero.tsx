import '../index.css';
import { useState, useEffect } from "react";

const Body = () => {
  const slides = [
    {
      image: "/images/img1.jpg", // Ensure this path is correct!
      heading: "We Serve Fresh Organic Vegetables and Fruits",
      subheading: "We deliver fresh vegetables and fruits to your doorstep",
      buttonText: "View Details"
    },
    {
      image: "/images/img3.jpg",
      heading: "Fresh & Healthy",
      subheading: "Quality produce delivered directly to you",
      buttonText: "Learn More"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  const { image, heading, subheading, buttonText } = slides[currentSlide];

  return (
    <div className="relative h-[770px] w-full overflow-hidden" id="hero">
      {/* Background image */}
      <img
        src={image}
        alt={`slide-${currentSlide}`}
        className="h-full w-full object-cover transition-opacity duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl italic mb-4">
          {heading}
        </h1>
        <p className="text-white text-lg md:text-2xl italic mb-6">
          {subheading}
        </p>
        <button className="bg-green-400 hover:bg-lime-500 text-white rounded-full px-6 py-2 font-bold">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Body;

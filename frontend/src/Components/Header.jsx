import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { assets } from "../assets/assets";

export default function Header() {
  const slides = [
    {
      image: assets.slide1,
      title: "Spring Collection",
      subtitle: "Fresh Styles for You",
    },
    {
      image: assets.slider,
      title: "Luxury Essentials",
      subtitle: "Elevate Your Wardrobe",
    },
    // {
    //   image: assets.slide,
    //   title: "Runway Ready",
    //   subtitle: "Exclusive Designs",
    // },
  ];

  return (
    <div className="relative w-full h-[20vh] md:h-[75vh] lg:h-[90vh] mt-[15vh] md:mt-[15vh] lg:mt-[20vh] overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div
              className="w-full h-full bg-contain bg-center relative flex flex-col items-center justify-center text-white p-4"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text readability */}
              {/* <div className="absolute inset-0 bg-black opacity-30"></div>

              <div className="relative z-10 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-medium">
                  {slide.subtitle}
                </p>
                <button className="mt-4 md:mt-6 px-6 py-2 md:px-8 md:py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300">
                  Shop Now
                </button> */}
              {/* </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

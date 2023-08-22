import React from "react";
import Slider from "react-slick";
import { SlideShow } from "../../slideshow/SlidesData";

export default function SliderHero() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="md:max-w-[800px] max-w-[200px] mx-auto w-full">
      <Slider {...settings}>
        {SlideShow.map((slide) => (
          <div key={slide.id} className="sliderPrnt">
            <img src={slide.imgPath} className="sliderimage" alt={`Image ${slide.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

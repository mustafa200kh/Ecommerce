import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SlideA from "@assets/images/pexels-kowalievska-1126993.jpg";
import SlideB from "@assets/images/freestocks-_3Q3tsJ01nc-unsplash.jpg";
import SlideC from "@assets/images/Slide3.jpg";
const LandingSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      effect={"fade"}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      style={{ height: "100%" }}
    >
      <SwiperSlide>
        <div
          className="h-[80vh]"
          style={{ backgroundImage: `url(${SlideA})`, backgroundSize: "cover" }}
        ></div>
        {/* <img src={SlideA} alt="img-slider-1" /> */}
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-[80vh]"
          style={{ backgroundImage: `url(${SlideB})`, backgroundSize: "cover" }}
        ></div>
        {/* <img className="" src={SlideB} alt="img-slider-2" /> */}
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-[80vh]"
          style={{ backgroundImage: `url(${SlideC})`, backgroundSize: "cover" }}
        ></div>
        {/* <img className="" src={SlideB} alt="img-slider-2" /> */}
      </SwiperSlide>
    </Swiper>
  );
};

export default LandingSlider;

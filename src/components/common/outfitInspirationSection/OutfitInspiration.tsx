// HomeInspirationSlider.tsx
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const rooms = [
  {
    id: 1,
    title: "Sport Outfit",
    subtitle: "High-waisted leggings",
    image:
      "https://media.alshaya.com/adobe/assets/urn:aaid:aem:6d21aeb3-9fe7-4a88-a59a-14129bfa24b8/as/EID-7e9cfc986b9904cdd8b7c4712a20896a25456ef4.jpg?preferwebp=true&width=1366&auto=webp",
  },
  {
    id: 2,
    title: "Modern Style",
    subtitle: "Bootcut Leg Low Jeans",
    image:
      "https://media.alshaya.com/adobe/assets/urn:aaid:aem:a79a4ee0-ca1d-45dd-aacc-17954fcef51a/as/EID-1b66ba3562cda9737a45038f095557b871f2113b.jpg?preferwebp=true&&auto=webp&width=683",
  },
  {
    id: 3,
    title: "Formal Style",
    subtitle: "Slim Fit Waistcoat",
    image:
      "https://media.alshaya.com/adobe/assets/urn:aaid:aem:6d9c6e59-b3c2-454b-95d9-3fd8d4c8b161/as/EID-89b4a3a863789878d4cb1a40474a113283558996.jpg?width=450&height=675&preferwebp=true",
  },
];

const OutfitInspiration = () => {
  return (
    <div className="bg-blue-800 bg-opacity-5 py-16 px-4 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">
            50+ Beautiful outfit inspiration
          </h2>
          <p className="text-gray-600 mb-6 font-semibold dark:text-darktext">
            Our designer already made a lot of beautiful prototype of outfit
            that inspire you
          </p>
          <button className="cursor-pointer w-fit p-3 bg-hoverColor hover:bg-opacity-80 text-white rounded-lg shadow-lg transition-all duration-500">
            Explore More
          </button>
        </div>

        {/* Right Section - Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          effect={"fade"}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id}>
              <div className="relative rounded overflow-hidden shadow-lg">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-white bg-opacity-80 p-4 w-full">
                  <p className="text-sm text-gray-500">{room.subtitle}</p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {room.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OutfitInspiration;

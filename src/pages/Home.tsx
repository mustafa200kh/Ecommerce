import { LandingSlider } from "@components/common";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
      {/* Landing Section */}
      <div className="relative">
        <div className="absolute bottom-8 w-[85%] md:top-[40%] md:left-[40px] md:-translate-y-[40%] md:w-[500px] bg-black bg-opacity-40 p-3 z-10">
          <h2 className="text-xl md:text-4xl text-white mb-3 md:mb-4">
            Explore & Shop the newest fashion around the world
          </h2>
          <div>
            <p className="text-white md:text-lg mb-2 md:mb-10">
              <span className="hidden md:block">
                All type of Wears sport, formal here for you
              </span>
              Reinvented wears for the next generation
            </p>
          </div>
          <div className="w-full flex justify-end">
            <Link
              className="p-2 block text-black bg-white border-2 border-white border-solid cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-hoverColor hover:text-white"
              to={`/categories`}
            >
              Shop Now
            </Link>
          </div>
        </div>
        <LandingSlider />
      </div>

      <div className="Trending"></div>
    </div>
  );
}

export default Home;

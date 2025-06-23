import MenImageCat from "@assets/images/men.jpg";
import WomenImageCat from "@assets/images/women.jpg";
import KidsImageCat from "@assets/images/kids.jpg";
import ExpandSvg from "@assets/expand-svgrepo-com.svg?react";
import { Link } from "react-router-dom";
// this component appears in home Page to show some categories
const ExploreCategoriesSection = () => {
  let categ = [
    { id: 1, title: "kids", srcImg: KidsImageCat },
    { id: 2, title: "women", srcImg: WomenImageCat },
    { id: 3, title: "men", srcImg: MenImageCat },
  ];
  return (
    <div className="browsecategories mb-10">
      <h2 className="text-3xl font-semibold text-center mb-3 dark:text-white">
        Browse Our Categories
      </h2>
      <h3 className="font-semibold text-center mb-10 text-lighttext dark:text-darktext">
        Explore & Shop the newest fashion around the world
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categ.map((e) => {
          return (
            <div key={e.id} className="">
              <div className="relative group bg-white shadow rounded-xl overflow-hidden transition-all duration-200 mb-3">
                <img src={e.srcImg} className="w-full h-60 object-cover" />
                {/* hover by mouse */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center 
  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-sm"
                >
                  <Link
                    className="bg-white  text-black px-4 py-2 rounded mb-2 flex items-center"
                    to={`categories/Products/${e.title}`}
                  >
                    <p className="inline-block">Explore</p>
                    <ExpandSvg className="ml-2 w-3 h-3 inline-block" />
                  </Link>
                </div>
              </div>
              <div className="text-center dark:text-white">{e.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreCategoriesSection;

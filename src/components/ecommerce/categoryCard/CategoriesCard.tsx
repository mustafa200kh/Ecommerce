import { TCategory } from "@type/index";
import { Link } from "react-router-dom";

function CategoriesCard({ title, prefix, img }: TCategory) {
  return (
    <div className="basis-[45%] md:basis-[28%] lg:basis-[22%] cursor-pointer mb-5">
      <Link to={`Products/${prefix}`}>
        <div className="image-container mb-6">
          <img
            src={img}
            className="max-w-full rounded-full"
            alt="category-image"
          />
        </div>
        <div className="text-center">
          <p className="text-lg capitalize dark:text-white "> {title} </p>
        </div>
      </Link>
    </div>
  );
}

export default CategoriesCard;

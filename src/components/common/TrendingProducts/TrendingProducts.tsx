import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetSampleOfProducts from "@store/products/act/actGetSampleOfProductd";
import { cleanProductsRecords } from "@store/products/productsSlice";
import TrendingProductCard from "@components/ecommerce/trendingProductCard/TrendingProductCard";

const TrendingProducts = () => {
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);

  const ITEMS_PER_LOAD = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    const promise = dispatch(actGetSampleOfProducts());
    return () => {
      promise.abort();
      dispatch(cleanProductsRecords());
    };
  }, [dispatch]);

  const visibleProducts = records.slice(0, visibleCount).map((e) => ({
    ...e,
    quantity: cartItems[e.id] ?? 0,
  }));

  const showMoreHandler = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return (
    <div className="Trending">
      <h2 className="text-3xl font-semibold text-center mb-10 dark:text-white">
        Trending Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <TrendingProductCard key={product.id} {...product} />
        ))}
      </div>

      {visibleCount < records.length && (
        <div className="flex justify-center my-10">
          <button
            className="border border-mainColor text-mainColor px-6 py-2 rounded hover:bg-mainColor dark:text-white hover:text-white transition"
            onClick={showMoreHandler}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;

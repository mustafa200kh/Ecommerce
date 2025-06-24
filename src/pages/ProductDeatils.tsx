import { PageHeader } from "@components/common";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByID,
  cleanProductsRecords,
} from "@store/products/productsSlice";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

type TData = {
  id: number;
  title: string;
  price: number;
  cat_prefix: string | undefined;
  max: number;
};

const ProductDeatils = () => {
  const params = useParams();
  console.log(params);
  const id: number = parseInt(params.prefix?.toString() ?? "0");
  const dispatch = useAppDispatch();

  const { records } = useAppSelector((state) => state.products);

  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [productData, setProductData] = useState<TData>();
  let [countBuyItem, setCountBuyItem] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const promise = dispatch(actGetProductByID(id));
    return () => {
      promise.abort();
      dispatch(cleanProductsRecords());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (records.length > 0) {
      const loadedImages = [records[0].img, records[0].img2, records[0].img3];
      setImages(loadedImages);
      setMainImage(loadedImages[0]);
      let { id, title, price, max, cat_prefix } = records[0];
      setProductData({ id, title, price, max, cat_prefix });
    }
  }, [records]);

  const addToCartHandler = () => {
    if (countBuyItem == productData?.max) return;
    let count = countBuyItem + 1;
    setCountBuyItem(count);
    dispatch(addToCart(id));
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % images.length;
    triggerTransition(() => setMainImage(images[nextIndex]));
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(mainImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    triggerTransition(() => setMainImage(images[prevIndex]));
  };

  const triggerTransition = (callback: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      callback();
      setTransitioning(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) handlePrev();
    else if (deltaX < -50) handleNext();

    touchStartX.current = null;
  };

  return (
    <>
      <PageHeader title="Product details page" />
      {/* category */}
      <div className="text-sm text-lighttext">
        {`Home/Products/${productData?.cat_prefix}/${productData?.title}`}
      </div>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails on the left - vertical */}
          <div className="flex flex-col gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`alt${index}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border transition duration-200 hover:border-black ${
                  mainImage === img ? "border-black" : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Main image on the right */}
          <div className="group relative overflow-hidden rounded shadow flex-1">
            <img
              src={mainImage}
              alt="Product Image"
              className="w-full  object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">{productData?.title}</h2>
          <p className="text-yellow-500">
            ★★★★☆ <span className="text-gray-700">(212 reviews)</span>
          </p>
          <p className="text-xl font-bold mt-2">
            {productData?.price}$
            <span className=" text-gray-500 ml-2">20% OFF</span>
          </p>

          <div className="my-4">
            <label className="block mb-1">Color: Black</label>
            <select className="border p-2 rounded w-32">
              <option>Black</option>
              <option>White</option>
            </select>
          </div>

          <div className="my-4">
            <label className="block mb-1">Size:</label>
            <div className="grid grid-cols-6 gap-2">
              {["6", "8", "10", "12", "14", "16", "18", "20", "22"].map(
                (size) => (
                  <button
                    key={size}
                    className="border p-2 rounded hover:bg-gray-200"
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>
          <p className="text-xl text-gray-500 mt-2">
            <span className=" text-gray-500 ml-2">Remaining: </span>
            {countBuyItem == productData?.max
              ? "No items avaliable"
              : `${productData?.max - countBuyItem}`}
          </p>
          <button
            className="bg-black text-white px-6 py-3 rounded mt-4 w-full"
            onClick={addToCartHandler}
            disabled={countBuyItem == productData?.max}
          >
            Add to Cart
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Enjoy FREE express & Free Returns on orders over $35!
          </p>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Dark grey</li>
              <li>Acid wash finish</li>
              <li>Drawstring waist</li>
              <li>Side slit pockets</li>
              <li>Fin acid wash</li>
              <li>Wide leg</li>
              <li>Model is 5'9/175cm and wears UK 10/EU 38/US 6</li>
              <li>Product Code: 09454093</li>
            </ul>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 text-white text-4xl"
            >
              ❮
            </button>
            <img
              src={mainImage}
              alt="Zoomed view"
              className={`max-w-3xl max-h-[90vh] rounded shadow-lg transition-opacity duration-300 ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-white text-4xl"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductDeatils;

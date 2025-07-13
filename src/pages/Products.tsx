// components
import { ProductsCard } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import PageHeader from "@components/common/Heading/PageHeader";
import useProducts from "@hooks/useProducts";
function Products() {
  const { error, fullData, loading, paramsPrefix, rangeHandler, maxPrice } =
    useProducts();
  // looping on fulldata and Rendering components
  let productList =
    fullData.length > 0
      ? fullData.map((productElement) => {
          return maxPrice ? (
            productElement.price < maxPrice && (
              <ProductsCard key={productElement.id} {...productElement} />
            )
          ) : (
            <ProductsCard key={productElement.id} {...productElement} />
          );
        })
      : `No Products Found of categorey ${paramsPrefix}`;

  return (
    <>
      <PageHeader
        title={`${paramsPrefix?.toString().toUpperCase()} Products`}
      />
      <div className="px-2">
        <label
          htmlFor="basic-range-slider-usage"
          className="block dark:text-white"
        >
          Filter By Price
        </label>
        <input
          type="range"
          min={0}
          max={500}
          onChange={(e) => rangeHandler(e)}
          className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden
          [&::-webkit-slider-thumb]:w-2.5
          [&::-webkit-slider-thumb]:h-2.5
          [&::-webkit-slider-thumb]:-mt-0.5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:ease-in-out
          dark:[&::-webkit-slider-thumb]:bg-neutral-700

          [&::-moz-range-thumb]:w-2.5
          [&::-moz-range-thumb]:h-2.5
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:border-blue-600
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:duration-150
          [&::-moz-range-thumb]:ease-in-out

          [&::-webkit-slider-runnable-track]:w-full
          [&::-webkit-slider-runnable-track]:h-2
          [&::-webkit-slider-runnable-track]:bg-gray-100
          [&::-webkit-slider-runnable-track]:rounded-full
          dark:[&::-webkit-slider-runnable-track]:bg-neutral-700

          [&::-moz-range-track]:w-full
          [&::-moz-range-track]:h-2
          [&::-moz-range-track]:bg-gray-100
          [&::-moz-range-track]:rounded-full"
          id="basic-range-slider-usage"
          aria-orientation="horizontal"
        />
        {maxPrice && (
          <div className="text-center dark:text-white mb-3">
            displaying products with price less than ${maxPrice}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Loading loading={loading} error={error} type="product">
          {productList}
        </Loading>
      </div>
    </>
  );
}

export default Products;

// components
import { ProductsCard } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import PageHeader from "@components/common/Heading/PageHeader";
import useProducts from "@hooks/useProducts";
function Products() {
  const { error, fullData, loading, paramsPrefix } = useProducts();
  // looping on fulldata and Rendering components
  let productList =
    fullData.length > 0
      ? fullData.map((productElement) => {
          return <ProductsCard key={productElement.id} {...productElement} />;
        })
      : `No Products Found of categorey ${paramsPrefix}`;
  return (
    <>
      <PageHeader
        title={`${paramsPrefix?.toString().toUpperCase()} Products`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Loading loading={loading} error={error} type="product">
          {productList}
        </Loading>
      </div>
    </>
  );
}

export default Products;

import { PageHeader } from "@components/common";
import { ProductsCard } from "@components/ecommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useWishlist from "@hooks/useWishlist";
const Wishlist = () => {
  const { error, loading, fullData, wishlistProductFullInfo } = useWishlist();
  let productList = fullData.map((productElement) => {
    return <ProductsCard key={productElement.id} {...productElement} />;
  });

  return (
    <>
      <PageHeader title="My Wislist" />
      {!wishlistProductFullInfo.length ? (
        <div className="">
          <LottieHandler type="empty" message="Your wishlist is empty" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Loading loading={loading} error={error} type="product">
            {productList}
          </Loading>
        </div>
      )}
    </>
  );
};

export default Wishlist;

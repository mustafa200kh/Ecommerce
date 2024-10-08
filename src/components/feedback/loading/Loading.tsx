import { TLoading } from "@type/index";
import CartSkeleton from "../skeletons/cartSkeleton/CartSkeleton";
import CategorySkeleton from "../skeletons/categorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/productSkeleton/ProductSkeleton";
import LottieHandler from "../lottieHandler/LottieHandler";

// import LoadingSVG from "@assets/spinner-svgrepo-com.svg?react";
const SkeletonTypes = {
  cart: CartSkeleton,
  product: ProductSkeleton,
  category: CategorySkeleton,
};
type TLoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode; // this accepts jsx array any thing in react as props
  type?: keyof typeof SkeletonTypes;
};

const Loading = ({
  loading,
  error,
  children,
  type = "category",
}: TLoadingProps) => {
  if (loading == "pending") {
    const Skeleton = SkeletonTypes[type];
    return <Skeleton />;
  }
  if (loading === "failed") {
    return (
      <div className="flex justify-center items-center">
        <LottieHandler type="network" message={error as string} color="red" />
      </div>
    );
  }
  return <>{children} </>;
};

export default Loading;

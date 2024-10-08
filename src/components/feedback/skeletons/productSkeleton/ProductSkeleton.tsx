import ContentLoader from "react-content-loader";

const ProductSkeleton = () => {
  const skeletons = Array(4)
    .fill(0)
    .map((_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width={282}
        height={567}
        viewBox="0 0 282 567"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="123" y="120" rx="0" ry="0" width="2" height="5" />
        <rect x="11" y="0" rx="6" ry="6" width="266" height="399" />
        <rect x="11" y="429" rx="7" ry="7" width="213" height="13" />
        <rect x="11" y="461" rx="6" ry="6" width="168" height="10" />
        <rect x="214" y="461" rx="6" ry="6" width="59" height="11" />
        <rect x="16" y="507" rx="8" ry="8" width="180" height="40" />
      </ContentLoader>
    ));
  return <>{skeletons}</>;
};

export default ProductSkeleton;

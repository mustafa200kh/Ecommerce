import ContentLoader from "react-content-loader";

const CartSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={1200}
      height={233}
      viewBox="0 0 1200 233"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="123" y="120" rx="0" ry="0" width="2" height="5" />
      <rect x="3" y="5" rx="0" ry="0" width="138" height="208" />
      <rect x="172" y="9" rx="6" ry="6" width="143" height="13" />
      <rect x="172" y="39" rx="3" ry="3" width="80" height="9" />
      <rect x="176" y="181" rx="8" ry="8" width="112" height="30" />
      <rect x="487" y="91" rx="2" ry="2" width="78" height="13" />
      <rect x="499" y="115" rx="5" ry="5" width="49" height="23" />
    </ContentLoader>
  );
};

export default CartSkeleton;

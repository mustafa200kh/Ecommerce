import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const Skeletons = Array(4)
    .fill(0)
    .map((_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width={250}
        height={250}
        viewBox="0 0 250 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="126" cy="114" r="109" />
        <rect x="123" y="120" rx="0" ry="0" width="2" height="5" />
        <rect x="81" y="233" rx="7" ry="7" width="90" height="10" />
      </ContentLoader>
    ));
  return <>{Skeletons}</>;
};

export default CategorySkeleton;

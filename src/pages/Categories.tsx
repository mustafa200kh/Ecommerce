// Components
import { CategoriesCard } from "@components/ecommerce";
import Loading from "@components/feedback/loading/Loading";
import PageHeader from "@components/common/Heading/PageHeader";
// My custom Hook
import useCategories from "@hooks/useCategories";
function Categories() {
  const { error, loading, records } = useCategories();
  const categoriesList =
    records.length > 0
      ? records.map((category) => (
          <CategoriesCard key={category.id} {...category} />
        ))
      : "No Categories Found";
  return (
    <>
      <PageHeader title="Categories" />
      <div className="pt-4 flex justify-center gap-6 md:gap-[20px] lg:gap-[20px] flex-wrap">
        <Loading loading={loading} error={error}>
          {categoriesList}
        </Loading>
      </div>
    </>
  );
}

export default Categories;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  cleanUpCategoriesRecords,
} from "@store/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  // on load we will  fire the action the brings the categories list
  useEffect(() => {
    // if the size of records is equal to zero then fire the action get the categories
    // we did that once when the length is equal to zero because the categories doesn't change so much
    const promise = dispatch(actGetCategories());
    return () => {
      promise.abort();
      dispatch(cleanUpCategoriesRecords());
    }; // we did this cause i dont need the categories in any place else in the site
  }, [dispatch]);
  return { records, loading, error };
};

export default useCategories;

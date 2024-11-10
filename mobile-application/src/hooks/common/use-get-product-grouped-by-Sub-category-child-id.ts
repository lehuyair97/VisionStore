import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { ProductResponse } from "./use-get-product-by-brand";

const useGetProductGroupedByChildSubCategory = (subCategory_child_ID: string) => {
  const {data} = useQuery({
    queryKey: ["GET_PRODUCT_GROUPED_BY_CHILD_SUBCATEGORY", subCategory_child_ID], 
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_PRODUCT_GROUPED_BY_CHILD_SUBCATEGORY(subCategory_child_ID),
        method: "GET",
      }) as ProductResponse;
    },
  });
  return { data:data };
};

export default useGetProductGroupedByChildSubCategory;

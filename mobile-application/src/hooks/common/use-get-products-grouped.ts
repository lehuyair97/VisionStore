import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { ProductResponse } from "./use-get-product-grouped";

const useGetProductGrouped = (categoryId: string) => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_PRODUCT_GROUPED(categoryId),
        method: "GET",
      })) as ProductResponse[];
    },
  });
};

export default useGetProductGrouped;

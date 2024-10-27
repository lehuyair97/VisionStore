import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { ProductResponse } from "./use-get-product-grouped";

const useGetProductGrouped = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_PRODUCT_GROUPED(),
        method: "GET",
      })) as ProductResponse[];
    },
  });
};

export default useGetProductGrouped;

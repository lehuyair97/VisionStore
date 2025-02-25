import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { ProductResponse } from "./use-get-product-by-brand";

const useGetProductGrouped = (categoryId: string) => {
  const {data} = useQuery({
    queryKey: ["useGetProductGrouped", categoryId], // Thêm categoryId vào queryKey
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_PRODUCT_GROUPED(categoryId),
        method: "GET",
      }) as ProductResponse;
    },
  });
  return { data:data };
};

export default useGetProductGrouped;

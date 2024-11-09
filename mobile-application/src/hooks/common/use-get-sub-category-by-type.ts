import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

type SubCategoryType =
  | "PC"
  | "Laptop"
  | "components"
  | "accessories"
  | "monitor" | string

const useGetSubCategoryByType = (type: SubCategoryType, isAutoFetch: boolean) => {
  const { data, error, isPending, refetch, isRefetching, isRefetchError } =
    useQuery({
      queryKey: ["sub_category", type],
      queryFn: async () => {
        return await api({
          url: REQUEST_URL.GET_SUBCATEGORIES_BY_TYPE(type),
          method: "GET",
        });
      },
      enabled: isAutoFetch,
    });
  return { data, error, isPending, refetch, isRefetchError, isRefetching };
};

export default useGetSubCategoryByType;

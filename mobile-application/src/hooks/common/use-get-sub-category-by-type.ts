import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

type SubCategoryType =
  | "PC"
  | "Laptop"
  | "components"
  | "accessories"
  | "monitor";

const useGetSubCategoryByType = (type: SubCategoryType) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["sub_category", type],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_SUBCATEGORIES_BY_TYPE(type),
        method: "GET",
      });
    },
  });
  return { data, error, isPending };
};

export default useGetSubCategoryByType;

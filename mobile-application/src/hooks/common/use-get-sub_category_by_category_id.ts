import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetSubCategoryByCategoryID = (categoryID: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["sub_category", categoryID],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_SUBCATEGORIES_BY_CATEGORY_ID(categoryID),
        method: "GET",
      });
    },
  });
  return { data, error, isPending };
};

export default useGetSubCategoryByCategoryID;
